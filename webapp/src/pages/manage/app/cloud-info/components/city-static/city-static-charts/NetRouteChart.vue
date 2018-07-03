<template>
    <Card class="card">
        <p slot="title">网络情况统计</p>
        <span href="#" slot="extra" class="total-num">
                        网络线路总数：307<!--{{totalCount}}-->
                    </span>
        <div class="chart-container">
            <input type="hidden" :value="totalInfo">
            <ve-pie
                    :rippleAnimation="true"
                    style="width: 100%; height: 100%; float: left;"
                    :center="['40%', '50%']"
                    backgroundColor="transparent"
                    id="net-route"
                    :data="pieSysData"
                    :radius="['40%','60%']"
                    :coverOption="coverOption"
                    :rippleSize=5
                    @click-series="goToNetDevice"
            ></ve-pie>
        </div>
    </Card>
</template>

<script>
    export default {
        name: "",
        data() {
            return {
                pieSysData: [
                    {value: 89, name: '互联网'},
                    {value: 55, name: '政务外网'},
                    {value: 59, name: '业务专网'},
                    {value: 54, name: '政务内网'},
                    {value: 50, name: '公务内网'},
                ],
                totalCount: 0,
                coverOption: {
                    legend: {
                        top: 10,
                        right: 0,
                        textStyle: {
                            color: '#000'
                        }
                    },
                    series: [
                        {
                            label: {
                                normal: {
                                    show: true,
                                    formatter: `{d}%({c})`
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
            totalInfo() {
                // let czCloudInfo = this.$store.state.czCloudInfo.czCloudInfo;
                // if (JSON.stringify(czCloudInfo) !== '{}') {
                //     this.pieSysData = [];
                //     let internetNum = 0;
                //     let zhengwuExtranetNum = 0;
                //     let netNum = 0;
                //     Object.keys(czCloudInfo).forEach(key => {
                //         internetNum += czCloudInfo[key].internetNum;
                //         zhengwuExtranetNum += czCloudInfo[key].zhengwuExtranetNum;
                //         netNum += czCloudInfo[key].netNum;
                //     });
                //     this.totalCount = internetNum + zhengwuExtranetNum + netNum;
                //     this.pieSysData.push({name: '互联网', value: internetNum});
                //     this.pieSysData.push({name: '政务外网', value: zhengwuExtranetNum});
                //     this.pieSysData.push({name: '专网', value: netNum});
                // }
            }
        },
        methods: {
            goToNetDevice(params) {
                this.$router.push({name: 'net-info', query: {networkType: params.name}});
            }
        },
        created() {
            if (JSON.stringify(this.$store.state.czCloudInfo.czCloudInfo) === '{}') {
                this.$store.dispatch('czCloudInfo/getCloudInfo', {vm: this});
            }
        }
    }
</script>

<style scoped>
    .chart-container {
        height: 12rem;
    }
</style>