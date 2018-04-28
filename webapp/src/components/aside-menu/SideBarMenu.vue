<template>
    <Menu width="auto" :active-name="$route.name" :open-names="openNames" @on-select="changeSelect" :class="'menu-theme' + (theme ? ('-' + theme) : '')" ref="menuRef">
        <loop-sub-menu :menu-data="menuData" :open-names="openNames"></loop-sub-menu>
    </Menu>
</template>

<script>
    import LoopSubMenu from './LoopSubMenu.vue';
    export default {
        props: {
            openNames: {
                type: Array,
                default: () => {
                    return [];
                }
            },
            theme: {
                type: String
            },
            menuData: {
                require: true,
                type: Array,
                default: () => {
                    return [];
                }
            }
        },
        components: {
            'loop-sub-menu': LoopSubMenu
        },
        methods: {
            /*点击菜单*/
            changeSelect(name) {
                this.$emit('change-select', name);
            },
            /*更新菜单的状态*/
            updateStatus() {
                this.$nextTick(() => {
                    this.$refs['menuRef'].updateOpened();
                    this.$refs['menuRef'].updateActiveName();
                });
            }
        }
    };
</script>

<style lang="less">

    @import '../../assets/css/theme.less';

    /*改变默认样式(不包括颜色)*/
    .ivu-menu {
        &.menu-theme-dark {
            height: calc(~"100% - @{collapseBtnHeight}");
            position: relative;

            li {
                overflow: hidden;
                text-overflow:ellipsis;
                white-space: nowrap;
            }

            .ivu-menu-submenu-title-icon {
                display: none;
            }

            .ivu-menu-item {
                border-right: none;

                &.ivu-menu-item-active:not(.ivu-menu-submenu) {
                    border-right: none;
                }
            }

            &:after {
                display: none;
            }
            
        }
    }

    /*改变样式(颜色)*/
    .ivu-menu {
        &.menu-theme-dark {
            background-color: @menuBgDark;

            li {color: @darkMenuNormalColor;}

            .ivu-menu-submenu {
                &:not(.ivu-menu-submenu-has-parent-submenu) {
                    &.ivu-menu-opened, &:hover {
                        & > .ivu-menu-submenu-title {
                            background-color: @darkFirstMenuActive;
                            color: @darkMenuColor;
                        }
                    }
                }

                &.ivu-menu-opened, &:hover {
                    & > .ivu-menu-submenu-title {
                        background-color: @darkSubmenuActive;
                        color: @darkMenuColor;
                    }
                }
            }

            .ivu-menu-item {
                border-left: 1px solid transparent;
                &.ivu-menu-item-active, &:hover {
                    background-color: @darkMenuItemActive;
                    color: @darkMenuColor;
                    border-left-color: @darkBorderLeft;
                }
            }


            /*三级菜单点样式*/
            .ivu-menu-submenu {
                .ivu-menu-submenu {
                    .ivu-menu-item {
                        .menu-point {
                            position: relative;
                            &:before {
                                content: "";
                                position: absolute;
                                left: -10px;
                                top: 50%;
                                transform: translateY(-50%);
                                width: 4px;
                                height: 4px;
                                border-radius: 50%;
                                background-color: @threeMenuPointColor;
                            }

                        }

                        &.ivu-menu-item-selected, &:hover {
                            .menu-point {
                                &:before {
                                    background-color: #fff;
                                }
                            }
                        }
                    }
                }
            }


        }
    }
</style>