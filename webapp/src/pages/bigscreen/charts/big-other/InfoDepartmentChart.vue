<template>
    <module-layout :title="sum">
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
                @click-series="goToManage">
        </ve-pie>
    </module-layout>
</template>

<script>
    import ModuleLayout from '../../common/ModuleLayout';
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
                        top: 90,
                        right: 40,
                        textStyle: {
                            color: '#FFF'
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
        components: {
            ModuleLayout
        },
        computed: {
            sum() {
                return `信息科统计  总数：${this.totalCount}`
            },
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
        methods: {
            goToManage() {
                this.$router.push({name: 'info-maintain'})
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