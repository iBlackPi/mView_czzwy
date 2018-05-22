<template>
    <module-layout :title="sum">
        <ve-rect-coordinate
                id="connect-net"
                style="height:100%"
                backgroundColor=""
                :xAxisData="xAxisData"
                :showLegend=true
                :coverOption="coverOption">
            <ve-bar
                    :data="data"
                    name="数量（个）"
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
                xAxisData: ['互联网', '政务外网', '业务专线', '政务内网', '公务内网'],
                data: [55, 60, 62, 10, 50],
                coverOption: {
                    grid: {
                        top: '30%',
                        bottom: '25%'
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
                            textStyle: {
                                color: function (param, index) {
                                    return myColor[index]
                                },
                                fontSize: 13 * gain,
                            }
                        },
                        data: ['互联网', '政务外网', '业务专线', '政务内网', '公务内网']
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
                        data: []
                    }
                    ],
                    series: [{
                        type: 'bar',
                        xAxisIndex: 1,
                        itemStyle: {
                            normal: {
                                show: true,
                                color: function(params) {
                                    let num=myBgColor.length;
                                    return myBgColor[params.dataIndex%num]
                                },
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
                                    [55, 60, 62, 10, 50].forEach(function(value, index, array) {
                                        if (params.dataIndex == index) {
                                            stuNum = value;
                                        }
                                    })
                                    return stuNum ;
                                },
                                position: 'top',
                                textStyle:{
                                    // color:function(params) {
                                    //     var num=myBgColor.length;
                                    //     return myBgColor[params.dataIndex%num]
                                    // },
                                    color: '#fff',
                                    fontSize: '1rem',
                                }
                            }
                        },
                        barWidth: '25%',
                        data: [80, 80, 80, 80, 80]
                    },
                        {
                            type: 'bar',
                            itemStyle: {
                                normal: {
                                    show: true,
                                    color: function(params) {
                                        var num=myColor.length;
                                        return myColor[params.dataIndex%num]
                                    },
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
                            barWidth: '25%',
                            data: [55, 60, 62, 10, 50]
                        }
                    ]
                }
            }
        },
        computed: {
            sum() {
                let sum = 0;
                this.data.forEach(item => {
                    sum += item;
                });
                return `单位接入网络数量 总量：<span style="color: #217bcc;">${sum}</span>`;
            }
        },
        components: {
            ModuleLayout
        },
        methods: {
            getInfo(){
                this.$httpt.get('bigScreenController.do?getOrgInfo').then(({data}) => {
                    if(data.success){
                        let temp = data.data;
                        this.data = [];
                        this.data.push(temp['internetOrgNum']);
                        this.data.push(temp['govExtrantOrgNum']);
                        this.data.push(temp['specilOrgNum']);
                    }else{
                        throw new Error('获取单位接入网络信息失败！');
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