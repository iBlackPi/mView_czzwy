<template>
    <module-layout title="2018-2020年基础资源需求量">
        <ve-rect-coordinate
                id="base-reource"
                style="height:100%"
                backgroundColor=""
                :xAxisData="xAxisData"
                :showLegend=true
                :coverOption="coverOption">
            <ve-bar
                    :data="dataCPU"
                    name="CPU"
                    barWidth="20"
            ></ve-bar>
            <ve-bar
                    :data="dataMemory"
                    name="内存"
                    barWidth="20"
            ></ve-bar>
            <ve-bar
                    :data="dataRestore"
                    name="存储"
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
                dataCPU: [90, 250, 150],
                dataMemory: [100, 170, 190],
                dataRestore: [70, 140, 160],
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
                this.$httpt.get('bigScreenController.do?getResources').then((res) => {
                    let temp = res.data;
                    if(temp){
                        this.dataCPU = [];
                        this.dataMemory = [];
                        this.dataRestore = [];
                        temp.forEach((item) => {
                            this.dataCPU.push(item['cpu']);
                            this.dataMemory.push(item['memory']);
                            this.dataRestore.push(item['storage']);
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