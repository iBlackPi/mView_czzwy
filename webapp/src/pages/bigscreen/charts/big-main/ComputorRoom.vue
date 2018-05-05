<template>
    <module-layout title="机房信息">
        <ve-pie
                :rippleAnimation="true"
                style="width: 100%; height: 100%;"
                :center="['40%', '45%']"
                backgroundColor="transparent"
                id="pie"
                :data="pieData"
                :radius="['55%','75%']"
                :coverOption="coverOption"
                :rippleSize = 5
        ></ve-pie>
    </module-layout>
</template>

<script>
    import ModuleLayout from '../../common/ModuleLayout';
    export default {
        name: "computor-room",
        data(){
            return {
                pieData: [],
                coverOption: {
                    legend: {
                        top: 60,
                        right: 0
                    },
                    series: [
                        {
                            label: {
                                normal: {
                                    show: true,
                                    formatter: `{b}:{d}`
                                },
                                emphasis: {
                                    show: false,
                                }
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
            // 请求机房信息
            getInfo(){
                this.$httpt.get('bigScreenController.do?getCzMachineRoom').then(({data}) => {
                    if(data.success){
                        let temp = data.data;
                        let pieData = [
                            {value:335, name:'自建机房'},
                            {value:310, name:'托管机房'},
                            {value:274, name:'租用云服务'}
                        ];
                        pieData[0].value = temp.selfBuiltMachineRoomNum;
                        pieData[1].value = temp.trusteeshipRoomNum;
                        pieData[2].value = temp.cloudServiceNum;
                        this.pieData = pieData;
                    }else{
                        throw new Error('获取机房信息失败！');
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