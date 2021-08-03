<template>
    <div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="图书名称" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="作者" prop="author">
                <el-input v-model="ruleForm.author"></el-input>
            </el-form-item>
            <el-form-item label="类型" prop="type">
                <el-input v-model="ruleForm.type"></el-input>
            </el-form-item>
            <el-form-item label="价格" prop="price">
                <el-input v-model="ruleForm.price"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                ruleForm: {
                    name: '',
                    author: '',
                    type:'',
                    price:null
                },
                rules: {
                    name: [
                        { required: true, message: '请输入图书名称', trigger: 'blur' }
                    ],
                    author: [
                        { required: true, message: '作者不能为空', trigger: 'blur' }
                    ],
                    type: [
                        { required: true, message: '类型不能为空', trigger: 'blur' }
                    ],
                    price: [
                        { required: true, message: '价格不能为空', trigger: 'blur' }
                    ]
                }
            };
        },
        methods: {
            submitForm(formName) {
                if (this.$store.state.user.role !== 1){
                    alert("您没有管理员的权限")
                    return;
                }
                const _this = this
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        axios.post('http://localhost:8081/book/save',this.ruleForm).then(function (resp) {
                            console.log(resp.data)
                            if (resp.data === 'success'){
                                _this.$message({
                                    message: '书籍添加成功',
                                    type: 'success'
                                });
                            }
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>