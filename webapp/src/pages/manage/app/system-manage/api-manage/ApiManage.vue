<template>
    <div class="user-manage">
        <Form ref="formInline" inline style="white-space: nowrap;">
            <FormItem prop="user">
                <Input v-model="searchApiName" placeholder="请输入用户名进行模糊查询"  style="width: 400px;">
                    <span slot="prepend">用户名</span>
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
        <Table border :columns="columns" :data="users" @on-selection-change="selectionChange"></Table>
        <!--分页-->
        <Page :total="20" show-total show-sizer @on-change="changePage" @on-page-size-change="changePageSize" style="margin: .5rem 0 .5rem 0;"></Page>
        <!--删除确认对话框-->
        <Modal
                v-model="isShowDelete"
                title="确认提示"
                @on-ok="confirmDelete">
            <p>确定要删除
                <span style="color: #f90;font-weight: bold; font-size: .9rem;">
                    <span>所选中的用户</span>
                </span> 么？
            </p>
        </Modal>
        <Modal
                v-model="isSelected"
                title="温馨提示">
            <p>
                <span style="color: #f90;font-size: .9rem;">请您先选择要删除的用户</span>
            </p>
        </Modal>
    </div>
</template>

<script type="text/javascript">
    //todo 表格很难复用，需要配置东西差别太大，无法封装
    //todo 有哪些是明显可以复用的呢？？？
    export default {
        name: "api-manage",
        data () {
            return {
                searchApiName: '',
                isSelected: false,
                isShowDelete: false,
                users: [],
                columns: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: 'ID',
                        key: 'id',
                        className: 'hide-column',
                    },
                    {
                        title: '用户名',
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
                        title: '密码',
                        key: 'password',
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 250,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.showChangeUser(params.index)
                                        }
                                    }
                                }, '编辑'),
                                h('Button', {
                                    props: {
                                        type: 'success',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.show(params.index)
                                        }
                                    }
                                }, '授权'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.remove(params.index)
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                    }
                ]
            }
        },
        components: {

        },
        methods: {
            show (index) {

            },
            showChangeUser(index) {

            },
            showCreateUser() {

            },
            remove(index) {

            },
            bulkDelete(){

            },
            showNewUser(newUser){

            },
            confirmDelete(){

            },
            selectionChange(selection){

            },
            deleteUsers(userId){

            },
            changePage(destination){

            },
            changePageSize(pageSize){

            },
            searchUser(){

            },
            findByPage(page){
                this.$http.post('userController.do?m=findUserByPage', page).then(({data}) => {
                    if(data.success){
                        this.users = data.data.list;
                        this.totalCount = data.data.totalCount;
                    }else{
                        this.$Notice.error({
                            title: '获取用户失败！'
                        })
                    }
                })
            }
        },
        mounted(){

        }
    }
</script>

<style lang="less" type="text/less">
    .hide-column {

    }
    .user-manage {
        padding: 1rem;
        background: #FAF9F9;
    }
</style>