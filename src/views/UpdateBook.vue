<template>
    <div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="图书名称" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="作者" prop="author">
                <el-input v-model="ruleForm.author"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">确认修改</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                id:null,
                ruleForm: {
                    name: '',
                    author: ''
                },
                rules: {
                    name: [
                        { required: true, message: '请输入图书名称', trigger: 'blur' }
                    ],
                    author: [
                        { required: true, message: '作者不能为空', trigger: 'blur' }
                    ]
                }
            };
        },
        methods: {
            submitForm(formName) {
                const _this = this
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        axios.post('http://localhost:8081/book/update',this.ruleForm).then(function (resp) {
                            console.log(resp.data)
                            if (resp.data === 'success'){
                                _this.$message({
                                    message: '书籍修改成功',
                                    type: 'success'
                                });
                            }
                        })
                    } else {
                        console.log('error update!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        },
        created() {
            const _this = this
            // console.log("update---hhh")
            // console.log(_this.$route.query.id + "---xxx")
            alert(this.$route.query.id)
            axios.get('http://localhost:8081/book/getById/' + this.$route.query.id).then(function (resp) {
                _this.ruleForm = resp.data
                console.log(_this.ruleForm)
            })
        }
    }
</script>

<style scoped>

</style>