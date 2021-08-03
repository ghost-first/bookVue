<template>
    <div>
        <el-card class="box-card">
            <div slot="header" class="clearFix">
                <span>用户信息</span>
                <el-button style="float: right; padding: 3px 0" type="text" @click="drawer = true">修改信息</el-button>
            </div>
            <div class="text item">
                账号：{{$store.state.user.u_id}}
            </div>
            <div class="text item">
                用户名：{{$store.state.user.username}}
            </div>
        </el-card>

        <el-drawer
                title="修改信息"
                :visible.sync="drawer"
                :with-header="false">
            <el-form :model="user" :rules="rules" ref="user" label-width="100px" class="demo-ruleForm">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="user.username"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="user.password"></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="updateInfo()">修改</el-button>
                    <el-button @click="resetForm('user')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-drawer>
    </div>
</template>

<style>
    .text {
        font-size: 14px;
    }

    .item {
        margin-bottom: 18px;
    }

    .clearFix:before,
    .clearFix:after {
        display: table;
        content: "";
    }
    .clearFix:after {
        clear: both
    }

    .box-card {
        position: relative;
        left: 30%;
        width: 480px;
    }
</style>

<script>
    export default {
        name: "UserInfo",
        data(){
            return{
                drawer: false,
                user:{
                    number:this.$store.state.user.u_id,
                    username:'',
                    password:'',
                    role:this.$store.state.user.role
                },
                rules: {
                    username: [
                        { required: true, message: '请输入账号', trigger: 'blur' }
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
            updateInfo(){
                const _this = this
                console.log("看看")
                console.log(_this.user)

                axios.post('http://localhost:8081/user/update',this.user).then(function (resp) {
                    console.log(resp)
                    var newUser = resp.data

                    _this.$store.commit("setUser",{
                        u_id:newUser.number,
                        username:newUser.username,
                        role:newUser.role
                    })

                    _this.$message({
                        message: '修改成功',
                        type: 'success'
                    });
                })
            }
        }
    }
</script>

<style scoped>

</style>