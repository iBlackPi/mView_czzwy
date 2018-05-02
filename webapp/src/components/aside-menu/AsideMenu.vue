<!--todo asidemenu放到aside-menu文件夹中-->
<template>
    <div class="menu-container">
        <!--更改菜单折叠状态的按钮-->
        <Button class="collapse-btn" type="text" @click="changeMenuCollapse" :class="'collapse-btn' + (theme ? ('-' + theme) : '')" long>
            <Icon type="navicon" size="32" :class="{'icon-change': menuCollapse}" class="collapse-icon"></Icon>
        </Button>
        <side-bar-menu :theme="theme" :menu-data="menuData" :menu-collapse="menuCollapse" @change-select="changeSelect" :open-names="openNames" ref="sideRef" v-show="!menuCollapse && menuData !==null && menuData.length !== 0"></side-bar-menu>
        <!--显示折叠的菜单-->
        <shrink-menu :menu-data="menuData" @change-select="changeSelect" v-show="menuCollapse"></shrink-menu>
    </div>
</template>

<script>
    import SideBarMenu from './SideBarMenu.vue';
    import ShrinkMenu from './ShrinkMenu.vue';
    import {buildTree} from '../../assets/util/utils.js';
    export default {
        components: {
            'side-bar-menu': SideBarMenu,
            'shrink-menu': ShrinkMenu
        },
        data() {
            return {
                //菜单展开项
                openNames: this.$route.path.split('/').slice(1),
                //菜单主题
                theme: 'dark',
                //保存菜单数据
                // menuData: [],
                //是否展开菜单(false:展开;true:隐藏菜单,显示小菜单)
                menuCollapse: false
            };
        },
        //todo
        created() {
            //todo 直接采用store方式获取数据
            // this.getMenuData();
            //todo 这里有个设计缺陷，为了保证用户在登录成功进来能够加载菜单数据，这里调用菜单api
            //todo 在路由权限认证模块也会请求，但用户登录登录成功到home时，不需要验证，所以不会加载菜单数据
            //todo 但是在刷新页面的时候，路由权限认证模块也会去请求一次，刷新一下
            this.$store.dispatch('menu/getMenu', this);
        },
        computed: {
              menuData(){
                  //由于采用的是异步获取数据,此处需要手动更新菜单的状态
                  this.$nextTick(() => {
                      this.$refs['sideRef'].updateStatus();
                  });
                  return this.$store.state.menu.menuData;
              }
        },
        watch: {
            /*监听路由的变化(前进后退),更改菜单选择状态*/
            '$route'(to, from) {
                this.openNames = this.$route.path.split('/').slice(1);
                this.$refs['sideRef'].updateStatus();
            }
        },
        methods: {
            /*获取菜单数据*/
            getMenuData() {
                //todo 什么情况下菜单为空？？？？只有刷新的时候，没必要判断空
                // if(this.$store.state.menu.menuData.length === 0 || this.menuData.length === 0) {
                //     this.$http.get('menuController.do?m=findMenu').then(({data}) => {
                        //todo 改变store中的值应该用mutation，而不是直接更改
                        /*this.$store.state.menu.menuData = this.menuData = buildTree(data.data, 'orderNo', (item) => {
                            let obj = {
                                name: item.location,
                                title: item.title
                            };
                            return item.icon ? Object.assign(obj, {
                                icon: item.icon
                            }) : obj;
                        })[0].children;//由于后台有一个根节点,此处剔除*/
                        //todo 调用modules的方法，要写modules的名字
                        //todo 将菜单信息存入store中,并做相应处理
                //         this.$store.commit('menu/restoreMenu', {
                //             data: data.data,
                //             order: 'orderNo'
                //         });
                //         //由于采用的是异步获取数据,此处需要手动更新菜单的状态
                //         this.$nextTick(() => {
                //             this.$refs['sideRef'].updateStatus();
                //         });
                //     });
                // }
            },
            /*点击菜单,改变路由*/
            changeSelect(name) {
                //更改当前点击的路由次数
                this.$store.commit('menu/changeRouteCount', name);

                // let _menu = this.$store.state.menu;
                // if(_menu.routeCount === 0 && _menu.route !== '') {

                    //由于采用的是懒加载组件,此处显示加载动画,在vue-router全局钩子afterEach关闭加载动画(否则会导致动画提前结束,而内容还没有改变)
                    //todo 不要全屏加载
                    // this.$Spin.show();
                    //路由跳转
                    this.$router.push({
                        name: name,
                        query: {
                            t: +new Date() //保证每次点击路由的query项都是不一样的，确保会重新刷新view
                        }
                    });
                // }
            },
            /*菜单折叠展开所作的处理*/
            changeMenuCollapse() {
                this.menuCollapse = !this.menuCollapse;
                //通知父组件菜单折叠状态改变
                this.$emit('menu-collapse-change', this.menuCollapse);
            }
        }
    };
</script>

<style lang="less">

    @import '../../assets/css/theme.less';

    .menu-container {
        width: 100%;
        height: 100%;

        .collapse-btn {
            &:focus {
                box-shadow: 0 0 0 0 #fff;
            }

            &.collapse-btn-dark {
                height: @collapseBtnHeight;
                line-height: @collapseBtnHeight;
                text-align: center;
                color: #fff;
                position: relative;
                z-index: 10;
                background-color: @collapseBtnDark;
                border-radius: 0;
                

                .collapse-icon {
                    transition: transform 300ms linear;

                    &.icon-change {
                        transform: rotateZ(-90deg);
                    }
                }
            }
        }
    }
</style>