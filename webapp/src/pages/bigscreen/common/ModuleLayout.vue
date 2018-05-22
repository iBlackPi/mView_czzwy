<template>
    <div class="module-layout">
        <section class="module-layout-title">
            <p style="padding-left: .2rem; white-space: nowrap;">
                <!--<Icon style="color: rgba(21, 107, 252, 1);" type="ionic"></Icon>-->
                <i style="color: rgba(3, 162, 251, 1);" class="icon iconfont icon-biaoti1"></i>
                &nbsp;
                <span style="white-space: nowrap; font-size: .8rem; font-family: 时尚中黑简体; letter-spacing: .1rem;" v-html="title"></span>
            </p>
        </section>
        <section class="module-layout-content">
            <slot></slot>
        </section>
    </div>
</template>

<script>
    export default {
        name: "module-layout",
        props: {
            title: {
                type: String,
                default: ''
            }
        }
    }
</script>

<style scoped type="text/less" lang="less">
    .module-layout {
        width: 100%;
        height: 100%;
        /*background-image: url(../../../assets/imgs/module-bg.png);*/
        /*background-size: 100% 100%;*/
        /*box-shadow: inset 0 0 1rem .5rem rgba(3, 144, 236, 0.1);*/
        .module-layout-title {
            height: 15%;
            padding: .2rem;
            background: linear-gradient(to right, rgba(24, 38, 101, 0.5), rgba(24, 38, 101, 0));
            p {
                color: #b5d6fc;
                height: 100%;
                font-size: 1rem;
            }
        }
        .module-layout-content {
            height: 85%;
        }
    }
</style>