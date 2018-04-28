<template>
    <div class="info-maintain">
        <Form ref="formInline" inline style="white-space: nowrap;">
            <FormItem prop="user">
                <Input v-model="searchName" placeholder="请输入单位名进行查询"  style="width: 400px;">
                <span slot="prepend">单位名</span>
                <Button type="primary" slot="append" icon="ios-search" @click="searchUser"></Button>
                </Input>
            </FormItem>
            <FormItem prop="password" style="margin-left: 59.2%;">
                <Button type="primary" shape="circle" icon="trash-a" @click="bulkDelete"></Button>
            </FormItem>
            <FormItem>
                <Button type="primary" shape="circle" icon="plus-round" @click="showCreateUser"></Button>
            </FormItem>
        </Form>
        <Table border :columns="columns" :data="totalInfo"></Table>
        <!--分页-->
        <Page :total="totalCount" show-total show-sizer @on-change="changePage" @on-page-size-change="changePageSize" style="margin: .5rem 0 .5rem 0;"></Page>
    </div>
</template>

<script>
    export default {
        name: "info-maintain",
        data(){
            return {
                searchName: '',
                totalInfo: [],
                page: {
                    countPerPage: 10,
                    currentPage: 1,
                    where: {}
                },
                totalCount: 0,
                columns: [
                    {
                        title: '单位名称',
                        key: 'username',
                        render: (h, params) => {
                            return h('div', [
                                h('Icon', {
                                    props: {
                                        type: 'person'
                                    }
                                }),
                                h('span',' ' + params.row.username)
                            ]);
                        }
                    },
                    {
                        title: '信息化投资',
                        key: 'password',
                    },
                    {
                        title: '业务系统数量',
                        key: 'password',
                    },
                    {
                        title: '可云化系统数',
                        key: 'password',
                    },
                    {
                        title: '机房数量',
                        key: 'password',
                    },
                    {
                        title: '服务器台数',
                        key: 'password',
                    },
                    {
                        title: '是否有互联网',
                        key: 'password',
                    },
                    {
                        title: '是否接入政务外网',
                        key: 'password',
                    },
                    {
                        title: '是否有专网',
                        key: 'password',
                    },
                    {
                        title: '资源目录数量',
                        key: 'password',
                    }
                ]
            }
        },
        methods: {
            searchUser(){
                //模糊查询用户
                this.page.where = this.searchName === '' ? {} : {username: {
                        '$like': `%${this.searchName}%`
                    }};
                this.findByPage(this.page);
            },
            changePage(destination){
                this.page.currentPage = destination;
                //翻页的时候是带着查询参数去翻页的
                this.findByPage(this.page);
            },
            changePageSize(pageSize){
                this.page.countPerPage = pageSize;
                //翻页的时候是带着查询参数去翻页的
                this.findByPage(this.page);
            },
            findByPage(page){
                this.$http.post('/userController.do?m=findUserByPage', page).then(({data}) => {
                    if(data.success){
                        this.totalInfo = data.data.list;
                        this.totalCount = data.data.totalCount;
                    }else{
                        this.$Notice.error({
                            title: '获取用户失败！'
                        })
                    }
                })
            }
        }
    }
</script>

<style scoped lang="less" type="text/less">

</style>