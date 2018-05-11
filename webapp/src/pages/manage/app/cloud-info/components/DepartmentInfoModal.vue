<template>
    <Modal
            v-model="modal"
            :title="title"
            @on-ok="ok"
            @on-cancel="cancel"
            :styles="{top: '5%', width: '75%', height: '100%'}">
        <div class="department-info">
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
            <!--投资信息-->
            <Card style="width: 100%; margin-top: 1%;">
                <p slot="title">
                    <Icon type="ios-film-outline"></Icon>
                    投资信息
                </p>
                <!--todo 局部表格刷新功能暂时取消，可随时删除-->
                <!--<a href="#" slot="extra" @click.prevent="changeLimit">-->
                    <!--<Icon type="ios-loop-strong"></Icon>-->
                    <!--刷新-->
                <!--</a>-->
                <investment></investment>
            </Card>
            <!--业务系统统计-->
            <Card style="width: 100%; margin-top: 1%;">
                <p slot="title">
                    <Icon type="ios-film-outline"></Icon>
                    业务系统统计
                </p>
                <!--todo 局部表格刷新功能暂时取消，可随时删除-->
               <!-- <a href="#" slot="extra" @click.prevent="changeLimit">
                    <Icon type="ios-loop-strong"></Icon>
                    刷新
                </a>-->
                <busi-sys-info></busi-sys-info>
            </Card>
        </div>
    </Modal>
</template>

<script>
    import Investment from './Investment';
    import BusiSysInfo from './BusiSysInfo';
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
            isConnectNet(){
                return this.$store.state.czCloudInfo.isConnectNet;
            }
        },
        components: {
            Investment,
            BusiSysInfo
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
                this.$store.dispatch('czCloudInfo/getIsConnectNet', {vm: this, department: departmentName});
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