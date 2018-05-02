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
                        <h3>已接入互联网</h3>
                    </div>
                </Card>
                <Card class="card">
                    <div style="text-align:center">
                        <Icon type="ios-world-outline" style="color: #f90;" class="icon-style"></Icon>
                        <h3>未接入政务外网</h3>
                    </div>
                </Card>
                <Card class="card">
                    <div style="text-align:center">
                        <Icon type="ios-world-outline" class="icon-style"></Icon>
                        <h3>已接入专网</h3>
                    </div>
                </Card>
            </section>
            <!--投资信息-->
            <Card style="width: 100%; margin-top: 1%;">
                <p slot="title">
                    <Icon type="ios-film-outline"></Icon>
                    投资信息
                </p>
                <a href="#" slot="extra" @click.prevent="changeLimit">
                    <Icon type="ios-loop-strong"></Icon>
                    刷新
                </a>
                <investment></investment>
            </Card>
            <!--业务系统统计-->
            <Card style="width: 100%; margin-top: 1%;">
                <p slot="title">
                    <Icon type="ios-film-outline"></Icon>
                    业务系统统计
                </p>
                <a href="#" slot="extra" @click.prevent="changeLimit">
                    <Icon type="ios-loop-strong"></Icon>
                    刷新
                </a>
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
              title: '信息详情'
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
            this.$bus.$on('showDepartmentInfoModal', (departmentName) => {
                this.modal = true;
                this.title = departmentName + '单位信息化资源详情';
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