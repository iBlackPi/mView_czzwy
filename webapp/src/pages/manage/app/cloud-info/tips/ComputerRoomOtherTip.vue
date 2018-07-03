<template>
    <Modal v-model="modal" width="60%">
        <p slot="header" style="text-align: left">
            <Icon type="ios-home-outline" style="color: #39f; font-size: 1rem;"></Icon>
            <span>{{department}}机房统计</span>
        </p>
        <div>
            <section class="card-container">
                <Card class="card">
                    <div style="text-align:center">
                        <Icon type="map" style="color: #f90;" class="icon-style"></Icon>
                        <h3>
                            <!--<span v-if="isConnectNet.govExtranet === true">已接入政务外网</span>-->
                            <!--<span v-else-if="isConnectNet.govExtranet === false">未接入政务外网</span>-->
                            <!--<span v-else>政务外网暂无数据</span>-->
                            <span>机房面积：{{otherInfo.computerRoomArea}}</span>
                        </h3>
                    </div>
                </Card>
                <Card class="card">
                    <div style="text-align:center">
                        <Icon type="pricetags" class="icon-style"></Icon>
                        <h3>
                            <!--<span v-if="isConnectNet.specialNetwork === true">已接入专网</span>-->
                            <!--<span v-else-if="isConnectNet.specialNetwork === false">未接入专网</span>-->
                            <!--<span v-else>专网暂无数据</span>-->
                            <span>托管机房：{{otherInfo.trustComputerRoom}}</span>
                        </h3>
                    </div>
                </Card>
                <Card class="card">
                    <div style="text-align:center">
                        <Icon type="android-cloud-outline" style="color: #19BE6B;" class="icon-style"></Icon>
                        <h3>
                            <!--<span v-if="isConnectNet.intenet === true">已接入互联网</span>-->
                            <!--<span v-else-if="isConnectNet.intenet === false">未接入互联网</span>-->
                            <!--<span v-else>互联网暂无数据</span>-->
                            <span>租云服务：{{otherInfo.cloudService}}</span>
                        </h3>
                    </div>
                </Card>
            </section>
        </div>
        <div slot="footer">
            <Button type="primary" long @click="closeModal">关闭</Button>
        </div>
    </Modal>
</template>

<script>
    export default {
        name: "",
        props: {
            computerRooms: Array
        },
        data() {
            return {
                isShowLoading: true,
                isShowPie: false,
                modal: false,
                department: '',
                arr: [],
                otherInfo: {}
            }
        },
        methods: {
            closeModal() {
                this.modal = false;
            }
        },
        mounted() {
            this.$bus.$on('ComputerRoomOtherTip', (department) => {
                this.modal = true;
                this.department = department;
                this.computerRooms.forEach((item) => {
                    if(item.department === department) {
                        this.otherInfo.computerRoomArea = item.temp3;
                        this.otherInfo.cloudService = item.temp5;
                        this.otherInfo.trustComputerRoom = item.temp4;
                    }
                });

            });
        }
    }
</script>

<style scoped type="text/less" lang="less">
    .card-container {
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        .card {
            width: 30%;
            display: inline-block;
        }
    }
    .icon-style {
        font-size: 3rem;
        color: #2D8CF0;
    }
</style>