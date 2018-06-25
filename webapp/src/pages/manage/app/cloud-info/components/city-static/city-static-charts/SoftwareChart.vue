<template>
    <Card class="card">
        <p slot="title">软件信息统计</p>
        <span href="#" slot="extra" class="total-num">
                        软件总数：{{totalCount}}
                    </span>
        <div class="chart-container">
            <ve-rect-coordinate
                    id="software"
                    style="width: 100%; height:100%; margin-left: 2%;"
                    backgroundColor=""
                    :xAxisData="xAxisData"
                    :showLegend=true
                    :coverOption="coverOption2"
                    @click-series="goToInfoSys">
                <ve-bar
                        :data="data"
                        name="数量（个）"
                        barWidth="20"
                ></ve-bar>
            </ve-rect-coordinate>
        </div>
    </Card>
</template>

<script>
    export default {
        name: "",
        data() {
            return {
                xAxisData: ['操作系统', '数据库', '中间件', '应用系统'],
                data: [64, 60, 66, 66],
                totalCount: 0,
                coverOption2: {
                    grid: {
                        top: '20%',
                        bottom: '15%'
                    },
                    legend: {
                        top: -10,
                        right: -30,
                        textStyle: {
                            color: '#217bcc'
                        }
                    },
                    xAxis: {
                        type: 'category',
                        axisLabel: {
                            show: true,
                            interval: 0,
                            rotate: 0,
                            textStyle: {
                                color: '#333'
                            }
                        }
                    },
                    yAxis: {
                        type: 'value',
                        /*分隔线*/
                        splitLine: {
                            show: false,
                        },
                        /*刻度标签*/
                        axisLabel: {
                            show: true,
                            textStyle: {
                                color: '#333'
                            }
                        }
                    },
                    series: [
                        {
                            label: {
                                show: true,
                                position: 'top',
                                color: '#333'
                            }
                        }
                    ]
                }
            }
        },
        methods: {
            goToInfoSys(params) {
                this.$router.push({name: 'info-sys-maintain', query: {softwareType: params.name}});
            },
            getInfoSys() {
                this.$httpt.get('bigScreenController.do?getInfomatinSystemPagination&pageSize=10000').then(({data}) => {
                    if (data.success) {
                        let osType = '',
                            databaseType = '',
                            middlewareType = '',
                            infoSys = '';
                        data.data.list.forEach(item => {
                            if(item.osType) {
                                osType ++;
                            }
                            if(item.databaseType) {
                                databaseType ++;
                            }
                            if(item.middlewareType) {
                                middlewareType ++;
                            }
                            if(item.infomationSystemName) {
                                infoSys ++;
                            }
                        });
                        this.data = [osType, databaseType, middlewareType, infoSys];
                        this.totalCount = this.data.reduce((a, b) => {return a + b;})
                    } else {
                        console.error('获取软件信息信息失败')
                    }
                }).catch(err => {
                    throw Error(err);
                })
            }
        },
        created() {
            this.getInfoSys();
        }
    }
</script>

<style scoped>
    .chart-container {
        height: 12rem;
    }
</style>