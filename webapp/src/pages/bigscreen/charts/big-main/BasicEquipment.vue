<template>
    <module-layout :title="sum">
        <ve-rect-coordinate
                id="rectTest2"
                style="height:100%"
                backgroundColor=""
                :xAxisData="xAxisData"
                :showLegend=true
                :coverOption="coverOption"
                :color="colors"
                >
            <ve-bar
                    :data="data"
                    id="basic-equipment"
                    name="数量(台)"
                    barWidth="20"
            ></ve-bar>
        </ve-rect-coordinate>
    </module-layout>
</template>

<script>
    import ModuleLayout from '../../common/ModuleLayout';
    export default {
        name: "computor-room",
        data(){
            return {
                colors: ['#01A2FC','#F9D135','#01B344','#01A2FC'],
                xAxisData: ['小机', 'X86服务器', '虚机', '网络设备'],
                data: [12, 495, 118, 390],
                coverOption: {
                    grid: {
                        top: '25%',
                        bottom: '20%'
                    },
                    legend: {
                        top: 0,
                        right: -30
                    },
                    series: [
                        {
                            label: {
                                show: true,
                                position: 'top',
                                color: '#fff'
                            }
                        }
                    ]
                }
            }
        },
        computed: {
            sum() {
                let sum = 0;
                this.data.forEach(item => {
                    sum += item;
                });
                return `基础设备数量统计 总量：<span style="color: #217bcc;">${sum}</span>`;
            }
        },
        components: {
            ModuleLayout
        },
        methods: {
            getInfo(){
                this.$httpt.get('bigScreenController.do?getBasicDevice').then(({data}) => {
                    if(data.success){
                        let temp = data.data;
                        this.data = [];
                        Object.keys(temp).forEach((key) => {
                            this.data.push(temp[key]);
                        });
                    }else{
                        throw Error('获取基础设备信息失败！');
                    }
                })
            }
        },
        mounted(){
            this.$nextTick(() => {
                // this.getInfo();
            })
        }
    }
</script>

<style scoped>

</style>