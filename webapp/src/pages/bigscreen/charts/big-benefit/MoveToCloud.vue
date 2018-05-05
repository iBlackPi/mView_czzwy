<template>
    <module-layout title="具备上云条件的系统">
        <ve-pie
                :rippleAnimation="true"
                style="width: 100%; height: 100%;"
                :center="['40%', '50%']"
                backgroundColor="transparent"
                id="move-to-cloud"
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
                pieData:
                    [
                        {value:335, name:'互联网'},
                        {value:310, name:'政务外网'},
                        {value:274, name:'专网'}
                    ],
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
            // 请求具备上云条件系统统计信息
            getInfo(){
                this.$httpt.get('bigScreenController.do?getCzInfomatinSystemOfRemove').then(({data}) => {
                    if(data.success){
                        let temp = data.data;
                        let pieData = [
                            {value: 335, name: '互联网'},
                            {value: 310, name: '政务外网'},
                            {value: 274, name: '专网'}
                        ];
                        pieData[0].value = temp.internetInfoNum;
                        pieData[1].value = temp.govExtrantInfoNum;
                        pieData[2].value = temp.specialNetInfoNum;
                        this.pieData = pieData;
                    }else{
                        throw new Error('获取上云系统统计信息失败！');
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