<template>
    <div class="home">
        <!--<info-maintain></info-maintain>-->
        <section class="fun-container">
            <div class="fun" ref="fun" path="info-maintain">
                <i class="icon iconfont icon-caidan"></i>
                <span>全市总览</span>
            </div>
            <div class="fun" path="department-info">
                <i class="icon iconfont icon-map"></i>
                <span>局委办总览</span>
            </div>
            <div class="fun" path="info-sys-maintain">
                <i class="icon iconfont icon-cube"></i>
                <span>信息化系统统计</span>
            </div>
            <div class="fun" path="resource-catalog-manage">
                <i class="icon iconfont icon-huizong-"></i>
                <span>信息资源统计</span>
            </div>
            <div class="fun" path="computer-room">
                <i class="icon iconfont icon-home"></i>
                <span>机房信息统计</span>
            </div>
            <div class="fun" path="bigMain">
                <i class="icon iconfont icon-navicon-dphf"></i>
                <span>大屏</span>
            </div>
        </section>
    </div>
</template>
<script>
    import InfoMaintain from './cloud-info/InfoMaintain';

    export default {
        components: {
            InfoMaintain
        },
        methods: {
            goBusiPage(path) {
                this.$router.push({name: path});
            }
        },
        mounted() {
            //todo 这里对dom进行了操作，不是vue提倡的用法；考虑到代码的扩展性，如果这样写，当新增链接时我不用再更改js代码
            //todo 只需要在template中尽情添加模块即可，js代码和html都会变得清晰简单
            //todo dom对象类数组不能直接使用数组的forEach方法
            [...document.getElementsByClassName('fun')].forEach(item => {
                item.addEventListener('click', (e) => {
                    this.goBusiPage(e.currentTarget.getAttribute('path'));
                });
            })
        },
        created() {
            //todo 尽快的获取数据,用户登录成功访问的页面为home页，所以在这里获取总信息
            //todo 所以这里尽快的去获取总览信息，供对话框中的搜索框自动提示功能使用
            this.$store.dispatch('czCloudInfo/getCloudInfo', {vm: this});
        }
    }
</script>
<style lang="less" type="text/less" scoped>
    .home {
        width: 100%;
        height: 100%;
        background-color: #fff;
    }

    .fun-container {
        .center_middle;
        width: 75rem;
        .fun {
            position: relative;
            float: left;
            width: 25rem;
            height: 15rem;
            background-color: #f2f2f2;
            border: 1px solid #fff;
            cursor: pointer;
            transition: background-color .4s linear;
            &:hover i {
                color: #fff;
                /*animation: swin_icon .3s linear;*/
            }
            &:hover span {
                color: #fff;
            }
            & > i {
                .center_middle(40%, 50%);
                color: #9e87ce;
                font-size: 3.5rem;
                transform-origin: 50% 50%;
            }
            & > span {
                .center_middle(60%, 50%);
                color: #9e87ce;
                font-size: 1.2rem;
                letter-spacing: .1rem;
            }
        }
        .fun:nth-child(1) {
            background-color: #9e87ce;
            & > i {
                color: #fff;
            }
            & > span {
                color: #fff;
            }
        }
        .fun:nth-child(2):hover {
            background-color: #5c4b51;
        }
        .fun:nth-child(3):hover {
            background-color: #e0cf75;
        }
        .fun:nth-child(4):hover {
            background-color: #f5b65a;
        }
        .fun:nth-child(5):hover {
            background-color: #f25f5c;
        }
        .fun:nth-child(6):hover {
            background-color: #8abeb2;
        }
    }

    @keyframes swin_icon {
        33% {
            transform: rotate(25deg);
        }
        66% {
            transform: rotate(-25deg);
        }
    }

    /*垂直水平居中*/
    .center_middle(@top: 50%, @left: 50%) {
        position: absolute;
        top: @top;
        left: @left;
        transform: translate(-50%, -50%);
    }
</style>