<template>
        <div class="department-info">
            <section class="search">
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
                                <span v-else>互联网暂无数据</span>
                            </h3>
                        </div>
                    </Card>
                    <Card class="card">
                        <div style="text-align:center">
                            <Icon type="ios-world-outline" style="color: #f90;" class="icon-style"></Icon>
                            <h3>
                                <span v-if="isConnectNet.govExtranet === true">已接入政务外网</span>
                                <span v-else-if="isConnectNet.govExtranet === false">未接入政务外网</span>
                                <span v-else>政务外网暂无数据</span>
                            </h3>
                        </div>
                    </Card>
                    <Card class="card">
                        <div style="text-align:center">
                            <Icon type="ios-world-outline" class="icon-style"></Icon>
                            <h3>
                                <span v-if="isConnectNet.specialNetwork === true">已接入专网</span>
                                <span v-else-if="isConnectNet.specialNetwork === false">未接入专网</span>
                                <span v-else>专网暂无数据</span>
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
                <investment></investment>
            </Card>
            <!--业务系统统计-->
            <Card style="width: 100%; margin-top: 1%;">
                <p slot="title">
                    <Icon type="ios-film-outline"></Icon>
                    业务系统统计
                </p>
                <busi-sys-info></busi-sys-info>
            </Card>
            <!--项目参与和配合人员名单-->
            <Card style="width: 100%; margin-top: 1%;">
                <p slot="title">
                    <Icon type="ios-film-outline"></Icon>
                    项目参与和配合人员名单
                </p>
                <people-associated></people-associated>
            </Card>
            <!--表1 组织结构-->
            <Card style="width: 100%; margin-top: 1%;">
                <p slot="title">
                    <Icon type="ios-film-outline"></Icon>
                    组织结构
                </p>
                <group-structure></group-structure>
            </Card>
            <!--表4 信息化基础设施-->
            <Card style="width: 100%; margin-top: 1%;">
                <p slot="title">
                    <Icon type="ios-film-outline"></Icon>
                    信息化基础设施
                </p>
                <info-basic></info-basic>
            </Card>
            <!--表6 信息化运维服务-->
            <Card style="width: 100%; margin-top: 1%;">
                <p slot="title">
                    <Icon type="ios-film-outline"></Icon>
                    信息化运维服务
                </p>
                <info-operation></info-operation>
            </Card>
            <!--表7 互联网、业务专网及电子政务外网应用情况调研表-->
            <Card style="width: 100%; margin-top: 1%;">
                <p slot="title">
                    <Icon type="ios-film-outline"></Icon>
                    互联网、业务专网及电子政务外网应用情况
                </p>
                <net-info></net-info>
            </Card>
            <!--表8 信息系统整合调研表-->
            <Card style="width: 100%; margin-top: 1%;">
                <p slot="title">
                    <Icon type="ios-film-outline"></Icon>
                    信息系统整合调研表
                </p>
                <info-sys-combination></info-sys-combination>
            </Card>
            <!--表10 业务事项调查-->
            <Card style="width: 100%; margin-top: 1%;">
                <p slot="title">
                    <Icon type="ios-film-outline"></Icon>
                    业务事项调查
                </p>
                <busi-item></busi-item>
            </Card>
            <!--表11 信息资源目录调研-->
            <Card style="width: 100%; margin-top: 1%;">
                <p slot="title">
                    <Icon type="ios-film-outline"></Icon>
                    信息资源目录调研
                </p>
                <info-resource-catlog></info-resource-catlog>
            </Card>
            <!-- 表12 信息资源需求调查 -->
            <Card style="width: 100%; margin-top: 1%;">
                <p slot="title">
                    <Icon type="ios-film-outline"></Icon>
                    信息资源需求调查
                </p>
                <info-resource-requirement></info-resource-requirement>
            </Card>
            <!--表13 电子证照相关-->
            <Card style="width: 100%; margin-top: 1%;">
                <p slot="title">
                    <Icon type="ios-film-outline"></Icon>
                    电子证照相关
                </p>
                <electronic-photo></electronic-photo>
            </Card>
            <!--表14 PC终端调查-->
            <Card style="width: 100%; margin-top: 1%;">
                <p slot="title">
                    <Icon type="ios-film-outline"></Icon>
                    PC终端调查
                </p>
                <p-c-terminal></p-c-terminal>
            </Card>
            <!--附2 网络及设备清单-->
            <Card style="width: 100%; margin-top: 1%;">
                <p slot="title">
                    <Icon type="ios-film-outline"></Icon>
                    网络及设备清单
                </p>
                <net-and-device></net-and-device>
            </Card>
        </div>
</template>

<script>
    import Investment from './components/Investment';
    import BusiSysInfo from './components/BusiSysInfo';
    import PeopleAssociated from './components/PeopleAssociated';
    import GroupStructure from './components/GroupStructure';
    import InfoBasic from './components/InfoBasic';
    import InfoOperation from './components/InfoOperation';
    import NetInfo from './components/NetInfo';
    import InfoSysCombination from './components/InfoSysCombination';
    import BusiItem from './components/BusiItem';
    import InfoResourceCatlog from './components/InfoResourceCatlog';
    import InfoResourceRequirement from './components/InfoResourceRequirement';
    import ElectronicPhoto from './components/ElectronicPhoto';
    import PCTerminal from './components/PCTerminal';
    import NetAndDevice from './components/NetAndDevice';

    export default {
        name: "",
        data(){
           return {
               searchName: '',
               where: {
                   countPerPage: 10,
                   currentPage: 1,
                   department: '财政局'
               }
           }
        },
        components: {
            Investment,
            BusiSysInfo,
            GroupStructure,
            InfoBasic,
            InfoOperation,
            NetInfo,
            InfoSysCombination,
            BusiItem,
            InfoResourceCatlog,
            InfoResourceRequirement,
            ElectronicPhoto,
            PCTerminal,
            NetAndDevice,
            PeopleAssociated
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
                department === '' ? this.where.department = '财政局' : this.where.department = department;
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

                }else{
                    return Object.keys(czCloudInfo);
                }
            }
        },
        watch: {
            // 当搜索框为空时，默认搜索财政局
            searchName(newValue, oldValue){
                if(newValue === ''){
                    this.where.department = '财政局';
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
            this.$nextTick(() => {
                this.$store.dispatch('czCloudInfo/getIsConnectNet', {vm: this, department: '财政局'});
            });
        },
        //todo 尽快的获取数据
        //todo 如果用户直接进入后台页面，那总信息就无法获取到
        //todo 所以这里尽快的去获取下总览信息，供本页面中的搜索框自动提示功能使用
        created(){
            // 获取全表格全字段信息
            this.$store.dispatch('czCloudInfo/getTotalInfo', {vm: this, department: '财政局'});
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