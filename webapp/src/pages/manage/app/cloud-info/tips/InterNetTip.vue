<template>
    <Modal v-model="modal" width="60%">
        <p slot="header" style="text-align: left">
            <Icon type="ios-world-outline" style="color: #39f; font-size: 1rem;"></Icon>
            <span>{{department}}互联网</span>
        </p>
        <div>
            <section class="card-container">
                <Card class="card">
                    <div style="text-align:center">
                        <Icon type="ios-cog" style="color: #f90;" class="icon-style"></Icon>
                        <h3>
                            <!--<span v-if="isConnectNet.govExtranet === true">已接入政务外网</span>-->
                            <!--<span v-else-if="isConnectNet.govExtranet === false">未接入政务外网</span>-->
                            <!--<span v-else>政务外网暂无数据</span>-->
                            <span>互联网运营商：{{internetOffer}}</span>
                        </h3>
                    </div>
                </Card>
                <Card class="card">
                    <div style="text-align:center">
                        <Icon type="network" class="icon-style"></Icon>
                        <h3>
                            <!--<span v-if="isConnectNet.specialNetwork === true">已接入专网</span>-->
                            <!--<span v-else-if="isConnectNet.specialNetwork === false">未接入专网</span>-->
                            <!--<span v-else>专网暂无数据</span>-->
                            <span>互联网带宽：{{internetWidth}}</span>
                        </h3>
                    </div>
                </Card>
            </section>
        </div>
        <div slot="footer">
            <Button type="primary" long @click="closeModal">关闭</Button>
        </div>
        <!--<Spin size="large" fix v-if="isShowLoading"></Spin>-->
    </Modal>
</template>

<script>
    export default {
        name: "",
        props: {
            allInfo: Array
        },
        data(){
            return {
                isShowLoading: true,
                isShowPie: false,
                modal: false,
                department: '',
                arr: [],
                internetOffer: '',
                internetWidth: ''
            }
        },
        methods: {
            closeModal(){
                this.modal = false;
            }
        },
        mounted(){
            this.$bus.$on('InterNetTip', (department) => {
                this.modal = true;
                this.department = department;
                this.allInfo.forEach(item => {
                    if(item.department === department) {
                        this.internetOffer = item.internetOffer;
                        this.internetWidth = item.internetWidth;
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
            width: 48%;
            display: inline-block;
        }
    }
    .icon-style {
        font-size: 3rem;
        color: #2D8CF0;
    }
</style>