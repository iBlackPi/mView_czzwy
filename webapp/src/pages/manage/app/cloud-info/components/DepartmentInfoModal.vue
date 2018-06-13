<template>
    <Modal
            v-model="modal"
            :title="title"
            @on-ok="ok"
            @on-cancel="cancel"
            :styles="{top: '5%', width: '75%', height: '100%'}">
        <div class="department-info">
            <Card style="width: 100%; margin-top: 1%;">
                <p slot="title">
                    <Icon type="ios-film-outline"></Icon>
                    网络情况
                </p>
                <section class="card-container">
                    <Card class="card">
                        <div style="text-align:center">
                            <Icon type="ios-world-outline" style="color: #19BE6B;" class="icon-style"></Icon>
                            <h3>
                                <!--<span v-if="isConnectNet.intenet === true">已接入互联网</span>-->
                                <!--<span v-else-if="isConnectNet.intenet === false">未接入互联网</span>-->
                                <!--<span v-else>互联网暂无数据</span>-->
                                <span>互联网线路数：{{departmentInfo.internetNum}}</span>
                            </h3>
                        </div>
                    </Card>
                    <Card class="card">
                        <div style="text-align:center">
                            <Icon type="ios-world-outline" style="color: #f90;" class="icon-style"></Icon>
                            <h3>
                                <!--<span v-if="isConnectNet.govExtranet === true">已接入政务外网</span>-->
                                <!--<span v-else-if="isConnectNet.govExtranet === false">未接入政务外网</span>-->
                                <!--<span v-else>政务外网暂无数据</span>-->
                                <span>政务外网线路数：{{departmentInfo.zhengwuNum}}</span>
                            </h3>
                        </div>
                    </Card>
                    <Card class="card">
                        <div style="text-align:center">
                            <Icon type="ios-world-outline" class="icon-style"></Icon>
                            <h3>
                                <!--<span v-if="isConnectNet.specialNetwork === true">已接入专网</span>-->
                                <!--<span v-else-if="isConnectNet.specialNetwork === false">未接入专网</span>-->
                                <!--<span v-else>专网暂无数据</span>-->
                                <span>专网线路数：{{departmentInfo.netNum}}</span>
                            </h3>
                        </div>
                    </Card>
                    <Card class="card">
                        <div style="text-align:center">
                            <Icon type="ios-world-outline" style="color: #19BE6B;" class="icon-style"></Icon>
                            <h3>
                                <!--<span v-if="isConnectNet.specialNetwork === true">已接入专网</span>-->
                                <!--<span v-else-if="isConnectNet.specialNetwork === false">未接入专网</span>-->
                                <!--<span v-else>专网暂无数据</span>-->
                                <span>网络设备数：{{departmentInfo.netDeviceNum}}</span>
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
    </Modal>
</template>

<script>
    import Investment from './Investment';
    import BusiSysInfo from './BusiSysInfo';
    import PeopleAssociated from './PeopleAssociated';
    import GroupStructure from './GroupStructure';
    import InfoBasic from './InfoBasic';
    import InfoOperation from './InfoOperation';
    import NetInfo from './NetInfo';
    import InfoSysCombination from './InfoSysCombination';
    import BusiItem from './BusiItem';
    import InfoResourceCatlog from './InfoResourceCatlog';
    import InfoResourceRequirement from './InfoResourceRequirement';
    import ElectronicPhoto from './ElectronicPhoto';
    import PCTerminal from './PCTerminal';
    import NetAndDevice from './NetAndDevice';
    export default {
        name: "",
        data(){
          return {
              modal: false,
              title: '信息详情',
              where: {
                  countPerPage: 10,
                  currentPage: 1,
                  department: '财政局'
              }
          }
        },
        computed: {
            departmentInfo(){
                // 初始化的时候，由于store中信息是异步的，数据还没有获取到，会导致页面取值错误
                if(JSON.stringify(this.$store.state.czCloudInfo.czCloudInfo) !== '{}'){
                    return this.$store.state.czCloudInfo.czCloudInfo[this.where.department];
                }else {
                    return {
                        internetNum: 0,
                        machineroomNum: 0,
                        netDeviceNum: 0,
                        netNum: 0,
                        zhengwuNum: 0
                    }
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
            ok(){

            },
            cancel(){

            }
        },
        mounted(){
            // 采用事件总线的方式被动更新投资信息，思路更加直接清晰
            this.$bus.$on('showDepartmentInfoModal', (departmentName) => {
                this.modal = true;
                this.title = departmentName + '单位信息化资源详情';
                this.where.department = departmentName;
                this.$store.dispatch('czCloudInfo/getTotalInfo', {vm: this, department: departmentName});
                // 获取网络接入信息
                // this.$store.dispatch('czCloudInfo/getIsConnectNet', {vm: this, department: departmentName});
            })
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