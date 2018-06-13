<template>
    <Card class="card">
        <p slot="title">是否有信息科</p>
        <span href="#" slot="extra" class="total-num">
                        <!--信息科总数：{{totalCount}}-->
                    </span>
        <div class="chart-container">
            <input type="hidden" :value="totalInfo">
            <Card style="width: 100%; height: 100%;">
                <div style="text-align:center">
                    <i class="icon iconfont icon-suyaniconchanpinleibufenzuodaohangbufen87" style="font-size: 5rem; color: #01B344;"></i>
                    <h3>是否有信息科：{{hasInfoDepartment === '是' ? '有' : '无'}}</h3>
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
                hasInfoDepartment: true
            }
        },
        computed: {
            totalInfo() {
                let czCloudInfo = this.$store.state.czCloudInfo.czCloudInfo;
                if (JSON.stringify(czCloudInfo) !== '{}') {
                    this.hasInfoDepartment = czCloudInfo[this.currentDepartment].temp1;
                }
            }
        },
        methods: {
            update() {
                let czCloudInfo = this.$store.state.czCloudInfo.czCloudInfo;
                if (JSON.stringify(czCloudInfo) !== '{}') {
                    this.hasInfoDepartment = czCloudInfo[this.currentDepartment].temp1;
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