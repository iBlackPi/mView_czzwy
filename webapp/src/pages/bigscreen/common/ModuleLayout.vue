<template>
    <div class="module-layout">
        <section class="module-layout-title">
            <p>
                <Icon style="color: rgba(21, 107, 252, .8);" type="ionic"></Icon>
                &nbsp;
                <span>{{title}}</span>
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
        .module-layout-title {
            height: 15%;
            padding: .2rem;
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