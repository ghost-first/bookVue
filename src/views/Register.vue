<template>
    <el-form :model="user" :rules="rules" ref="user" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="username">
            <el-input v-model="user.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="user.password"></el-input>
        </el-form-item>

        <el-form-item style="position: relative; left: 350px">
            <el-button type="primary" @click="submitForm('user')">注册</el-button>
            <el-button @click="resetForm('user')">重置</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
    export default {
        name: "AddUser",
        data() {
            return {
                user:{
                    number:null,
                    username:'',
                    password:'',
                    role:0
                },
                rules: {
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ]
                }

            }
        },
        methods:{
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            submitForm(){
                const _this = this

                axios.post('http://localhost:8081/user/register',this.user).then(function (resp) {
                    console.log(resp)
                    var newUser = resp.data
                    alert("您的账号是：" + newUser.number + ",请记住！！")
                    _this.$store.commit("setUser",{
                        u_id:newUser.number,
                        username:newUser.username,
                        role:newUser.role
                    })

                    _this.$router.push("/book")
                    _this.$message({
                        message: '注册成功',
                        type: 'success'
                    });
                })
            }
        }
    }
</script>

<style scoped>

</style>