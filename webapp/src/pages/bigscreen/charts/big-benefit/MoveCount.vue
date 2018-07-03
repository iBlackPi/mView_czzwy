<template>
    <module-layout :title="sum">
        <ve-rect-coordinate
                id="move-count"
                style="height:100%"
                backgroundColor=""
                :xAxisData="xAxisData"
                :showLegend=true
                :coverOption="coverOption"
                @click-series="goToManage">
            <ve-bar
                    :data="dataInternet"
                    name="互联网"
                    barWidth="20"
            ></ve-bar>
            <ve-bar
                    :data="dataPolicy"
                    name="政务外网"
                    barWidth="20"
            ></ve-bar>
            <ve-bar
                    :data="dataSpecial"
                    name="专网"
                    barWidth="20"
            ></ve-bar>
        </ve-rect-coordinate>
    </module-layout>
</template>

<script>
    import ModuleLayout from '../../common/ModuleLayout';
    let myColor = ['#E6CD46', '#06B15B', '#05A2FA', '#13b5b1', '#06B15B'];
    let myBgColor = ['rgba(239,207,62,0.2)', 'rgba(6,177,89,0.2)', 'rgba(5,162,250,0.2)', 'rgba(19,181,177,0.2)', 'rgba(6,177,89,0.2)'];
    let gain = 0.9;
    export default {
        name: "computor-room",
        data(){
            return {
                xAxisData: ['第一批', '第二批', '第三批', '第四批'],
                // 50 3 1  11 0 0 34 30 49
                dataInternet: [62, 6, 2, 13],
                dataPolicy: [14, 0, 0, 0],
                dataSpecial: [31, 30, 49, 27],
                coverOption: {
                    grid: {
                        top: '30%',
                        bottom: '25%'
                    },
                    tooltip: {
                        show: false
                    },
                    legend: {
                        top: 10,
                        right: -30
                    },
                    xAxis: [{
                        type: 'category',
                        axisTick: {
                            show: false
                        },
                        axisLine: {
                            lineStyle: {
                                color: 'rgba(160,160,160,0.3)',
                            }
                        },
                        axisLabel: {
                            interval: 0,
                            textStyle: {
                                color: '#fff',
                                fontSize: 13 * gain,
                            }
                        },
                        data: ['第一批', '第二批', '第三批', '第四批']
                    }, {
                        type: 'category',
                        axisLine: {
                            show: false
                        },
                        axisTick: {
                            show: false
                        },
                        axisLabel: {
                            show: false
                        },
                        splitArea: {
                            show: false
                        },
                        splitLine: {
                            show: false
                        },
                        data: ['第一批', '第二批', '第三批', '第四批']
                    }],
                    series: [{
                        type: 'bar',
                        xAxisIndex: 1,
                        itemStyle: {
                            normal: {
                                show: true,
                                color: 'rgba(5,162,250,0.2)',
                                barBorderRadius: 50,
                                borderWidth: 0,
                                borderColor: '#333',
                            }
                        },
                        label:{
                            normal:{
                                show:true,
                                formatter: function(params) {
                                    var stuNum = 0;
                                    [62, 6, 2, 13].forEach(function(value, index, array) {
                                        if (params.dataIndex == index) {
                                            stuNum = value;
                                        }
                                    })
                                    return stuNum ;
                                },
                                position: 'top',
                                textStyle:{
                                    color: '#fff',
                                    fontSize: '1rem',
                                }
                            }
                        },
                        barWidth: '15%',
                        data: [80, 80, 80, 80]
                    },{
                        type: 'bar',
                        xAxisIndex: 1,
                        itemStyle: {
                            normal: {
                                show: true,
                                color: 'rgba(239,207,62,0.2)',
                                barBorderRadius: 50,
                                borderWidth: 0,
                                borderColor: '#333',
                            }
                        },
                        label:{
                            normal:{
                                show:true,
                                formatter: function(params) {
                                    var stuNum = 0;
                                    [14, 0, 0, 0].forEach(function(value, index, array) {
                                        if (params.dataIndex == index) {
                                            stuNum = value;
                                        }
                                    })
                                    return stuNum ;
                                },
                                position: 'top',
                                textStyle:{
                                    color: '#fff',
                                    fontSize: '1rem',
                                }
                            }
                        },
                        barWidth: '15%',
                        data: [80, 80, 80, 80]
                    },{
                        type: 'bar',
                        xAxisIndex: 1,
                        itemStyle: {
                            normal: {
                                show: true,
                                color: 'rgba(6,177,89,0.2)',
                                barBorderRadius: 50,
                                borderWidth: 0,
                                borderColor: '#333',
                            }
                        },
                        label:{
                            normal:{
                                show:true,
                                formatter: function(params) {
                                    var stuNum = 0;
                                    [31, 30, 49, 27].forEach(function(value, index, array) {
                                        if (params.dataIndex == index) {
                                            stuNum = value;
                                        }
                                    })
                                    return stuNum ;
                                },
                                position: 'top',
                                textStyle:{
                                    color: '#fff',
                                    fontSize: '1rem',
                                }
                            }
                        },
                        barWidth: '15%',
                        data: [80, 80, 80]
                    }, {
                        type: 'bar',
                        itemStyle: {
                            normal: {
                                show: true,
                                color: '#01A2FC',
                                barBorderRadius: 50,
                                borderWidth: 0,
                                borderColor: '#333',
                            }
                        },
                        label: {
                            normal: {
                                show: false,

                            }
                        },
                        barWidth: '15%',
                        data: [50, 3, 1]
                    }, {
                        type: 'bar',
                        itemStyle: {
                            normal: {
                                show: true,
                                color: '#DFCD55',
                                barBorderRadius: 50,
                                borderWidth: 0,
                                borderColor: '#333',
                            }
                        },
                        label: {
                            normal: {
                                show: false,

                            }
                        },
                        barWidth: '15%',
                        data: [11, 0, 0]
                    }, {
                        type: 'bar',
                        itemStyle: {
                            normal: {
                                show: true,
                                color: '#01B344',
                                barBorderRadius: 50,
                                borderWidth: 0,
                                borderColor: '#333',
                            }
                        },
                        label: {
                            normal: {
                                show: false,

                            }
                        },
                        barWidth: '15%',
                        data: [34, 30, 49]
                    }]
                }
            }
        },
        components: {
            ModuleLayout
        },
        computed: {
            sum() {
                let temp = [];
                for(let i = 0, len = this.dataInternet.length; i < len; i ++) {
                    temp.push(this.dataInternet[i] + this.dataPolicy[i] + this.dataSpecial[i]);
                }
                return `迁移数量 总量：<span style="color: #217bcc;">${temp[0]}、${temp[1]}、${temp[2]}</span>`;
            }
        },
        methods: {
            goToManage() {
                this.$router.push({name: 'move-info'});
            },
            getInfo(){
                this.$httpt.get('bigScreenController.do?getInfoSysOfRemoveInDesignatedYears').then((res) => {
                    let temp = res.data;
                    if(temp){
                        this.dataInternet = [];
                        this.dataPolicy = [];
                        this.dataSpecial = [];
                        temp.forEach((item) => {
                            this.dataInternet.push(item['internetInfoNum']);
                            this.dataPolicy.push(item['govExtrantInfoNum']);
                            this.dataSpecial.push(item['specialNetInfoNum']);
                        });
                    }else{
                        throw new Error('获取2018-2020迁移数量信息失败！');
                    }
                })
            }
        },
        mounted(){
            let _this = this;
            this.$nextTick(() => {
                // _this.getInfo();
            })
        }
    }
</script>

<style scoped>

</style>