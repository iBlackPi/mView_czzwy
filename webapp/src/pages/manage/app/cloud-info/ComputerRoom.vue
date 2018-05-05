<template>
    <div class="computer-room">
        <Card style="height: 100%;">
            <p slot="title" style="font-weight: normal;">机房信息维护</p>

            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
                <FormItem label="自建机房" prop="selfBuiltMachineRoomNum">
                    <Input v-model="formValidate.selfBuiltMachineRoomNum" :disabled="!isEdit" placeholder="自建机房个数"></Input>
                </FormItem>
                <FormItem label="托管机房" prop="trusteeshipRoomNum">
                    <Input v-model="formValidate.trusteeshipRoomNum" :disabled="!isEdit" placeholder="托管机房个数"></Input>
                </FormItem>
                <FormItem label="租用云主机" prop="cloudServiceNum">
                    <Input v-model="formValidate.cloudServiceNum" :disabled="!isEdit" placeholder="租用云主机个数"></Input>
                </FormItem>
                <FormItem v-if="isEdit">
                    <Button type="primary" @click="handleSubmit('formValidate')">保存</Button>
                    <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
                </FormItem>
            </Form>
        </Card>
        <div class="button-container">
            <!--编辑资源-->
            <Button type="primary" shape="circle" icon="edit" v-if="!isEdit" @click="edit"></Button>
            <!--todo 在v-if的渲染时，会出现渲染顺序问题，导致文字渲染不出来，这里采用v-show-->
            <Button type="warning" shape="circle" v-show="isEdit" @click="cancelEdit">关闭编辑</Button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "",
        data () {
            return {
                formValidate: {
                    selfBuiltMachineRoomNum: '',
                    trusteeshipRoomNum: '',
                    cloudServiceNum: '',
                    // todo 后台需要，前台无实际意义
                    // todo 该字段严谨手动改动
                    id: ''
                },
                // 暂存用户最后一次保存的状态
                // 用于用户点击“关闭修改”让文本框中数据回到最后一次保存的状态
                formValidateLastSave: {
                    selfBuiltMachineRoomNum: '',
                    trusteeshipRoomNum: '',
                    cloudServiceNum: '',
                    id: ''
                },
                // 是否修改机房信息，默认不是修改状态，即提交框、重置框不显示；输入框置灰
                isEdit: false,
                ruleValidate: {
                    //todo async-validator无法验证数字的问题，用正则解决
                    selfBuiltMachineRoomNum: [
                        { required: true, pattern: /^\d+$/, message: '请输入自建机房个数（必须数值类型）', trigger: 'blur' },
                    ],
                    trusteeshipRoomNum: [
                        { required: true, pattern: /^\d+$/, message: '请输入托管机房个数（必须数值类型）', trigger: 'blur' },
                    ],
                    cloudServiceNum: [
                        { required: true, pattern: /^\d+$/, message: '请输入托管云主机个数（必须数值类型）', trigger: 'blur' },
                    ]
                }
            }
        },
        methods: {
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$httpt.post('machineRoomController.do?saveOrUpdateMachineRoom', this.formValidate).then(({data}) => {
                            if(data.success){
                                this.$Notice.success({title: '保存成功!'});
                                // 缓存保存的数据，供“关闭编辑”后回溯最后一次的成功保存状态
                                // 采用深拷贝
                                this.formValidateLastSave.selfBuiltMachineRoomNum = this.formValidate.selfBuiltMachineRoomNum;
                                this.formValidateLastSave.trusteeshipRoomNum = this.formValidate.trusteeshipRoomNum;
                                this.formValidateLastSave.cloudServiceNum = this.formValidate.cloudServiceNum;
                                this.formValidateLastSave.id = this.formValidate.id;
                            }else{
                                this.$Notice.error({title: '保存失败!'});
                            }
                        });
                    }
                })
            },
            getComperRoomInfo(){
                this.$httpt.get('machineRoomController.do?getCzMachineRoom').then(({data}) => {
                    if(data.success){
                        this.formValidate = data.data;
                        // 这里要进行深拷贝，不能共用同一个对象
                        this.formValidateLastSave.selfBuiltMachineRoomNum = data.data.selfBuiltMachineRoomNum;
                        this.formValidateLastSave.trusteeshipRoomNum = data.data.trusteeshipRoomNum;
                        this.formValidateLastSave.cloudServiceNum = data.data.cloudServiceNum;
                        this.formValidateLastSave.id = data.data.id;
                    }else{
                        this.$Notice.error({
                            title: '获取机房信息失败'
                        })
                    }
                })
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            },
            edit(){
                this.isEdit = true;
            },
            cancelEdit(){
                this.isEdit = false;
                // 点击“关闭修改”按钮后，应该让文本框中的数据回溯到最后一次成功保存的状态
                this.formValidate.selfBuiltMachineRoomNum = this.formValidateLastSave.selfBuiltMachineRoomNum;
                this.formValidate.trusteeshipRoomNum = this.formValidateLastSave.trusteeshipRoomNum;
                this.formValidate.cloudServiceNum = this.formValidateLastSave.cloudServiceNum;
                this.formValidate.id = this.formValidateLastSave.id;
            }
        },
        mounted(){
            this.$nextTick(() => {
                this.getComperRoomInfo();
            });
        }
    }
</script>

<style scoped type="text/less" lang="less">
    .computer-room {
        height: 100%;
    }
    .button-container {
        position: absolute;
        right: 17px;
        top: 8px;
    }
</style>