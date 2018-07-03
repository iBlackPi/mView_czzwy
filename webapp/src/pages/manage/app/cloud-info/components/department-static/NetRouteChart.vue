<template>
    <Card class="card">
        <p slot="title">网络情况统计</p>
        <span href="#" slot="extra" class="total-num">
                        <!--网络情况总数：{{totalCount}}-->
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
        props: {
            currentDepartment: {
                type: String,
                default: '财政局'
            }
        },
        data() {
            return {
                allInfo: [],
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
                // if (JSON.stringify(czCloudInfo) !== '{}') {
                //     this.pieSysData = [];
                //     let internetNum = czCloudInfo[this.currentDepartment].internetNum;
                //     let zhengwuNum = czCloudInfo[this.currentDepartment].zhengwuNum;
                //     let netNum = czCloudInfo[this.currentDepartment].netNum;
                //     this.totalCount = internetNum + zhengwuNum + netNum;
                //     this.pieSysData.push({name: '互联网', value: internetNum});
                //     this.pieSysData.push({name: '政务外网', value: zhengwuNum});
                //     this.pieSysData.push({name: '专网', value: netNum});
                // }
            }
        },
        methods: {
            goToNetDevice(params) {
                this.$router.push({name: 'net-info', query: {group: params.name}});
            },
            getNetInfo() {
                this.$httpt.get(`networkController.do?getCzNetwork&department=&pageSize=10000`).then(({data}) => {
                    if (data.success) {
                        this.allInfo = data.data.list;
                        this.update(this.currentDepartment);
                    } else {
                        this.$Notice.error({
                            title: '获取网络信息失败'
                        })
                    }
                })
            },
            update() {
                this.allInfo.forEach(item => {
                    if(item.department === this.currentDepartment) {
                        let temp = Number(item.hengxiangNetNum) + Number(item.zongxiangNetNum);
                        this.pieSysData = [
                            {value: item.internetNum, name: '互联网'},
                            {value: item.zhengwuExtranetNum, name: '政务外网'},
                            {value: temp, name: '业务专网'},
                            {value: item.gongwuIntranetNum, name: '公务内网'}
                        ]
                    }
                })
            }
        },
        created() {
            if (JSON.stringify(this.$store.state.czCloudInfo.czCloudInfo) === '{}') {
                this.$store.dispatch('czCloudInfo/getCloudInfo', {vm: this});
            }
            this.getNetInfo();
            this.$bus.$on('update', () => {
                this.update();
            })
        }
    }
</script>

<style scoped>
    .chart-container {
        height: 12rem;
    }
</style>