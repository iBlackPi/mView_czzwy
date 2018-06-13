<template>
    <module-layout :title="sum">
        <input type="hidden" :value="totalInfo">
        <Card style="width: 100%; height: 100%; background: rgba(0, 0, 0, 0); border: none;">
            <div style="text-align: center; cursor: pointer;" @click="goToManage">
                <i class="icon iconfont icon-resource" style="font-size: 5rem; color: #01A2FC;"></i>
                <h3 style="color: #fff;">全市资源目录总数：{{totalCount}}</h3>
            </div>
        </Card>
    </module-layout>
</template>

<script>
    import ModuleLayout from '../../common/ModuleLayout';
    export default {
        name: "",
        data() {
            return {
                totalCount: 0,
            }
        },
        components: {
            ModuleLayout
        },
        computed: {
            sum() {
                return `资源目录统计  总数：${this.totalCount}`
            },
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