<template>
    <div>
        <template v-for="(item, index) in menuData">
            <Submenu v-if="item.children && item.children.length !== 0" :name="item.name">
                <template slot="title">
                    <Icon :type="item.icon" v-if="item.icon"></Icon>
                    <span class="menu-title">{{item.title}}</span>
                    <template v-if="customStyle">
                        <span style="">
                            <span class="submenu-icon submenu-icon-length">{{item.children.length}}</span>
                            <span class="submenu-icon submenu-icon-add">+</span>
                        </span>
                    </template>
                </template>
                <loop-sub-menu :menu-data="item.children" :custom-style="true" :open-names="openNames"></loop-sub-menu>
            </Submenu>
            <MenuItem v-else :name="item.name">
                <span class="menu-point">{{item.title}}</span>
            </MenuItem>
        </template>
    </div>
</template>

<script>
    export default {
        name: 'LoopSubMenu',
        props: {
            menuData: {
                required: true,
                type: Array
            },
            customStyle: {
                default: false,
                type: Boolean
            },
            openNames: {
                required: true,
                type: Array,
                default: () => {
                    return [];
                }
            }
        }
    };
</script>

<style lang="less">
    @import '../../assets/css/theme.less';

    @submenuIconSize: 22px;
    .submenu-icon {
        border-radius: 50%;
        width: @submenuIconSize;
        line-height: @submenuIconSize;
        height: @submenuIconSize;
        display: inline-block;
        text-align: center;
        position: relative;
        left: 50px;
        background-color: @darkSubmenuIconBgColor;
        &.submenu-icon-length {
            display: none;
        }

        &.submenu-icon-add {
            color: @darkSubmenuIconAddColor;
            display: inline-block;
        }
    }

    .ivu-menu-opened {
        & > .ivu-menu-submenu-title {
            & > span {
                & > .submenu-icon-length {
                    display: inline-block;
                }

                & > .submenu-icon-add {
                    display: none;
                }
            }
        }
    }

    .menu-title {
        display: inline-block;
        vertical-align: middle;
        margin-left: 6px;
    }
</style>