<template>
        <div class="department-info">
            <section class="search">
                <Input v-model="value" placeholder="请输入单位名称检索" style="width: 300px"></Input>
                <Button type="primary" icon="ios-search">搜索</Button>
                <Button type="primary" shape="circle" icon="ios-refresh-empty" style="margin-right: 1rem; float: right;"></Button>
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
            </Card>
            <!--投资信息-->
            <Card style="width: 100%; margin-top: 1%;">
                <p slot="title">
                    <Icon type="ios-film-outline"></Icon>
                    投资信息
                </p>
                <a href="#" slot="extra" >
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
                <a href="#" slot="extra">
                    <Icon type="ios-loop-strong"></Icon>
                    刷新
                </a>
                <busi-sys-info></busi-sys-info>
            </Card>
        </div>
</template>

<script>
    import Investment from './Investment';
    import BusiSysInfo from './BusiSysInfo';
    export default {
        name: "",
        data(){
           return {
               searchName: ''
           }
        },
        components: {
            Investment,
            BusiSysInfo
        },
        methods: {
            searchDepartment(){

            }
        },
        mounted(){

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