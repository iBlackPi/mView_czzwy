<template>
    <Modal v-model="modal" width="60%">
        <p slot="header" style="text-align: left">
            <Icon type="ios-world-outline" style="color: #39f; font-size: 1rem;"></Icon>
            <span>{{department}}公务内网</span>
        </p>
        <div>
            <section class="card-container">
                <Card class="card">
                    <div style="text-align:center">
                        <Icon type="ios-cog" style="color: #f90;" class="icon-style"></Icon>
                        <h3>
                            <span>公务内网运营商：{{gongwuIntranetOffer}}</span>
                        </h3>
                    </div>
                </Card>
                <Card class="card">
                    <div style="text-align:center">
                        <Icon type="network" class="icon-style"></Icon>
                        <h3>
                            <span>公务内网带宽：{{gongwuIntranetWidth}}</span>
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
        data() {
            return {
                isShowLoading: true,
                isShowPie: false,
                modal: false,
                department: '',
                arr: [],
                gongwuIntranetOffer: '',
                gongwuIntranetWidth: ''
            }
        },
        methods: {
            closeModal() {
                this.modal = false;
            }
        },
        mounted() {
            this.$bus.$on('PublicInsideNetTip', (department) => {
                this.modal = true;
                this.department = department;
                this.allInfo.forEach(item => {
                    if (item.department === department) {
                        this.gongwuIntranetOffer = item.gongwuIntranetOffer;
                        this.gongwuIntranetWidth = item.gongwuIntranetWidth;
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