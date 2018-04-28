<template>
    <div class="user-manage">
        <Form ref="formInline" inline style="white-space: nowrap;">
            <FormItem prop="user">
                <Input v-model="searchName" placeholder="请输入用户名进行模糊查询"  style="width: 400px;">
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
        <Page :total="totalCount" show-total show-sizer @on-change="changePage" @on-page-size-change="changePageSize" style="margin: .5rem 0 .5rem 0;"></Page>
        <!--授权对话框-->
        <Empower-Tree-Modal></Empower-Tree-Modal>
        <!--修改用户对话框-->
        <change-user-modal></change-user-modal>
        <!--创建用户对话框-->
        <create-user-modal @showNewUser="showNewUser"></create-user-modal>
        <!--删除确认对话框-->
        <Modal
                v-model="isShowDelete"
                title="确认提示"
                @on-ok="confirmDelete">
            <p>确定要删除
                <span style="color: #f90;font-weight: bold; font-size: .9rem;">
                    <!--<span v-if="selections.length === 0">用户{{selectedUserName}}</span>-->
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
    import EmpowerTreeModal from './EmpowerTreeModal';
    import ChangeUserModal from './ChangeUserModal';
    import CreateUserModal from './CreateUserModal';
    //todo 表格很难复用，需要配置东西差别太大，无法封装
    //todo 有哪些是明显可以复用的呢？？？
    export default {
        name: "user-manage",
        data () {
            return {
                username: '',
                users: [],
                selectedUserName: '',
                selectedUser: {},
                isShowDelete: false,
                currentIndex: 0,
                selections: [],
                totalCount: 0,
                isSelected: false,
                searchName: '',
                //true表明当前点击批量删除
                bulkFlag: false,
                page: {
                    countPerPage: 10,
                    currentPage: 1,
                    where: {}
                },
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
            EmpowerTreeModal,
            ChangeUserModal,
            CreateUserModal
        },
        watch: {
            //如果搜索名是空，则清空搜索条件
            searchName(){
                if(this.searchName === ''){
                    this.where = {};
                }
            }
        },
        methods: {
            show (index) {
                this.$bus.$emit('showEmpowerTreeModal', this.users[index].id);
            },
            showChangeUser(index) {
                // 弹出修改用户对话框
                this.$bus.$emit('showChangeUserModal', this.users[index]);
            },
            showCreateUser() {
                // 弹出增加用户对话框
                this.$bus.$emit('showCreateUserModal');
            },
            remove(index) {
                //缓存当前选中的记录
                this.currentIndex = index;
                this.selectedUser = this.users[index];
                this.selectedUserName = this.users[index].username;
                this.isShowDelete = true;
                this.bulkFlag = false;
            },
            bulkDelete(){
                if(this.selections.length === 0){
                    this.isSelected = true;
                }else{
                    this.isShowDelete = true;
                    this.bulkFlag = true;
                }
            },
            showNewUser(newUser){
                this.users.push(newUser);
            },
            confirmDelete(){
                //删除用户
                let temp = [];
                this.selections.forEach(item => {
                    temp.push(item.id);
                });
                //如果批量删除传id数组，如果单个删除，传送选择项的id
                this.deleteUsers(this.bulkFlag ? temp : this.selectedUser.id)
            },
            selectionChange(selection){
                console.log('selectionChange===========', selection);
                this.selections = selection;
            },
            deleteUsers(userId){
                //todo 此处后台应该级联删除，与用户授权相关也应该删除干净
                this.$http.post('/userController.do?m=deleteUser', {id: userId}).then(({data}) => {
                    if(data.success){
                        this.$Notice.success({
                            title: '删除用户成功！'
                        });
                        if(this.bulkFlag){
                            for(let i = 0; i < this.users.length; i ++){
                                for(let j = 0; j < this.selections.length; j ++){
                                    if(this.users[i].id === this.selections[j].id){
                                        this.users.splice(i, 1);
                                    }
                                }
                            }
                        }else{
                            this.users.splice(this.currentIndex, 1);
                        }
                    }else{
                        this.$Notice.error({
                            title: '删除用户失败！'
                        })
                    }
                })
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
            searchUser(){
                //模糊查询用户
                //todo sql语句放在前面太蠢，放到后台拼接
                this.page.where = this.searchName === '' ? {} : {username: {
                        '$like': `%${this.searchName}%`
                    }};
                this.findByPage(this.page);
            },
            findByPage(page){
                this.$http.post('/userController.do?m=findUserByPage', page).then(({data}) => {
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
            const _this = this;
            this.findByPage(this.page);
            /*this.$http.get('userController.do?m=findUser').then(({data}) => {
                if(data.success){
                    _this.users = data.data;
                }else{
                    this.$Notice.error({
                        title: '请求信息失败'
                    })
                }
            }).catch(err => {
                throw new Error(err);
            })*/
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