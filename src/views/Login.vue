<template>
    <div id="app">
        <el-form :model="user" :rules="rules" ref="user" label-width="100px" class="demo-ruleForm">
            <el-form-item label="账号" prop="number">
                <el-input v-model="user.number"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="user.password"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="submitForm('user')">登录</el-button>
                <el-button @click="resetForm('user')">重置</el-button>
                <el-button @click="linkRegister()">注册</el-button>
            </el-form-item>
        </el-form>


    </div>
</template>

<style>
    .el-header {
        background-color: #B3C0D1;
        color: #333;
        line-height: 60px;
    }

    .el-aside {
        color: #333;
    }
</style>

<script>
    export default {
        data() {
            return {
                user:{
                    number:null,
                    username:'',
                    password:'',
                    role:0
                },
                rules: {
                    number: [
                        { required: true, message: '请输入账号', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ]
                }

            }
        },
        methods: {
            submitForm(formName) {
                const _this = this
                console.log(_this.user)


                this.$refs[formName].validate((valid) => {
                  if (valid) {
                  axios.post('http://localhost:8081/user/login',this.user).then(function (resp) {
                      // console.log(resp)
                    if (resp.data !== ""){
                        var username = resp.data.username
                        var role = resp.data.role;
                        var number = _this.user.number;
                        //将用户放入sessionStorage
                        // sessionStorage.setItem("userName",resp.data.username)
                        //放入vuex
                        // _this.$store.dispatch("setUser",resp.data.username)


                        _this.$store.commit("setUser",{
                            u_id:number,
                            username:username,
                            role:role
                        });
                        console.log("---")
                        console.log(_this.$store.state.user)

                        _this.$router.push("/book")
                      _this.$message({
                        message: '登录成功',
                        type: 'success'
                      });

                    }else {
                        console.log('error update!!');
                        _this.$message({
                            message: '登录失败',
                            type: 'error'
                        });
                        return false;
                    }

                  }) //post结束
                      .catch(function () {
                          _this.$message({
                              message: '登录失败',
                              type: 'error'
                          });
                      })
                }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            linkRegister(){
                const _this = this
                _this.$router.push("/register");
            }
        },
    };
</script>
