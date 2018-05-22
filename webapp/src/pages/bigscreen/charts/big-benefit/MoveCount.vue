<template>
    <module-layout :title="sum">
        <ve-rect-coordinate
                id="move-count"
                style="height:100%"
                backgroundColor=""
                :xAxisData="xAxisData"
                :showLegend=true
                :coverOption="coverOption">
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
    export default {
        name: "computor-room",
        data(){
            return {
                xAxisData: ['第一批', '第二批', '第三批'],
                // 50 3 1  11 0 0 34 30 49
                dataInternet: [50, 3, 1],
                dataPolicy: [11, 0, 0],
                dataSpecial: [34, 30, 49],
                coverOption: {
                    grid: {
                        top: '30%',
                        bottom: '25%'
                    },
                    legend: {
                        top: 10,
                        right: -30
                    },
                    series: [
                        {
                            label: {
                                show: true,
                                position: 'top',
                                color: '#fff'
                            }
                        },
                        {
                            label: {
                                show: true,
                                position: 'top',
                                color: '#fff'
                            }
                        },
                        {
                            label: {
                                show: true,
                                position: 'top',
                                color: '#fff'
                            }
                        }
                    ]
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