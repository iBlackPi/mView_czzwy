<template>
    <Card class="card">
        <p slot="title">网络情况统计</p>
        <span href="#" slot="extra" class="total-num">
                        网络线路总数：{{totalCount}}
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
                    {value: 71, name: '互联网'},
                    {value: 19, name: '政务外网'},
                    {value: 19, name: '专网'}
                ],
                totalCount: 0,
                coverOption: {
                    legend: {
                        top: 60,
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
                let czCloudInfo = this.$store.state.czCloudInfo.czCloudInfo;
                if (JSON.stringify(czCloudInfo) !== '{}') {
                    this.pieSysData = [];
                    let internetNum = 0;
                    let zhengwuNum = 0;
                    let netNum = 0;
                    Object.keys(czCloudInfo).forEach(key => {
                        internetNum += czCloudInfo[key].internetNum;
                        zhengwuNum += czCloudInfo[key].zhengwuNum;
                        netNum += czCloudInfo[key].netNum;
                    });
                    this.totalCount = internetNum + zhengwuNum + netNum;
                    this.pieSysData.push({name: '互联网', value: internetNum});
                    this.pieSysData.push({name: '政务外网', value: zhengwuNum});
                    this.pieSysData.push({name: '专网', value: netNum});
                }
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