<template>
        <div class="department-info">
            <section class="search">
                <AutoComplete
                        v-model="searchName"
                        :data="autoCompleteData"
                        :filter-method="filterMethod"
                        :transfer="true"
                        @on-select="onSelect"
                        placeholder="搜索部门，默认为“住建局”"
                        clearable
                        icon="ios-search"
                        style="width: 300px;">
                </AutoComplete>
                <!--<Button type="primary" icon="ios-search" @click="searchDepartment">搜索</Button>-->
                <Button type="primary" shape="circle" @click="refresh" icon="ios-refresh-empty" style="margin-right: 1rem; float: right;"></Button>
                <Button type="success" shape="circle" style="margin-right: 1rem; float: right;">
                    当前单位: <span style="font-weight: bold;font-size: .8rem;">{{where.department}}</span>
                </Button>
            </section>
            <!--接入网络情况-->
            <Card style="width: 100%; margin-top: 1%;">
                <p slot="title">
                    <Icon type="ios-film-outline"></Icon>
                    接入网络情况
                </p>
                <section class="card-container">
                    <Card class="card">
                        <div style="text-align:center">
                            <Icon type="ios-world-outline" style="color: #19BE6B;" class="icon-style"></Icon>
                            <h3>
                                <span v-if="isConnectNet.intenet === true">已接入互联网</span>
                                <span v-else-if="isConnectNet.intenet === false">未接入互联网</span>
                                <span v-else>暂无数据</span>
                            </h3>
                        </div>
                    </Card>
                    <Card class="card">
                        <div style="text-align:center">
                            <Icon type="ios-world-outline" style="color: #f90;" class="icon-style"></Icon>
                            <h3>
                                <span v-if="isConnectNet.govExtranet === true">已接入政务外网</span>
                                <span v-else-if="isConnectNet.govExtranet === false">未接入政务外网</span>
                                <span v-else>暂无数据</span>
                            </h3>
                        </div>
                    </Card>
                    <Card class="card">
                        <div style="text-align:center">
                            <Icon type="ios-world-outline" class="icon-style"></Icon>
                            <h3>
                                <span v-if="isConnectNet.specialNetwork === true">已接入专网</span>
                                <span v-else-if="isConnectNet.specialNetwork === false">未接入专网</span>
                                <span v-else>暂无数据</span>
                            </h3>
                        </div>
                    </Card>
                </section>
            </Card>
            <!--投资信息-->
            <Card style="width: 100%; margin-top: 1%;">
                <p slot="title">
                    <Icon type="ios-film-outline"></Icon>
                    投资信息
                </p>
                <!--todo 局部表格刷新功能暂时取消，可随时删除-->
                <!--<a href="#" slot="extra" >
                    <Icon type="ios-loop-strong"></Icon>
                    刷新
                </a>-->
                <investment></investment>
            </Card>
            <!--业务系统统计-->
            <Card style="width: 100%; margin-top: 1%;">
                <p slot="title">
                    <Icon type="ios-film-outline"></Icon>
                    业务系统统计
                </p>
                <!--todo 局部表格刷新功能暂时取消，可随时删除-->
                <!--<a href="#" slot="extra">
                    <Icon type="ios-loop-strong"></Icon>
                    刷新
                </a>-->
                <busi-sys-info></busi-sys-info>
            </Card>
        </div>
</template>

<script>
    import Investment from './components/Investment';
    import BusiSysInfo from './components/BusiSysInfo';
    export default {
        name: "",
        data(){
           return {
               searchName: '',
               where: {
                   countPerPage: 10,
                   currentPage: 1,
                   department: '住建局'
               }
           }
        },
        components: {
            Investment,
            BusiSysInfo
        },
        methods: {
            // 搜索框根据用户输入智能补全功能：匹配用户输入
            // option为autoCompleteData数组中的项，该方法会遍历所有项
            filterMethod(value, option){
                if(value !== ''){
                    return option.indexOf(value) !== -1;
                }
            },
            onSelect(department){
                //todo 此处如果已经出发过on-select事件后再clear选项则会再次进入该方法，而此时department为空串，不合理
                //todo 猜测可能是iview的bug
                department === '' ? this.where.department = '住建局' : this.where.department = department;
                // 查询部门的投资信息
                this.$store.dispatch('czCloudInfo/getInvestment', {vm: this, where: this.where});
                // 查询部门系统信息
                this.$store.dispatch('czCloudInfo/getBusiSys', {vm: this, where: this.where});
                // 查询网络接入情况
                this.$store.dispatch('czCloudInfo/getIsConnectNet', {vm: this, department: department});
            },
            refresh(){
                this.onSelect(this.where.department);
                this.$Notice.success({
                    title: `成功刷新${this.where.department}数据`
                })
            }
        },
        computed: {
            isConnectNet(){
                return this.$store.state.czCloudInfo.isConnectNet;
            },
            // 搜索框根据用户输入智能补全功能
            autoCompleteData(){
                let czCloudInfo = this.$store.state.czCloudInfo.czCloudInfo;
                // vue实例化的时候该值为默认的空数组，所以排除初始化的情况
                if(czCloudInfo instanceof Array){
                    return;
                }else{
                    return Object.keys(czCloudInfo);
                }
            }
        },
        watch: {
            // 当搜索框为空时，默认搜索住建局
            searchName(newValue, oldValue){
                if(newValue === ''){
                    this.where.department = '住建局';
                    // 查询部门的投资信息
                    this.$store.dispatch('czCloudInfo/getInvestment', {vm: this, where: this.where});
                    // 查询部门系统信息
                    this.$store.dispatch('czCloudInfo/getBusiSys', {vm: this, where: this.where});
                    // 查询网络接入情况
                    this.$store.dispatch('czCloudInfo/getIsConnectNet', {vm: this, department: this.where.department});
                }
            }
        },
        mounted(){
            this.$store.dispatch('czCloudInfo/getIsConnectNet', {vm: this, department: '住建局'});
        },
        //todo 尽快的获取数据
        //todo 如果用户直接进入后台页面，那总信息就无法获取到
        //todo 所以这里尽快的去获取下总览信息，供本页面中的搜索框自动提示功能使用
        created(){
            this.$store.dispatch('czCloudInfo/getCloudInfo', {vm: this});
        }
    }
</script>

<style scoped type="text/less" lang="less">
    .card-container {
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        .card {
            width:30%; display: inline-block;
        }
    }
    .icon-style {
        font-size: 3rem;
        color: #2D8CF0;
    }
</style>