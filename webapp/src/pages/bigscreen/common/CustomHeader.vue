<template>
    <section class="header-content">
        <span @click="goToManage">沧州市政务信息化资源统计</span>
        <span @click="changeUrl" class="change-url">
            <Icon type="arrow-swap"></Icon>
        </span>
    </section>
</template>

<script>
    export default {
        name: "custom-header",
        methods: {
            changeUrl(){
                // 切换大屏
                this.$router.push({
                    name: this.$route.path === '/bigMain' ? 'bigBenefit' : 'bigMain',
                    target: '_blank'
                });
            },
            goToManage(){
                this.$router.push({name: 'login'});
            }
        }
    }
</script>

<style scoped type="text/less" lang="less">
    .header-content {
        height: 100%;
        color: #fff;
        font-size: 1.9rem;
        /*font-weight: bold;*/
        letter-spacing: .1rem;
        text-align: center;
        &>span {
            .vertical_center;
        }
        .change-url {
            .vertical_center(50%, 98%);
            &:hover {
                cursor: pointer;
                color: #03a9ff;
            }
        }
    }

    /*垂直水平居中*/
    .vertical_center(@top: 50%, @left: 50%) {
        position: absolute;
        top: @top;
        left: @left;
        transform: translate(-50%, -50%);
    }
</style>