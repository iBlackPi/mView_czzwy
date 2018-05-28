<!--todo 放到components header文件夹中-->
<template>
    <div class="header-avator-con">
        <div class="star">
            <Tooltip content="回到大屏" placement="bottom" class="icon-middle">
                <span @click="GoToBigscreen" class="go-to-bigscreen">
                    <i class="icon iconfont icon-qiehuan" style="font-size: 1.2rem;color: #5AAAFF;"></i>
                </span>
                <div slot="content">
                    <section class="bigscreen-shortcut" @click="GoToBigscreen">
                        <div class="mask"></div>
                        <span>①</span>
                    </section>
                    <section class="bigscreen-shortcut" @click="GoToBigscreen('two')">
                        <div class="mask"></div>
                        <span>②</span>
                    </section>
                </div>
            </Tooltip>
        </div>
        <div class="notice" @click="notice">
            <Tooltip content="通知" placement="bottom" class="icon-middle">
                <f-icon name="envelope-o" class="header-icon header-icon-color"></f-icon>
            </Tooltip>
        </div>
        <div class="star" @click="addFavorite">
            <Tooltip content="收藏" placement="bottom" class="icon-middle">
                <f-icon name="star-o" style="color: #FFE793;" class="header-icon header-icon-color"></f-icon>
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
            addFavorite(){
                let url = window.location;
                let title = document.title;
                let ua = navigator.userAgent.toLowerCase();
                if (ua.indexOf("msie 8") > -1) {
                    external.AddToFavoritesBar(url, title, '');//IE8
                } else {
                    try {
                        window.external.addFavorite(url, title);
                    } catch (e) {
                        try {
                            window.sidebar.addPanel(title, url, "");//firefox
                        } catch (e) {
                            this.$Message.warning('加入收藏失败，请使用Ctrl+D进行添加');
                        }
                    }
                }
            },
            notice(){
                this.$Message.warning('暂时没有通知！');
            },
            lagout() {
                this.lagoutModal = true;
            },
            lagoutOk() {
                this.$http.get('/loginController.do?m=logout').then(({data}) => {
                    if(data.success) {
                        //将用户信息从浏览器localStorage清除
                        localStorage.removeItem('username');
                        //将用户权限清空
                        this.$store.commit('auth/resetState');
                        //将跟菜单相关数据
                        this.$store.commit('menu/resetState');
                        //跳转到登录页面
                        this.$router.push({
                            name: 'login',
                            query: {
                                t: +new Date() //保证每次点击路由的query项都是不一样的，确保会重新刷新view
                            }
                        });
                    }
                });
            },
            lagoutCancel(){

            },
            GoToBigscreen(bigscreenFlag){
                if(bigscreenFlag === 'two') {
                    this.$router.push({name: 'bigBenefit'});
                    return;
                }
                this.$router.push({name: 'bigMain'});
            }
        }
    };
</script>

<style lang="less" type="text/less">
    @import '../../../../assets/css/theme.less';
    .go-to-bigscreen:hover {
        &>i{
            color: #04CAFC !important;
        }
        cursor: pointer;
    }
    .bigscreen-shortcut {
        position: relative;
        width: 12rem;
        height: 7rem;
        font-size: 2rem;
        background-size: 100% 100%;
        & > .mask {
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0);
            transition: background-color .4s linear;
        }
        & > span {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            color: rgba(255, 255, 255, 0);
            transition: color .5s linear;
        }
        &:hover span {
            color: rgba(255, 255, 255, 1);
        }
        &:hover .mask {
            background-color: rgba(0, 0, 0, .4);
        }
        &:nth-child(1) {
            background-image: url(../../../../assets/imgs/bigscreenOne.png);
        }
        &:nth-child(2) {
            margin-top: .5rem;
            background-image: url(../../../../assets/imgs/bigscreenTwo.png);
        }
    }
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
            cursor: pointer;
            .ivu-tooltip-rel {
                height: @headerIconSize;
            }
            &:hover .header-icon-color {
                color: #04CAFC;
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