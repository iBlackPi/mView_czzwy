<!--todo 放到components header文件夹中-->
<template>
    <div class="header-avator-con">
        <div class="notice">
            <Tooltip content="通知" placement="bottom" class="icon-middle">
                <f-icon name="envelope-o" class="header-icon header-icon-color"></f-icon>
            </Tooltip>
        </div>
        <div class="star">
            <Tooltip content="收藏" placement="bottom" class="icon-middle">
                <f-icon name="star-o" class="header-icon header-icon-color"></f-icon>
            </Tooltip>
        </div>
        <div class="split"></div>
        <div class="user-info">
            <span class="user-info-icon">
                <img class="user-info-img" src="../../../../assets/imgs/admin-img.png"/>
            </span>
            <span class="user-info-name">{{userName}}</span>
            <span class="user-info-down">
                <Dropdown>
                    <Icon type="chevron-down"></Icon>
                    <DropdownMenu slot="list">
                        <DropdownItem>用户信息</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </span>
        </div>
        <div class="split"></div>
        <div class="lagout" @click="lagout">
            <f-icon name="power-off" class="header-icon"></f-icon>
        </div>

        <Modal v-model="lagoutModal" @on-ok="lagoutOk" @on-cancel="lagoutCancel" width="400">
            <p>
                <Icon type="android-alert"></Icon>
                确定退出?
            </p>
        </Modal>
    </div>
</template>

<script>

    export default {
        data() {
            return {
                lagoutModal: false,
                userName: ''
            };
        },
        //todo 为什么在实例创建的时候赋值？
        created() {
            // this.userName = this.$store.state.login.userName;
        },
        mounted(){
            this.userName = localStorage.getItem('username');
        },
        methods: {
            lagout() {
                this.lagoutModal = true;
            },
            lagoutOk() {
                this.$http.get('/loginController.do?m=logout').then(({data}) => {
                    if(data.success) {
                        //cookies登录状态和用户名
                        //this.$cookies.set('isLogin', false);
                        //this.$cookies.set('userName', '');
                        //将用户信息从浏览器localStorage清除
                        localStorage.removeItem('username');
                        //将用户权限清空
                        this.$store.commit('auth/resetState');
                        //将跟菜单相关数据
                        this.$store.commit('menu/resetState');
                        this.$store.state.login.needAskIsLogin = true;
                        //跳转到登录页面
                        this.$router.push({
                            name: 'login'
                        });
                    }
                });
            },
            lagoutCancel(){}
        }
    };
</script>

<style lang="less">

    @import '../../../../assets/css/theme.less';

    

    .header-avator-con {
        position: relative;
        z-index: 20;
        line-height: @headerHeight;
        height: @headerHeight;

        & > div {
            padding: 0 20px;
            line-height: @headerIconHeight;
            height: @headerIconHeight;
            float: left;
            position: relative;
            top: 50%;
            transform: translateY(-50%);

            svg {
            }

            &.split {
                width: 1px;
                height: @headerIconHeight;
                line-height: @headerIconHeight;
                background-color: #3c4459;
                padding: 0;
                position: relative;
                top: 50%;
                transform: translateY(-50%);
            }

            .header-icon {
                font-size: @headerIconSize;
                position: relative;
                top: 50%;
                transform: translateY(-50%);
            }

            .header-icon-color {
                color: @headerIconColor;
            }
        }

        &:after {
            content: "";
            display: block;
            clear: both;
        }

        .notice, .star {
            height: @headerIconSize;
            line-height: @headerIconSize;
            .ivu-tooltip-rel {
                height: @headerIconSize;
            }
        }

        .user-info {
            .user-info-icon {
                width: @headerIconHeight;
                height: @headerIconHeight;
                line-height: @headerIconHeight;
                float: left;

                .user-info-img {
                    width: @headerIconHeight;
                    height: @headerIconHeight;
                }
            }

            .user-info-name {
                padding: 0 5px;
                height: @headerIconHeight;
                line-height: @headerIconHeight;
                font-size: 12px;
                float: left;
                color: #fff;
            }

            .user-info-down {
                float: left;
                height: @headerIconHeight;
                line-height: @headerIconHeight;
                padding-left: 6px;
            }

            &:after {
                content: "";
                display: block;
                clear: both;
            }
        }

        .ivu-icon {
        }

        .lagout {
            cursor: pointer;
            color: #e8ecf0;

            &:hover {
                color: #ff0042;
            }
        }
    }
</style>