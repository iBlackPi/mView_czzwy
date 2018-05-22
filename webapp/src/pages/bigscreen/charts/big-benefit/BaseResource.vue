<template>
    <module-layout :title="sum">
        <ve-rect-coordinate
                id="base-reource"
                style="height:100%"
                backgroundColor=""
                :xAxisData="xAxisData"
                :showLegend=true
                :coverOption="coverOption">
            <ve-bar
                    :data="dataCPU"
                    name="CPU"
                    barWidth="20"
            ></ve-bar>
            <ve-bar
                    :data="dataMemory"
                    name="内存"
                    barWidth="20"
            ></ve-bar>
            <ve-bar
                    :data="dataRestore"
                    name="存储"
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
                xAxisData: ['第一批', '第二批', '第三批'],
                dataCPU: [1340, 282, 1064],
                dataMemory: [4113, 896, 7522],
                dataRestore: [113, 40, 60],
                coverOption: {
                    grid: {
                        top: '30%',
                        bottom: '25%',
                        left: '15%'
                    },
                    legend: {
                        top: 10,
                        right: -30
                    },
                    series: [
                        {
                            label: {
                                show: true,
                                position: 'top',
                                color: '#fff'
                            }
                        },
                        {
                            label: {
                                show: true,
                                position: 'top',
                                color: '#fff'
                            }
                        },
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
        components: {
            ModuleLayout
        },
        computed: {
            sum() {
                let temp = [];
                for(let i = 0, len = this.dataCPU.length; i < len; i ++) {
                    temp.push(this.dataCPU[i] + this.dataMemory[i] + this.dataRestore[i]);
                }
                return `基础资源需求 总量：<span style="color: #217bcc;">${temp[0]}、${temp[1]}、${temp[2]}</span>`;
            }
        },
        methods: {
            getInfo(){
                this.$httpt.get('bigScreenController.do?getResources').then((res) => {
                    let temp = res.data;
                    if(temp){
                        this.dataCPU = [];
                        this.dataMemory = [];
                        this.dataRestore = [];
                        temp.forEach((item) => {
                            this.dataCPU.push(item['cpu']);
                            this.dataMemory.push(item['memory']);
                            this.dataRestore.push(item['storage']);
                        });
                    }else{
                        throw new Error('获取2018-2020迁移数量信息失败！');
                    }
                })
            }
        },
        mounted(){
            let _this = this;
            this.$nextTick(() => {
                // _this.getInfo();
            })
        }
    }
</script>

<style scoped>

</style>