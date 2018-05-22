<template>
    <module-layout title="信息共享被需求单位TOP5">
        <ve-rect-coordinate
                id="info-share-needed"
                style="height:100%"
                backgroundColor=""
                :yAxisData="yAxisData"
                :showLegend=true
                :coverOption="coverOption">
            <ve-bar
                    :data="data"
                    name="数量(个)"
                    barWidth="10"
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
                yAxisData: ['国土局', '统计局', '人社局', '教育局', '工商局'],
                data: [7, 8, 8, 11, 13],
                coverOption: {
                    grid: {
                        top: '25%',
                        bottom: '20%'
                    },
                    legend: {
                        top: 0,
                        right: -30
                    },
                    series: [
                        {
                            label: {
                                show: true,
                                color: '#fff',
                                position: 'right'
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
                this.$httpt.get('bigScreenController.do?getTop5Org').then(res => {
                    if(res.data){
                        let temp = res.data;
                        this.data = [];
                        Object.keys(temp).forEach((key) => {
                            this.data.unshift(temp[key]);
                        });
                    }else{
                        throw new Error('获取信息共享需求量失败！');
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