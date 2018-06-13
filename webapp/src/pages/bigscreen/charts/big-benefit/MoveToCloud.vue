<template>
    <module-layout :title="sum">
        <ve-pie
                :rippleAnimation="true"
                style="width: 100%; height: 100%;"
                :center="['40%', '50%']"
                backgroundColor="transparent"
                id="move-to-cloud"
                :data="pieData"
                :radius="['45%','65%']"
                :coverOption="coverOption"
                :rippleSize = 5
                @click-series="goToManage">
        </ve-pie>
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
                        {value: 63, name: '互联网'},
                        {value: 11, name: '政务外网'},
                        {value: 113, name: '业务专网'}
                    ],
                coverOption: {
                    legend: {
                        top: 90,
                        right: 10
                    },
                    series: [
                        {
                            label: {
                                normal: {
                                    show: true,
                                    formatter: `{c}`
                                },
                                emphasis: {
                                    show: true,
                                    textStyle: {
                                        fontSize: '20px',
                                        fontWeight: 'bold'
                                    }
                                }
                            }
                        }
                    ]
                }
            }
        },
        computed: {
            sum(){
                let sum = 0;
                this.pieData.forEach(item => {
                    sum += item.value;
                });
                return `具备上云条件的系统 总量：<span style="color: #217bcc;">${sum}</span>`;
            }
        },
        components: {
            ModuleLayout
        },
        methods: {
            goToManage() {
                this.$router.push({name: 'move-info'});
            },
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
                // _this.getInfo();
            })
        }
    }
</script>

<style scoped>

</style>