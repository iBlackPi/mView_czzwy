<template>
    <div class="shrink-menu">
        <template v-for="firstMenu of menuData">
            <Dropdown placement="right-start" @on-click="changeSelect" class="dropdown-container">
                <Button type="text" class="shrink-btn">
                    <Icon :size="20" :type="firstMenu.icon"></Icon>
                </Button>
                <DropdownMenu slot="list">
                    <Dropdown v-if="firstMenu.children" :placement=" firstMenu.children? 'right-start' : '' ">
                        <DropdownItem :name=" firstMenu.children ? '' : firstMenu.name ">
                            {{firstMenu.title}}
                            <Icon type="ios-arrow-right" v-if="firstMenu.children"></Icon>
                        </DropdownItem>
                        <DropdownMenu slot="list">
                            <template v-for="secondMenu of firstMenu.children">
                                <Dropdown v-if="secondMenu.children" :placement=" secondMenu.children? 'right-start' : '' ">
                                    <DropdownItem :name=" firstMenu.children ? '' : secondMenu.name ">
                                        {{secondMenu.title}}
                                        <Icon type="ios-arrow-right" v-if="firstMenu.children"></Icon>
                                    </DropdownItem>
                                    <DropdownMenu slot="list">
                                        <template v-for="thirdMenu of secondMenu.children">
                                            <DropdownItem :name="thirdMenu.name">
                                                {{thirdMenu.title}}
                                            </DropdownItem>
                                        </template>
                                    </DropdownMenu>
                                </Dropdown>
                                <DropdownItem :name="secondMenu.name" v-else>
                                    {{secondMenu.title}}
                                </DropdownItem>
                            </template>
                        </DropdownMenu>
                    </Dropdown>
                    <DropdownItem :name="firstMenu.name" v-else>
                        {{firstMenu.title}}
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown> 
        </template>
    </div>
</template>

<script>
    export default {
        props: {
            menuData: {
                required: true,
                type: Array
            },
            iconSize: {
                default: 20
            }
        },
        methods: {
            changeSelect(name) {
                this.$emit('change-select', name);
            }
        }
    };
</script>

<style lang="less">

    @import '../../assets/css/theme.less';

    .shrink-menu {
        text-align: center;
        overflow: hidden;
        width: @shrinkMenuWidth;
        .dropdown-container {
            min-width: @shrinkMenuWidth;
            .shrink-btn {
                display: block;
                width: 100%;
                border-radius: 0;
                height: 40px;
                line-height: 40px;
                &:hover {
                    background-color: @shrinkMenuBtnBgColorActive;
                }
            }

            .ivu-select-dropdown {
                background-color: @shrinkDropDownBgColor;
                .ivu-dropdown-item {
                    color: #93989d;
                }
                .ivu-dropdown-item {
                    &:hover {
                        background-color: @shrinkDropDownBgColorActive;
                        color: #fff;
                    }
                }
            }
        }
        
    }
</style>