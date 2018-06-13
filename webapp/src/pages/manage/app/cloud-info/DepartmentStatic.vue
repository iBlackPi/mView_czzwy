<template>
    <div>
        <section class="search" style="margin-bottom: 1rem;">
            <AutoComplete
                    v-model="searchName"
                    :data="autoCompleteData"
                    :filter-method="filterMethod"
                    :transfer="true"
                    @on-select="onSelect"
                    placeholder="搜索部门，默认为“财政局”"
                    clearable
                    icon="ios-search"
                    style="width: 300px;">
            </AutoComplete>
            <!--<Button type="primary" icon="ios-search" @click="searchDepartment">搜索</Button>-->
            <!--<Button type="primary" shape="circle" @click="refresh" icon="ios-refresh-empty"-->
                    <!--style="margin-right: 1rem; float: right;"></Button>-->
            <Button type="success" shape="circle" style="margin-right: 1rem; float: right;">
                当前单位: <span style="font-weight: bold;font-size: .8rem;">{{$route.query.department ? $route.query.department : searchName}}</span>
            </Button>
        </section>

        <collapse v-model="isOpen" accordion>
            <!--<input type="hidden" :value="totalInfo">-->
            <panel name="1">
                局委办信息概览
                <div slot="content" class="info-sys-important">

                    <info-sys-chart :currentDepartment = "currentDepartment"></info-sys-chart>

                    <info-department-chart :currentDepartment = "currentDepartment"></info-department-chart>

                    <computer-room-chart :currentDepartment = "currentDepartment"></computer-room-chart>

                    <server-chart :currentDepartment = "currentDepartment"></server-chart>

                    <resource-catalog-chart :currentDepartment = "currentDepartment"></resource-catalog-chart>

                    <net-route-chart :currentDepartment = "currentDepartment"></net-route-chart>

                    <net-device-chart :currentDepartment = "currentDepartment"></net-device-chart>

                    <software-chart :currentDepartment = "currentDepartment"></software-chart>

                    <hardware-chart :currentDepartment = "currentDepartment"></hardware-chart>
                </div>
            </panel>
        </collapse>
    </div>
</template>

<script>
    import InfoSysChart from './components/department-static/InfoSysChart';
    import InfoDepartmentChart from './components/department-static/InfoDepartmentChart';
    import ComputerRoomChart from './components/department-static/ComputerRoomChart';
    import ServerChart from './components/department-static/ServerChart';
    import ResourceCatalogChart from './components/department-static/ResourceCatalogChart';
    import NetRouteChart from './components/department-static/NetRouteChart';
    import NetDeviceChart from './components/department-static/NetDeviceChart';
    import SoftwareChart from './components/department-static/SoftwareChart';
    import HardwareChart from './components/department-static/HardwareChart';

    export default {
        name: "",
        data() {
            return {
                searchName: '财政局',
                currentDepartment: '财政局',
                isOpen: '1',
            }
        },
        components: {
            InfoSysChart,
            InfoDepartmentChart,
            ComputerRoomChart,
            ServerChart,
            ResourceCatalogChart,
            NetRouteChart,
            NetDeviceChart,
            SoftwareChart,
            HardwareChart
        },
        computed: {
            // 搜索框根据用户输入智能补全功能
            autoCompleteData() {
                let czCloudInfo = this.$store.state.czCloudInfo.czCloudInfo;
                // vue实例化的时候该值为默认的空数组，所以排除初始化的情况
                if (czCloudInfo instanceof Array) {

                } else {
                    return Object.keys(czCloudInfo);
                }
            }
        },
        methods: {
            // 搜索框根据用户输入智能补全功能：匹配用户输入
            // option为autoCompleteData数组中的项，该方法会遍历所有项
            filterMethod(value, option) {
                if (value !== '') {
                    return option.indexOf(value) !== -1;
                }
            },
            onSelect(department) {
                this.currentDepartment = department;
                this.$bus.$emit('update', department);
            },
            refresh() {
                // this.onSelect(this.where.department);
                // this.$Notice.success({
                //     title: `成功刷新${this.where.department}数据`
                // })
            }
        },
        watch: {
            // 当搜索框为空时，默认搜索财政局
            searchName(newValue, oldValue) {
                if (newValue === '') {
                    // this.where.department = '财政局';
                    // this.$store.dispatch('czCloudInfo/getTotalInfo', {vm: this, department: '财政局'});
                }
            }
        },
        mounted() {
            // todo 展示网络接入情况；该方法暂时废弃，仍需保留，防止需求变更
            // todo 网络接入情况暂时不展示了
            /*this.$nextTick(() => {
                this.$store.dispatch('czCloudInfo/getIsConnectNet', {vm: this, department: '财政局'});
            });*/
            if (this.$route.query.department) {
                this.onSelect(this.$route.query.department);
            }
        },
        created() {
            if(JSON.stringify(this.$store.state.czCloudInfo.czCloudInfo) === '{}') {
                this.$store.dispatch('czCloudInfo/getCloudInfo', {vm: this});
            }
        }
    }
</script>

<style scoped lang="less" type="text/less">
    .info-sys-important {
        display: flex;
        flex-flow: row wrap;
        justify-content: space-between;
    }

    .card {
        flex-grow: 1;
        width: 32%;
        margin: .5rem;
        .chart-container {
            height: 12rem;
        }
        &:nth-child(1) {
            width: 65.2%;
        }
        & .total-num {
            color: #000;
        }
    }

</style>