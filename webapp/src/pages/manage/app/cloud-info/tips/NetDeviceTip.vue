<template>
    <Modal v-model="modal" width="60%">
        <p slot="header" style="text-align: left">
            <Icon type="ios-world-outline" style="color: #01B344; font-size: 1rem;"></Icon>
            <span>{{department}}网络设备统计</span>
        </p>
        <div style="height: 10rem;">
            <ve-rect-coordinate
                    id="net-device-tip"
                    style="height:100%"
                    backgroundColor=""
                    :xAxisData="xAxisData"
                    :showLegend=true
                    :coverOption="coverOption2"
                    v-if="isShowNetDevice">
                <ve-bar
                        :data="data"
                        name="数量（个）"
                        barWidth="20"
                ></ve-bar>
            </ve-rect-coordinate>
        </div>
        <div slot="footer">
            <Button type="primary" long @click="closeModal">关闭</Button>
        </div>
        <Spin size="large" fix v-if="isShowLoading"></Spin>
    </Modal>
</template>

<script>
    export default {
        name: "",
        data(){
            return {
                isShowLoading: true,
                isShowNetDevice: false,
                modal: false,
                department: '',
                totalCount: '',
                xAxisData: ['路由器', '交换机', '安全设备'],
                data: [64, 60, 66],
                coverOption2: {
                    grid: {
                        top: '12%',
                        bottom: '15%'
                    },
                    legend: {
                        top: -10,
                        right: -30,
                        textStyle: {
                            color: '#217bcc'
                        }
                    },
                    xAxis: {
                        type: 'category',
                        axisLabel: {
                            show: true,
                            interval: 0,
                            rotate: 0,
                            textStyle: {
                                color: '#333'
                            }
                        }
                    },
                    yAxis: {
                        type: 'value',
                        /*分隔线*/
                        splitLine: {
                            show: false,
                        },
                        /*刻度标签*/
                        axisLabel: {
                            show: true,
                            textStyle: {
                                color: '#333'
                            }
                        }
                    }
                }
            }
        },
        methods: {
            closeModal(){
                this.modal = false;
            }
        },
        mounted(){
            this.$bus.$on('showNetDeviceTip', (department) => {
                this.isShowLoading = true;
                // todo 延迟画图，防止容器没有高度
                setTimeout(() => {this.isShowNetDevice = true; this.isShowLoading = false;}, 500);
                this.modal = true;
                this.department = department;
                this.$httpt.get(`networkController.do?getCzNetwork&department=${department}`).then(({data}) => {
                    if(data.success){
                        let temp = data.data.list;
                        this.data = [];
                        if(temp instanceof Array){
                            this.data.push(temp[0].router);
                            this.data.push(temp[0].switchMachine);
                            this.data.push(temp[0].safetyEquipment);
                        }
                    }else{
                        console.error('信息总览提示 信息化系统调研表信息失败');
                    }
                    this.isShowLoading = false;
                }).catch(err => {
                    throw Error(err);
                })
            });
        }
    }
</script>

<style scoped>

</style>