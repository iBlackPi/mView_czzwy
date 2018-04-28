<template>
    <Modal
            v-model="modal"
            title="修改用户"
            @on-ok="ok"
            @on-cancel="cancel">
        <Form :model="user" :label-width="80">
            <FormItem label="用户名">
                <Input v-model="user.username" placeholder="请输入用户名"></Input>
            </FormItem>
            <FormItem label="密码">
                <Input v-model="user.password" placeholder="请输入密码"></Input>
            </FormItem>
        </Form>
    </Modal>
</template>

<script>
    export default {
        name: "change-user-modal",
        data(){
            return {
                modal: false,
                user: {}
            }
        },
        methods: {
            ok(){
                //保存用户的更改
                this.$http.post('/userController.do?m=updateUser', this.user).then(({data}) => {
                    if(data.success){
                        this.$Notice.success({
                            title: '更新用户成功！'
                        })
                    }else{
                        this.$Notice.error({
                            title: '更新用户失败！'
                        })
                    }
                })
            },
            cancel(){

            }
        },
        mounted(){
            this.$bus.$on('showChangeUserModal', (user) => {
                this.user = user;
                this.modal = true;
            })
        }
    }
</script>

<style scoped>

</style>