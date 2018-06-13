<template>
    <module-layout :title="sum">
        <input type="hidden" :value="totalInfo">
        <ve-pie
                :rippleAnimation="true"
                style="width: 100%; height: 100%; float: left;"
                :center="['40%', '50%']"
                backgroundColor="transparent"
                id="info-system5"
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
                    {value: 71, name: '可上云'},
                    {value: 19, name: '不可上云'}
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
                return `信息系统上云统计  总数：${this.totalCount}`
            },
            totalInfo() {
                let czCloudInfo = this.$store.state.czCloudInfo.czCloudInfo;
                if (JSON.stringify(czCloudInfo) !== '{}') {
                    this.pieSysData = [];
                    let busiSysNum = 0;
                    let removeNum = 0;
                    Object.keys(czCloudInfo).forEach(key => {
                        busiSysNum += czCloudInfo[key].bussinessNum;
                        removeNum += czCloudInfo[key].removeNum;
                    });
                    this.totalCount = busiSysNum;
                    this.pieSysData.push({name: '不可上云', value: busiSysNum - removeNum});
                    this.pieSysData.push({name: '可上云', value: removeNum});
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