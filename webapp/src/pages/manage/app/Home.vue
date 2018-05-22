<template>
    <div class="home">
        <!--<info-maintain></info-maintain>-->
        <section class="fun-container">
                <div class="fun"  @click="goBusiPage">
                    <i class="icon iconfont icon-caidan"></i>
                    <span>信息总览</span>
                </div>
                <div class="fun" @click="goBusiPage">
                    <i class="icon iconfont icon-map"></i>
                    <span>部门信息</span>
                </div>
                <div class="fun" @click="goBusiPage">
                    <i class="icon iconfont icon-cube"></i>
                    <span>信息化系统详情</span>
                </div>
                <div class="fun" @click="goBusiPage">
                    <i class="icon iconfont icon-huizong-"></i>
                    <span>资源目录汇总</span>
                </div>
                <div class="fun" @click="goBusiPage">
                    <i class="icon iconfont icon-home"></i>
                    <span>机房信息</span>
                </div>
                <div class="fun" @click="goBusiPage">
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
            goBusiPage(e) {
                let text = e.currentTarget.children[1].innerText;
                if(text === '信息总览') {
                    this.$router.push({name: 'info-maintain'});
                }
                if(text === '部门信息') {
                    this.$router.push({name: 'department-info'});
                }
                if(text === '信息化系统详情') {
                    this.$router.push({name: 'info-sys-maintain'});
                }
                if(text === '资源目录汇总') {
                    this.$router.push({name: 'resource-catalog-manage'});
                }
                if(text === '机房信息') {
                    this.$router.push({name: 'computer-room'});
                }
                if(text === '大屏') {
                    this.$router.push({name: 'bigMain'});
                }
            }
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