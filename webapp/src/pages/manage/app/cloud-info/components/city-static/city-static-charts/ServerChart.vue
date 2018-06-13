<template>
    <Card class="card">
        <p slot="title">服务器数量</p>
        <span href="#" slot="extra" class="total-num">
                        服务器总数：{{totalCount}}
                    </span>
        <div class="chart-container">
            <input type="hidden" :value="totalInfo">
            <Card style="width: 100%; height: 100%;">
                <div style="text-align:center">
                    <i class="icon iconfont icon-server" style="font-size: 5rem; color: #01B344;"></i>
                    <h3>全市服务器总数：{{totalCount}}</h3>
                </div>
            </Card>
        </div>
    </Card>
</template>

<script>
    export default {
        name: "",
        data() {
            return {
                totalCount: 0,
            }
        },
        computed: {
            totalInfo() {
                let czCloudInfo = this.$store.state.czCloudInfo.czCloudInfo;
                if (JSON.stringify(czCloudInfo) !== '{}') {
                    let serverNum = 0;
                    Object.keys(czCloudInfo).forEach(key => {
                        serverNum += czCloudInfo[key].serverNum;
                    });
                    this.totalCount = serverNum;
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