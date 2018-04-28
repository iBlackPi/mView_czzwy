<template>
    <div class="bread-crumb">
        <a href="#" @click.prevent="toHome" class="to-home">
            Home
            <span class="ivu-breadcrumb-item-separator" v-if="breadcrumbs.length !== 0">/</span>
        </a>
        <div class="bread-crumbs">
            <Breadcrumb>
                <BreadcrumbItem v-for="(item, index) of breadcrumbs" :key="index">{{item}}</BreadcrumbItem>
            </Breadcrumb>
        </div>
    </div>
</template>

<script>
    export default {
        computed: {
            breadcrumbs() {

                /*通过路由匹配的name值,查找菜单数据中与之对应的title*/
                let _findTitle = (menuArr, routeMatchedArr, matchedIndex, titleArr) => {
                    for(let i = 0, len = routeMatchedArr.length; i < len; ++i) {
                        for(let j = 0; j < menuArr.length; ++j) {
                            if(routeMatchedArr[i].name === menuArr[j].name) {
                                titleArr.push(menuArr[j].title);
                                if(menuArr[j].children && matchedIndex < routeMatchedArr.length) {
                                    _findTitle(menuArr[j].children, routeMatchedArr, matchedIndex + 1, titleArr);
                                }
                            }
                            
                        }
                    }
                };

                let _breadcrumbs = [];
                let _matched = this.$route.matched, _menuData = this.$store.state.menu.menuData;
                _findTitle(_menuData, _matched, 0, _breadcrumbs);
                /*该方法是将面包屑的内容保存在路由中(此种方法不推荐,router和后端数据要统一维护)*/
                //this.$route.matched.forEach((item) => {
                    //item.meta.breadcrumb && _breadcrumbs.push(item.meta.breadcrumb);
                //});
                return _breadcrumbs;
            }
        },
        methods: {
            toHome() {
                //重置路由次数
                this.$store.commit('menu/resetRouteState');

                this.$router.push({
                    name: 'home'
                });
            }
        }
    };
</script>

<style lang="less">
    .bread-crumb {
        .to-home, .bread-crumbs{
            float: left;
        }

        .bread-crumb-container {

        }

        &:after {
            content: "";
            display: block;
            clear: both;
        }
    }
</style>