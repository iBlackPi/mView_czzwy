<!--//todo 登录放到app中-->
<template>
    <div class="login" @keydown.enter="handleSubmit">
        <section class="logo-container">
            <img src="../../../assets/imgs/cangzhou.png" alt="">
        </section>
        <span class="logo-title">
            中国 • 沧州
        </span>
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
        <span class="download"><span style="color: #fff; letter-spacing: .1rem;">为了更好的体验，请您使用chrome浏览器浏览本系统，</span> <a class="detail-install-normal" href="https://sm.myapp.com/original/Browser/67.0.3396.62_chrome_installer.exe" target="_blank" data-hottag="download.detail.normal.2661" data-id="2661">点击下载Chrome浏览器</a></span>
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
    .download {
        position: absolute;
        top: 97%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: .75rem;
    }
    .detail-install-normal {
        /*font-size: .9rem;*/
    }
    .logo-container {
        position: absolute;
        top: 5%;
        left: 2.5%;
        transform: translate(-50%, -50%);
        width: 3rem;
        height: 3rem;
    }
    .logo-container img {
        width: 100%;
        height: 100%;
    }
    .logo-title {
        position: absolute;
        top: 5%;
        left: 7.5%;
        transform: translate(-50%, -50%);
        color: #fff;
        font-size: 1rem;
        font-family: fationblack;
    }
</style>