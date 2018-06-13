<template>
    <section class="header-content">
        <span @click="goToManage" style="font-family: 'fationblack';">沧州市政务信息化资源统计</span>
        <span class="time-container">
            {{time}}
        </span>
        <span class="change-url">
            <span @click="changeUrl('pre')">
                <Icon type="ios-rewind-outline"></Icon>
            </span>

            <Tooltip content="回到大屏" placement="bottom-end" class="icon-middle">
                <span @click="GoToBigscreen" class="go-to-bigscreen">
                    <i class="icon iconfont icon-qiehuan" style="font-size: 1.2rem;color: #5AAAFF;"></i>
                </span>
                <div slot="content">
                    <section class="bigscreen-shortcut" @click="GoToBigscreen">
                        <div class="mask"></div>
                        <span>①</span>
                    </section>
                    <section class="bigscreen-shortcut" @click="GoToBigscreen('two')">
                        <div class="mask"></div>
                        <span>②</span>
                    </section>
                    <section class="bigscreen-shortcut" @click="GoToBigscreen('three')">
                        <div class="mask"></div>
                        <span>③</span>
                    </section>
                </div>
            </Tooltip>

            <span @click="changeUrl('next')">
                <Icon type="ios-fastforward-outline"></Icon>
            </span>
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
        data() {
            return {
                time: ''
            }
        },
        methods: {
            changeUrl(target) {
                // 切换大屏
                let name = '';
                if(this.$route.path === '/bigMain') {
                    if(target === 'next') {
                        name = 'bigBenefit';
                    }
                }
                if(this.$route.path === '/bigBenefit') {
                    if(target === 'pre') {
                        name = 'bigMain';
                    }
                    if(target === 'next') {
                        name = 'bigOther';
                    }
                }
                if(this.$route.path === '/bigOther') {
                    if(target === 'pre') {
                        name = 'bigBenefit';
                    }
                }
                this.$router.push({
                    name: name
                });
            },
            GoToBigscreen(bigscreenFlag){
                let name = 'bigMain';
                if(bigscreenFlag === 'two') {
                    name = 'bigBenefit';
                }
                if(bigscreenFlag === 'three') {
                    name = 'bigOther'
                }
                this.$router.push({name: name});
            },
            goToManage() {
                this.$router.push({name: 'login'});
            },
            dateFormat(fmt) {
                let date = new Date();
                let o = {
                    "M+": date.getMonth() + 1,               //月份
                    "d+": date.getDate(),                    //日
                    "h+": date.getHours(),                   //小时
                    "m+": date.getMinutes(),                 //分
                    "s+": date.getSeconds(),                 //秒
                    "q+": Math.floor((date.getMonth() + 3) / 3), //季度
                    "S": date.getMilliseconds()             //毫秒
                };
                if (/(y+)/.test(fmt)) {
                    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
                }
                for (let k in o) {
                    if (new RegExp("(" + k + ")").test(fmt)) {
                        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
                    }
                }
                return fmt;
            }
        },
        created() {
            setInterval(() => {
                this.time = this.dateFormat('yyyy-MM-dd hh:mm:ss');
            }, 1000)
        }
    }
</script>

<style scoped type="text/less" lang="less">
    .icon-qiehuan:hover {
        color: rgba(3, 162, 251, 1);
    }
    .go-to-bigscreen:hover {
        &>i{
            color: #04CAFC !important;
        }
        cursor: pointer;
    }
    .bigscreen-shortcut {
        position: relative;
        width: 12rem;
        height: 7rem;
        font-size: 2rem;
        background-size: 100% 100%;
        & > .mask {
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0);
            transition: background-color .4s linear;
        }
        & > span {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            color: rgba(255, 255, 255, 0);
            transition: color .5s linear;
        }
        &:hover span {
            color: rgba(255, 255, 255, 1);
        }
        &:hover .mask {
            background-color: rgba(0, 0, 0, .4);
        }
        &:nth-child(1) {
            background-image: url(../../../assets/imgs/bigscreenOne.png);
        }
        &:nth-child(2) {
            margin-top: .5rem;
            background-image: url(../../../assets/imgs/bigscreenTwo.png);
        }
        &:nth-child(3) {
            margin-top: .5rem;
            background-image: url(../../../assets/imgs/bigscreenThree.png);
        }
    }
    .header-content {
        height: 100%;
        color: #fff;
        font-size: 1.5rem;
        letter-spacing: .2rem;
        text-align: center;

        background: url(../../../assets/imgs/head-bg.png);
        background-size: 100% 100%;
        & > span:nth-child(1) {
            .vertical_center;
            z-index: 9;
        }
        .time-container {
            font-size: 1rem;
            text-align: left;
            color: rgba(255, 255, 255, .7);
            font-family: led;
            width: 30%;
            .vertical_center(27%, 16%);
        }
        .change-url {
            white-space: nowrap;
            .vertical_center(23%, 96.5%);
            z-index: 9;
            i {
                font-size: 1rem;
                color: rgba(3, 180, 251, 1);
                transition: font-size .1s linear;
                &:hover {
                    font-size: 1.3rem;
                    cursor: pointer;
                }
            }
        }
    }

    ul, li {
        padding: 0;
        margin: 0;
        list-style: none
    }

    .num-effect {
        position: absolute;
        height: 100%;
        width: 100%;
        font-size: 1.2rem;
        & > li {
            position: absolute;
            bottom: 0;
        }
        & > li:nth-child(3n + 1) {
            color: #02A2FC;
        }
        & > li:nth-child(3n + 2) {
            color: #01B345;
        }
        & > li:nth-child(3n + 3) {
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