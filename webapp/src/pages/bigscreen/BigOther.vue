<template>
    <div class="bigmain">
        <!--大屏头部-->
        <header class="bigmain-top">
           <custom-header></custom-header>
        </header>
        <!--大屏主体-->
        <section class="bigmain-content">
            <section class="bigmain-content-top">
                <section class="bigmain-content-top-center">
                    <cz-downtown></cz-downtown>
                </section>
                <section class="bigmain-content-top-right">
                    <section class="bigmain-content-top-righttop">
                        <net-device-chart></net-device-chart>
                    </section>
                    <section class="bigmain-content-top-rightbottom">
                        <info-department-chart></info-department-chart>
                    </section>
                </section>
            </section>
            <section class="bigmain-content-bottom">
                <section class="bigmain-content-bottom-left">
                    <server-chart></server-chart>
                </section>

                <section class="bigmain-content-bottom-center">
                    <resource-catalog-chart></resource-catalog-chart>
                </section>

                <section class="bigmain-content-bottom-right">
                    <info-sys-chart></info-sys-chart>
                </section>
            </section>
        </section>
    </div>
</template>

<script>
    import CustomHeader from './common/CustomHeader';
    import CzDowntown from './common/CzDowntown';
    import ServerChart from './charts/big-other/ServerChart';
    import ResourceCatalogChart from './charts/big-other/ResourceCatalogChart';
    import NetDeviceChart from './charts/big-other/NetDeviceChart';
    import InfoDepartmentChart from './charts/big-other/InfoDepartmentChart';
    import InfoSysChart from './charts/big-other/InfoSysChart';
    export default {
        name: "big-main",
        data(){
            return {

            }
        },
        components: {
            CustomHeader,
            CzDowntown,
            ServerChart,
            ResourceCatalogChart,
            NetDeviceChart,
            InfoDepartmentChart,
            InfoSysChart
        }
    }
</script>
<style scoped type="text/less" lang="less">
    .bigmain {
        width: 100%;
        height: 100%;
        overflow: hidden;
        background: #0A0D17;
        background: url(../../assets/imgs/bg2.png) repeat-x;
        /*animation: move_bg 25s linear alternate infinite;*/
        background-size: cover;
    }
    .bigmain-top {
        .position_absolute(0, 0, 100%, 7%);
        .module-common;
    }
    .bigmain-content {
        .position_absolute(8%, 0, 100%, 92%);
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
                .position_absolute(0, 0, 66.5%, 100%);
                .module-common;
            }
            .bigmain-content-top-right {
                .position_absolute_right(0, 0, 33%, 100%);
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
                .position_absolute(0, 0, 33%, 100%);
                .module-common;
            }
            .bigmain-content-bottom-center {
                .position_absolute(0, 33.5%, 33%, 100%);
                .module-common;
            }
            .bigmain-content-bottom-right {
                .position_absolute_right(0, 0, 33%, 100%);
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