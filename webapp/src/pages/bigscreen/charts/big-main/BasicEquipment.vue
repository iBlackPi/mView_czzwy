<template>
    <module-layout title="基础设备统计">
        <ve-rect-coordinate
                id="rectTest2"
                style="height:100%"
                backgroundColor=""
                :xAxisData="xAxisData"
                :showLegend=true
                :coverOption="coverOption">
            <ve-bar
                    :data="data"
                    id="basic-equipment"
                    name="数量(台)"
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
                xAxisData: ['小机', 'X86服务器', '虚机', '网络设备', 'PC终端'],
                data: [10, 250, 200, 334, 390],
                coverOption: {
                    grid: {
                        top: '12%',
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
                this.$httpt.get('bigScreenController.do?getBasicDevice').then(({data}) => {
                    if(data.success){
                        let temp = data.data;
                        this.data = [];
                        Object.keys(temp).forEach((key) => {
                            this.data.push(temp[key]);
                        });
                    }else{
                        throw Error('获取基础设备信息失败！');
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