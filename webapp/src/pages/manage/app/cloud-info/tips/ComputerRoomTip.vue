<template>
    <Modal v-model="modal" width="60%">
        <p slot="header" style="text-align: left">
            <Icon type="ios-home-outline" style="color: #39f; font-size: 1rem;"></Icon>
            <span>{{department}}机房统计</span>
        </p>
        <div>
            <section  style="height: 10rem;" v-if="isShowPie">
                <ve-pie
                        :rippleAnimation="true"
                        style="width: 100%; height: 100%;"
                        :center="['50%', '50%']"
                        backgroundColor="transparent"
                        id="computer-room-info"
                        :data="pieData"
                        :radius="['55%','75%']"
                        :coverOption="coverOption"
                        :rippleSize = 5
                ></ve-pie>
            </section>
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
                isShowPie: false,
                modal: false,
                department: '',
                arr: [],
                pieData:
                    [
                        {value: 71, name:'自建机房'},
                        {value: 19, name:'托管机房'},
                        {value: 90, name:'租用云服务'}
                    ],
                coverOption: {
                    legend: {
                        top: 60,
                        right: 0,
                        textStyle: {
                            color: '#000'
                        }
                    },
                    series: [
                        {
                            label: {
                                normal: {
                                    show: true,
                                    formatter: `{b}:{d}({c})`
                                },
                                emphasis: {
                                    show: true,
                                    textStyle: {
                                        fontSize: '20px',
                                        fontWeight: 'bold'
                                    }
                                }
                            }
                        }
                    ]
                }
            }
        },
        methods: {
            closeModal(){
                this.modal = false;
            }
        },
        mounted(){
            this.$bus.$on('showComputerRoomTip', (department) => {
                this.isShowLoading = true;
                // todo 延时画饼图，直接画，容器还没有初始化好，会导致宽高无效
                setTimeout(() => {this.isShowPie = true; this.isShowLoading = false}, 500);
                this.modal = true;
                this.department = department;
                this.$httpt.get(`machineRoomController.do?getCzMachineRooms&start=1&pageSize=1&department=${department}`).then(({data}) => {
                    if(data.success){
                        let ComputerRoomInfo = data.data.list;
                        if(ComputerRoomInfo instanceof Array){
                            let arr = [
                                {value: 71, name:'自建机房'},
                                {value: 19, name:'托管机房'},
                                {value: 90, name:'租用云服务'}
                            ];
                            arr[0].value = ComputerRoomInfo[0].selfBuiltMachineRoomNum;
                            arr[1].value = ComputerRoomInfo[0].trusteeshipRoomNum;
                            arr[2].value = ComputerRoomInfo[0].cloudServiceNum;
                            this.pieData = arr;
                        }
                    }else{
                        this.$Notice.error({
                            title: '获取机房信息失败'
                        })
                    }
                }).catch(err => {
                    throw Error(err);
                })
            });
        }
    }
</script>

<style scoped>

</style>