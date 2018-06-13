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
                    <h3>{{currentDepartment}}服务器总数：{{totalCount}}</h3>
                </div>
            </Card>
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
                totalCount: 0,
            }
        },
        computed: {
            totalInfo() {
                let czCloudInfo = this.$store.state.czCloudInfo.czCloudInfo;
                if (JSON.stringify(czCloudInfo) !== '{}') {
                    this.totalCount = czCloudInfo[this.currentDepartment].serverNum;
                }
            }
        },
        methods: {
            update() {
                let czCloudInfo = this.$store.state.czCloudInfo.czCloudInfo;
                if (JSON.stringify(czCloudInfo) !== '{}') {
                    this.totalCount = czCloudInfo[this.currentDepartment].serverNum;
                }
            }
        },
        created() {
            if (JSON.stringify(this.$store.state.czCloudInfo.czCloudInfo) === '{}') {
                this.$store.dispatch('czCloudInfo/getCloudInfo', {vm: this});
            }
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