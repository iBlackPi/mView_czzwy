<template>
    <div class="bigmain">
        <!--大屏头部-->
        <header class="bigmain-top">
           <custom-header></custom-header>
        </header>
        <!--大屏主体-->
        <section class="bigmain-content">
            <section class="bigmain-content-top">
                <section class="bigmain-content-top-left">
                    <section class="bigmain-content-top-lefttop">
                        <computor-room></computor-room>
                    </section>
                    <section class="bigmain-content-top-leftbottom">
                        <basic-equipment></basic-equipment>
                    </section>
                </section>
                <section class="bigmain-content-top-center">
                    <cz-map></cz-map>
                </section>
                <section class="bigmain-content-top-right">
                    <section class="bigmain-content-top-righttop">
                        <policy-sys></policy-sys>
                    </section>
                    <section class="bigmain-content-top-rightbottom">
                        <connect-net></connect-net>
                    </section>
                </section>
            </section>
            <section class="bigmain-content-bottom">
                <section class="bigmain-content-bottom-left">
                    <connect-operator></connect-operator>
                </section>
                <section class="bigmain-content-bottom-right">
                    <info-share></info-share>
                </section>
            </section>
        </section>
    </div>
</template>

<script>
    import ComputorRoom from './charts/big-main/ComputorRoom';
    import PolicySys from './charts/big-main/PolicySys';
    import BasicEquipment from './charts/big-main/BasicEquipment';
    import ConnectNet from './charts/big-main/ConnectNet';
    import ConnectOperator from './charts/big-main/ConnectOperator';
    import InfoShare from './charts/big-main/InfoShare';
    import CzMap from './common/CzMap';
    import CustomHeader from './common/CustomHeader';
    export default {
        name: "big-main",
        data(){
            return {

            }
        },
        components: {
            CzMap,
            ComputorRoom,
            PolicySys,
            BasicEquipment,
            ConnectNet,
            ConnectOperator,
            InfoShare,
            CustomHeader
        }
    }
</script>

<style scoped type="text/less" lang="less">
    .bigmain {
        width: 100%;
        height: 100%;
        overflow: hidden;
        background: url(../../assets/imgs/home_bg.jpg) repeat-x;
        animation: move_bg 25s linear alternate infinite;
        background-size: cover;
    }
    .bigmain-top {
        .position_absolute(0, 0, 100%, 10%);
        .module-common;
    }
    .bigmain-content {
        .position_absolute(11%, 0, 100%, 89%);
        .bigmain-content-top {
            .position_absolute(0, 0, 100%, 66%);
            .bigmain-content-top-left {
                .position_absolute(0, 0, 25%, 100%);
                .bigmain-content-top-lefttop {
                    .position_absolute(0, 0, 100%, 49%);
                    .module-common;
                }
                .bigmain-content-top-leftbottom {
                    .position_absolute(51%, 0, 100%, 49%);
                    .module-common;
                }
            }
            .bigmain-content-top-center {
                .position_absolute(0, 25.5%, 49%, 100%);
                .module-common;
            }
            .bigmain-content-top-right {
                .position_absolute_right(0, 0, 25%, 100%);
                .bigmain-content-top-righttop {
                    .position_absolute(0, 0, 100%, 49%);
                    .module-common;
                }
                .bigmain-content-top-rightbottom {
                    .position_absolute(51%, 0, 100%, 49%);
                    .module-common;
                }
            }
        }
        .bigmain-content-bottom {
            .position_absolute(67%, 0, 100%, 33%);
            .bigmain-content-bottom-left {
                .position_absolute(0, 0, 49.75%, 100%);
                .module-common;
            }
            .bigmain-content-bottom-right {
                .position_absolute_right(0, 0, 49.75%, 100%);
                .module-common;
            }
        }
    }
    /*方法*/
    /*距左绝对定位*/
    .position_absolute(@top, @left, @width, @height){
        position: absolute;
        top: @top;
        left: @left;
        width: @width;
        height: @height;
    }
    /*距右绝对定位*/
    .position_absolute_right(@top, @right, @width, @height){
        position: absolute;
        top: @top;
        right: @right;
        width: @width;
        height: @height;
    }
    .module-common {
        background-color: rgba(24,38,101,.3);
    }
    @keyframes move_bg {
        0% {
            background-position: -100px bottom;
        }
        100% {
            background-position: 100px bottom;
        }
    }
</style>