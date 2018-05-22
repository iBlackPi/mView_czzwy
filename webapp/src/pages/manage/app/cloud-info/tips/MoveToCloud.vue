<template>
    <Modal v-model="modal" width="60%">
        <p slot="header" style="text-align: left">
            <Icon type="ios-cloud-upload-outline" style="color: #01B344; font-size: 1rem;"></Icon>
            <span>{{department}}可云化系统</span>
        </p>
        <div style="position: relative; height: 16rem;">
            <Tag v-for="(item, key) in arr" :key="key">{{item}}</Tag>
            <!--进度条显示效果不是很好，此处暂时保留-->
            <!--<Progress :percent="moveToCloudCount / totalCount * 100" status="active"></Progress>-->
            <i-circle
                    class="middle-center"
                    :size="200"
                    :trail-width="4"
                    :stroke-width="5"
                    :percent="percent"
                    stroke-linecap="round"
                    stroke-color="#43a3fb">
                <div class="demo-Circle-custom">
                    <h1>{{moveToCloudCount}}</h1>
                    <p>上云系统数量</p>
                    <span>
                        占总量
                        <i>{{percent}}%</i>
                    </span>
                </div>
            </i-circle>
        </div>
        <div slot="footer">
            <Button type="primary" long @click="closeModal">关闭</Button>
        </div>
    </Modal>
</template>

<script>
    export default {
        name: "",
        data() {
            return {
                modal: false,
                department: '',
                totalCount: 0,
                arr: [],
                moveToCloudCount: 0
            }
        },
        computed: {
            percent() {
                let percent = 0;
                if(typeof this.totalCount === 'number' && typeof this.moveToCloudCount === 'number') {
                    this.totalCount === 0 ? percent = 0 : percent = (this.moveToCloudCount / this.totalCount * 100).toFixed(2);
                }
                return percent;
            }
        },
        methods: {
            closeModal() {
                this.modal = false;
            }
        },
        mounted() {
            this.$bus.$on('showMoveToCloudTip', (department) => {
                this.modal = true;
                this.department = department;
                // 获取指定部门系统总数
                this.$httpt.get(`bigScreenController.do?getPaginationDetail&department=${department}&tableName=CzInfomatinSystem&currentPage=1&pageSize=10000`).then(({data}) => {
                    if (data.success) {
                        if (data.data.list instanceof Array) {
                            this.totalCount = data.data.totalCount;
                        }
                    } else {
                        console.error('信息总览提示 信息化系统调研表信息失败');
                    }
                }).catch(err => {
                    throw Error(err);
                });

                //获取指定部门可上云的系统信息
                this.$httpt.get(`removeController.do?getCzRemove&department=${department}&currentPage=1&pageSize=10000`).then(({data}) => {
                    if (data.success) {
                        if (data.data.list instanceof Array) {
                            this.arr = [];
                            this.moveToCloudCount = data.data.totalCount;
                            data.data.list.forEach(item => {
                                this.arr.push(item.infoSystemName);
                            });
                        }
                    } else {
                        console.error('信息总览提示 信息化系统调研表信息失败');
                    }
                }).catch(err => {
                    throw Error(err);
                });
            });
        }
    }
</script>

<style scoped lang="less" type="text/less">
    .middle-center {
        position: absolute;
        top: 55%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
    .demo-Circle-custom {
        & h1 {
            color: #3f414d;
            font-size: 28px;
            font-weight: normal;
        }
        & p {
            color: #657180;
            font-size: 14px;
            margin: 10px 0 15px;
        }
        & span {
            display: block;
            padding-top: 15px;
            color: #657180;
            font-size: 14px;
            &:before {
                content: '';
                display: block;
                width: 50px;
                height: 1px;
                margin: 0 auto;
                background: #e0e3e6;
                position: relative;
                top: -15px;
            }
        ;
        }
        & span i {
            font-style: normal;
            color: #3f414d;
        }
    }
</style>