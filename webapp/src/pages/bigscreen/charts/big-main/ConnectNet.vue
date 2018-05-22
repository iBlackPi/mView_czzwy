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