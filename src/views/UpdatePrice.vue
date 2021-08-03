<template>
    <div>
        <el-form :model="it" :rules="rules" ref="it" label-width="100px" class="demo-ruleForm">
            <el-form-item label="更新后价格" prop="name">
                <el-input v-model="it.price"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="submitForm('it')">确认修改</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: "UpdatePrice",
        data(){
            return{
                id:null,
                it:{
                    price:null
                },
                rules:{ required: true, message: '请输入更新后价格', trigger: 'blur' }
            }
        },
        methods:{
            submitForm(formName) {
                const _this = this;
                console.log(this.it.price);
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        axios.get('http://localhost:8081/book/updatePrice/'+ this.id + '/'+ this.it.price).then(function (resp) {
                            console.log(resp.data);
                            if (resp.data === 'success'){
                                _this.$message({
                                    message: '价格修改成功',
                                    type: 'success'
                                });
                            }
                        }).catch(
                            function () {
                                    console.log("hhhhhhhhhhhhhh")
                                    _this.$notify.error({
                                        title:"错误",
                                        message: '价格修改失败'
                                    });
                            }
                        )
                    }
                });
            }
        },
        created() {
            const _this = this;
            // alert(this.$route.query.id);
            _this.id = this.$route.query.id
            // axios.get('http://localhost:8081/book/getById/' + this.$route.query.id).then(function (resp) {
            //     _this.ruleForm = resp.data
            // })
        }
    }
</script>

<style scoped>

</style>