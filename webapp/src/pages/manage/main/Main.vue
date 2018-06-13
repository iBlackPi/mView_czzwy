<!--todo 裸露在最外面-->
<template>
    <div class="main">
        <div class="header">
            <div class="logo" @click="goHome">
                <!--<Icon type="ios-pie-outline" style="font-size: 1.6rem; font-weight: bold; color: #2D8CF0;"></Icon>-->
                <logo></logo>
                <span style="margin-left: 2.2rem;">沧州市政务信息化资源统计</span>
            </div>
            <div class="header-content">
                <header-content></header-content>
            </div>
        </div>
        <div class="content-container" :class="{'menu-collapse': menuCollapse}">
            <div class="aside-menu">
                <aside-menu @menu-collapse-change="changeMenuCollapse"></aside-menu>
            </div>
            <div class="content">
                <div class="dynamic-content-container">
                    <div class="bread-crumb-container">
                        <bread-crumb></bread-crumb>
                    </div>
                    <!-- <transition name="move"> -->
                    <div class="dynamic-content">
                        <router-view></router-view>
                    </div>
                    <!-- </transition> -->
                </div>
            </div>
        </div>
    </div>
</template>

<!--todo 两个style合并-->
<style lang="less">
    .move-enter {
        transform: translateX(100%);
    }

    .move-enter-to {
        transform: translateX(0);
    }

    .move-leave {
        transform: translateX(0);
    }

    .move-leave-to {
        transform: translateX(-100%);
    }

    .move-enter-active, .move-leave-active {
        transition: transform 300ms;
    }
</style>

<script type="text/javascript">
    import AsideMenu from '../../../components/aside-menu/AsideMenu.vue';
    import Breadcrumb from '../../../components/bread-crumb/BreadCrumb.vue';
    import HeaderContent from './main-component/HeaderContent.vue';
    import Logo from './main-component/Logo';

    export default {
        data() {
            return {
                menuCollapse: false
            };
        },
        components: {
            'aside-menu': AsideMenu,
            'bread-crumb': Breadcrumb,
            'header-content': HeaderContent,
            Logo
        },
        methods: {
            changeMenuCollapse(menuCollapse) {
                this.menuCollapse = menuCollapse;
            },
            goHome() {
                this.$router.push({name: 'home'});
            }
        },
        mounted() {
            //第一个进入的时候初始化当前路由被点击次数(没有此方法会导致刷新之后,第一个点击菜单不请求数据)
            this.$store.commit('menu/changeRouteCount', this.$route.name);
        }
    };
</script>

<style lang="less" type="text/less">

    @import '../../../assets/css/theme.less';

    .main {

        height: 100%;
        width: 100%;
        .header {
            height: @headerHeight;
            line-height: @headerHeight;
            background-color: @headerBgcolorDark;

            .logo {
                position: relative;
                width: 360px;
                height: @headerHeight;
                line-height: @headerHeight;
                float: left;
                color: #fff;
                font-size: 1.3rem;
                letter-spacing: .1rem;
                padding-left: 1rem;
                font-family: fationblack;
                cursor: pointer;
            }

            .header-content {
                float: right;
                height: @headerHeight;
                line-height: @headerHeight;
            }

            &:after {
                content: "";
                display: block;
                clear: both;
            }
        }

        .content-container {
            width: 100%;
            height: calc(~"100% - @{headerHeight}");

            .aside-menu {
                width: @menuWidth;
                transition: all 300ms linear;
                height: 100%;
                overflow-x: hidden;
                overflow-y: auto;
                background-color: @menuBgDark;
            }

            &.menu-collapse {
                .aside-menu {
                    width: @menuMiniWidth;
                }

                .content {
                    left: @menuMiniWidth;
                    width: calc(~"100% - @{menuMiniWidth}");
                }
            }
        }
    }

    .content {
        position: absolute;
        left: @menuWidth;
        top: @headerHeight;
        width: calc(~"100% - @{menuWidth}");
        transition: all 300ms linear;
        height: 100%;
        background-color: #f1f1f1;

        .dynamic-content-container {
            height: 100%;
            position: relative;
            overflow: auto;
            .bread-crumb-container {
                height: @breadCrumbHeight;
                line-height: @breadCrumbHeight;
                background-color: #fff;
                margin: @contentPadding;
                border-radius: 5px;
                padding: 0 10px 0 10px;
            }
            .dynamic-content {
                margin: @contentPadding;
                margin-top: 0;
                width: calc(~"100% - 2 * @{contentPadding}");
                height: calc(~"100% - 6 * @{contentPadding} - @{breadCrumbHeight}");
                position: absolute;
                overflow: auto;
            }
        }
    }
    .svg-wrapper {
        height: 60px;
        margin: 0 auto;
        position: relative;
        top: 50%;
        transform: translateY(-50%);
        width: 320px;
    }

    .shape {
        fill: transparent;
        stroke-dasharray: 140 540;
        stroke-dashoffset: -474;
        stroke-width: 8px;
        stroke: #19f6e8;
    }

    .text {
        color: #fff;
        font-family: 'Roboto Condensed';
        font-size: 22px;
        letter-spacing: 8px;
        line-height: 32px;
        position: relative;
        top: -48px;
    }

    @keyframes draw {
        0% {
            stroke-dasharray: 140 540;
            stroke-dashoffset: -474;
            stroke-width: 8px;
        }
        100% {
            stroke-dasharray: 760;
            stroke-dashoffset: 0;
            stroke-width: 2px;
        }
    }

    .svg-wrapper:hover .shape {
        -webkit-animation: 0.5s draw linear forwards;
        animation: 0.5s draw linear forwards;
    }
</style>