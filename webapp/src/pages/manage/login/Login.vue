<!--//todo 登录放到app中-->
<template>
    <div class="login" @keydown.enter="handleSubmit">
        <div class="login-container" @click="changeShowLoginInfo">
            <div class="login-header">
                <div class="login-header-logo"></div>
                <div class="login-header-title">
                    沧州政务信息化统计
                </div>
            </div>
            <div class="form-container">
                <Form ref="loginRef" :model="loginModel" :rules="loginRules">
                    <FormItem prop="loginName">
                        <i class="iconfont icon-yonghu1 form-icon"></i>
                        <Input type="text" v-model="loginModel.loginName" placeholder="请输入用户名">
                        </Input>
                    </FormItem>
                    <FormItem prop="password">
                        <i class="iconfont icon-mima form-icon"></i>
                        <Input type="password" v-model="loginModel.password" placeholder="请输入密码">
                        </Input>
                    </FormItem>
                    <FormItem class="login-btn-container">
                        <Button long @click="handleSubmit" type="primary" class="submit-btn">登 录</Button>
                        <div class="login-info" v-show="showLoginInfo">{{loginInfo}}</div>
                    </FormItem>
                </Form>
            </div>

        </div>
    </div>
</template>

<script type="text/javascript">
    export default {
        data() {
            return {
                showLoginInfo: false,
                loginInfo: '',
                loginModel: {
                    loginName: '',
                    password: ''
                },
                loginRules: {
                    loginName: [{
                        required: true,
                        message: '用户名不能为空',
                        trigger: 'blur',
                        validator(rule, value, callback) {
                            if(value.trim() === '') {
                                callback(new Error('用户名不能为空'));
                            } else {
                                callback();
                            }
                        }
                    }],
                    password: [{
                        required: true,
                        message: '密码不能为空',
                        trigger: 'blur',
                        validator(rule, value, callback) {
                            if(value.trim() === '') {
                                callback(new Error('密码不能为空'));
                            } else {
                                callback();
                            }
                        }
                    }]
                }
            };
        },
        methods: {
            handleSubmit() {
                this.$refs['loginRef'].validate((valid) => {
                    //返回校验结果
                    if(valid) {
                        //todo //200 , 400 , 500 进哪个回调函数
                        //此处显示加载动画,在vue-router全局钩子中隐藏加载动画
                        this.$Spin.show();
                        this.$http.post('/loginController.do?m=checkUser', {
                            username: this.loginModel.loginName,
                            //密码转为base64
                            // password: this.$base64.encode(this.loginModel.password)
                            password: this.loginModel.password
                        }).then(({data}) => {
                            if(data.success) {
                                /*设置用户信息*/
                                this.$store.state.login.userName = this.loginModel.loginName;
                                //将用户信息缓存到localStorage本地
                                localStorage.setItem('username', this.loginModel.loginName);
                                //路由跳转到主页面
                                this.$router.push({
                                    name: 'home',
                                    query: {
                                        t: +new Date() //保证每次点击路由的query项都是不一样的，确保会重新刷新view
                                    }
                                });
                            } else {
                                this.$Spin.hide();
                                this.loginModel.password = '';
                                this.loginInfo = data.message;
                                this.showLoginInfo = true;
                            }
                        });
                    }
                });
            },
            changeShowLoginInfo(e) {
                if(e.target.nodeName.toUpperCase() === 'INPUT') {
                    this.showLoginInfo = false;
                }
            }
        }
    };
</script>

<style lang="less">
    @import 'login.less';
</style>