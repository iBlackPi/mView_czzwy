<template>
    <section class="header-content">
        <span @click="goToManage" style="font-family: '时尚中黑简体';">沧州市政务信息化资源统计</span>
        <span @click="changeUrl" class="change-url">
            <Icon type="arrow-swap"></Icon>
        </span>
        <!--0、1上浮动画-->
        <ul class="num-effect">
            <li>0</li>
            <li>1</li>
            <li>0</li>
            <li>1</li>
            <li>0</li>
            <li>1</li>
            <li>0</li>
            <li>1</li>
            <li>0</li>
            <li>1</li>
            <li>0</li>
        </ul>
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
        letter-spacing: .1rem;
        text-align: center;
        &>span:nth-child(1) {
            .vertical_center;
            z-index: 9;
        }
        .change-url {
            .vertical_center(50%, 98%);
            z-index: 9;
            &:hover {
                cursor: pointer;
                color: #03a9ff;
            }
        }
    }
    ul,li{ padding:0;margin:0;list-style:none}
    .num-effect {
        position: absolute;
        height: 100%;
        width: 100%;
        font-size: 1.2rem;
        & > li {
            position: absolute;
            bottom: 0;
        }
        & > li:nth-child(3n + 1){
            color: #02A2FC;
        }
        & > li:nth-child(3n + 2){
            color: #01B345;
        }
        & > li:nth-child(3n + 3){
            color: #F4D03A;
        }
        & > li:nth-child(1) {
            left: 0;
            animation: float_up 3s linear infinite;
        }
        & > li:nth-child(2) {
            left: 10%;
            animation: float_up 5s 0s linear infinite;
        }
        & > li:nth-child(3) {
            left: 20%;
            animation: float_up 3.5s 0s linear infinite;
        }
        & > li:nth-child(4) {
            left: 30%;
            animation: float_up 5s 0s linear infinite;
        }
        & > li:nth-child(5) {
            left: 40%;
            animation: float_up 2s 0s linear infinite;
        }
        & > li:nth-child(6) {
            left: 50%;
            animation: float_up 5.5s 0s linear infinite;
        }
        & > li:nth-child(7) {
            left: 60%;
            animation: float_up 4s 0s linear infinite;
        }
        & > li:nth-child(8) {
            left: 70%;
            animation: float_up 5s 0s linear infinite;
        }
        & > li:nth-child(9) {
            left: 80%;
            animation: float_up 3s 0s linear infinite;
        }
        & > li:nth-child(10) {
            left: 90%;
            animation: float_up 2s 0s linear infinite;
        }
        & > li:nth-child(11) {
            left: 99%;
            animation: float_up 4s 0s linear infinite;
        }
    }

    /*垂直水平居中*/
    .vertical_center(@top: 50%, @left: 50%) {
        position: absolute;
        top: @top;
        left: @left;
        transform: translate(-50%, -50%);
    }
    /*数字0、1上浮动画*/
    @keyframes float_up {
        0% {
            opacity: .3;
            bottom: 0;
        }
        30% {
            opacity: .6;
            bottom: 30%;
        }
        100% {
            opacity: 0;
            bottom: 100%;
        }
    }
</style>