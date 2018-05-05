<template>
    <module-layout title="2018-2020年迁移数量">
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
                xAxisData: ['2018', '2019', '2020'],
                dataInternet: [90, 200, 150],
                dataPolicy: [100, 150, 190],
                dataSpecial: [70, 140, 160],
                coverOption: {
                    grid: {
                        top: '18%',
                        bottom: '15%'
                    },
                    legend: {
                        top: -10,
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
                _this.getInfo();
            })
        }
    }
</script>

<style scoped>

</style>