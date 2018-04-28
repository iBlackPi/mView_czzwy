<!--todo 裸露在最外面-->
<template>
    <div class="main">
        <div class="header">
            <div class="logo"></div>
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
    import AsideMenu from '../../../components/AsideMenu.vue';
    import Breadcrumb from '../../../components/bread-crumb/BreadCrumb.vue';
    import HeaderContent from './main-component/HeaderContent.vue';
    export default {
        data() {
            return {
                menuCollapse: false
            };
        },
        components: {
            'aside-menu': AsideMenu,
            'bread-crumb': Breadcrumb,
            'header-content': HeaderContent
        },
        methods: {
            changeMenuCollapse(menuCollapse) {
                this.menuCollapse = menuCollapse;
            }
        },
        mounted() {
            console.log('=======================main:', this);
            //第一个进入的时候初始化当前路由被点击次数(没有此方法会导致刷新之后,第一个点击菜单不请求数据)
            this.$store.commit('menu/changeRouteCount', this.$route.name);
        }
    };
</script>

<style lang="less">

    @import '../../../assets/css/theme.less';

    .main {

        height: 100%;
        width: 100%;
        .header {
            height: @headerHeight;
            line-height: @headerHeight;
            background-color: @headerBgcolorDark;

            .logo {
                width: 240px;/*TODO 测试用*/
                height: @headerHeight;
                line-height: @headerHeight;
                float: left;
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
</style>