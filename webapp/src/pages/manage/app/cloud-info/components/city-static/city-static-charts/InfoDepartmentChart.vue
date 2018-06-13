<template>
    <Card class="card">
        <p slot="title">信息科及信息化人员统计</p>
        <span href="#" slot="extra" class="total-num">
                        信息科总数：{{totalCount}}
                    </span>
        <div class="chart-container">
            <input type="hidden" :value="totalInfo">
            <ve-pie
                    :rippleAnimation="true"
                    style="width: 100%; height: 100%; float: left;"
                    :center="['40%', '50%']"
                    backgroundColor="transparent"
                    id="info-department"
                    :data="pieSysData"
                    :radius="['40%','60%']"
                    :coverOption="coverOption"
                    :rippleSize=5
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
                    {value: 71, name: '有信息科'},
                    {value: 19, name: '无信息科'}
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
                    let hasInfoDepartmentNum = 0;
                    let noInfoDepartmentNum = 0;
                    Object.keys(czCloudInfo).forEach(key => {
                        hasInfoDepartmentNum += (czCloudInfo[key].temp1 ? 1 : 0);
                        noInfoDepartmentNum += (czCloudInfo[key].temp1 ? 0 : 1);
                    });
                    this.totalCount = hasInfoDepartmentNum + noInfoDepartmentNum;
                    this.pieSysData.push({name: '有信息科', value: hasInfoDepartmentNum});
                    this.pieSysData.push({name: '无信息科', value: noInfoDepartmentNum});
                }
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