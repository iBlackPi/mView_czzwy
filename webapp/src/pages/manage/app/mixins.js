/**
 * 组件混合
 * 由于点击同一路由时,vue-router的钩子函数以及组件的生命周期函数不会调用.而此时想通过点击同一路由
 * 重新获取数据,则通过下面的折中方法实现.
 * 原理:vuex中保存了路由信息(路由,路由被点击的次数)点击同一路由时,路由点击次数+1,此时,监听函数能够
 *     监视到该变化,如果不为0,则重新加载数据
 * 注意事项: (1)组件中需要添加该混合
 *           (2)组件中需要通过init方法动态获取数据,因此每一个菜单组件都需要实现init方法
 */

//todo mixins.js放到其他地方 不应该放在pages里面
export default {
    computed: {
        routeCount() {
            return this.$store.state.menu.routeCount;
        }
    },
    //todo 采用query的方式，这里应该watch $route取消计数器，因为计数器这里用到了store繁琐 耦合
    watch: {
        'routeCount'(newValue, oldValue) {
            //第一次进入的时候已经加载了数据(init函数是作为ajax请求数据的)
            //判断init函数是否存在
            if(newValue !== 0 && this.init && Object.prototype.toString.call(this.init) === '[object Function]') {
                this.init();
                this._deepInit(this.$children);
            }
        }
    },
    methods: {
        /*递归遍历子组件,执行init方法,初始化数据*/
        _deepInit(children) {
            if(children.length !== 0) {
                for(let i = 0, len = children.length; i < len; ++i) {
                    let _init = children[0].init;
                    if(_init && Object.prototype.toString.call(_init) === '[object Function]') {
                        _init();
                    }

                    this._deepInit(children[0].$children);
                }
            }
        }
    }
};