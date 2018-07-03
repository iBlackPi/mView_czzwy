<template>
    <Card class="card">
        <p slot="title">信息资源统计</p>
        <span href="#" slot="extra" class="total-num">
                        信息资源统计：1023<!--{{totalCount}}-->
                    </span>
        <div class="chart-container">
            <input type="hidden" :value="totalInfo">
            <Card style="width: 100%; height: 100%;">
                <div style="text-align:center" @click="goToResource">
                    <i class="icon iconfont icon-resource" style="font-size: 5rem; color: #01A2FC;"></i>
                    <h3>信息资源总数：1023<!--{{totalCount}}--></h3>
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
                    let cataLogNum = 0;
                    Object.keys(czCloudInfo).forEach(key => {
                        cataLogNum += czCloudInfo[key].cataLogNum;
                    });
                    this.totalCount = cataLogNum;
                }
            }
        },
        methods: {
            goToResource(params) {
                this.$router.push({name: 'resource-catalog-manage', query: {group: params.name}});
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
        cursor: pointer;
    }
</style>