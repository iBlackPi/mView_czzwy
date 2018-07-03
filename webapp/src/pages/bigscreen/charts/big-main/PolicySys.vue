<template>
    <module-layout :title="sum">
        <ve-pie
                :rippleAnimation="true"
                style="width: 100%; height: 100%;"
                :center="['40%', '50%']"
                backgroundColor="transparent"
                id="policy-sys"
                :data="pieData"
                :radius="['45%','65%']"
                :coverOption="coverOption"
                :rippleSize = 5
                @click-series="goToManage"
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
                        {value: 99, name: '互联网'},
                        {value: 11, name: '政务外网'},
                        {value: 175, name: '专网'},
                        {value: 212, name: '统建'}
                    ],
                coverOption: {
                    legend: {
                        top: 40,
                        right: 0
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
            sum() {
                let sum = 0;
                this.pieData.forEach(item => {
                    sum += item.value;
                });
                return `政务信息系统统计 总量：<span style="color: #217bcc;">${sum}</span>`;
            }
        },
        components: {
            ModuleLayout
        },
        methods: {
            goToManage() {
                this.$router.push({name: 'info-sys-maintain'})
            },
            // 请求政务信息系统信息
            getInfo(){
                this.$httpt.get('bigScreenController.do?getCzInfomatinSystem').then(({data}) => {
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
                        throw new Error('获取政务统计信息失败！');
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