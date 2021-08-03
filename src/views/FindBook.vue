<template>
    <div>
        <el-form :inline="true" :model="formOne" class="demo-form-inline">
            <el-form-item label="书名">
                <el-input v-model="formOne.bookName" placeholder="书名"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="findByName">查询</el-button>
            </el-form-item>
        </el-form>

        <el-form :inline="true" :model="formTwo" class="demo-form-inline">
            <el-form-item label="作者">
                <el-input v-model="formTwo.author" placeholder="作者"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="FindByAuthor">查询</el-button>
            </el-form-item>
        </el-form>

        <el-form :inline="true" :model="formThree" class="demo-form-inline">
            <el-form-item label="价格（低）">
                <el-input v-model="formThree.lowPrice" placeholder="价格（低）"></el-input>
            </el-form-item>
            <el-form-item label="价格（高）">
                <el-input v-model="formThree.highPrice" placeholder="价格（高）"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="findByPrice">查询</el-button>
            </el-form-item>
        </el-form>

        <el-table
                :data="tableData"
                border
                style="width: 100%">
            <el-table-column
                    fixed
                    prop="id"
                    label="编号"
                    width="150">
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="姓名"
                    width="150">
            </el-table-column>
            <el-table-column
                    prop="author"
                    label="作者"
                    width="150">
            </el-table-column>
            <el-table-column
                    prop="type"
                    label="类型"
                    width="150">
            </el-table-column>
            <el-table-column
                    prop="price"
                    label="价格"
                    width="150">
            </el-table-column>
        </el-table>
    </div>


</template>

<script>
    export default {
        name: "FindBook",
        data() {
            return {
                formOne: {
                    bookName: ''
                },
                formTwo:{
                    author:''
                },
                formThree:{
                    lowPrice:null,
                    highPrice:null
                },
                tableData:null
            }
        },
        methods: {
            findByName(){
                const _this = this;
                axios.get('http://localhost:8081/book/findByBookName/'  + _this.formOne.bookName).then(function (resp) {
                    console.log(resp);
                    _this.tableData = resp.data;
                })
            },
            FindByAuthor(){
                // console.log(this.formTwo.author);
                const _this = this;
                axios.get('http://localhost:8081/book/findByAuthor/' + _this.formTwo.author).then(function (resp) {
                    console.log(resp);
                    _this.tableData = resp.data;
                    // _this.tableData = resp.data.content;
                })
            },
            findByPrice(){
                // console.log(this.formThree.lowPrice + "--" + this.formThree.highPrice);
                const _this = this;
                axios.get('http://localhost:8081/book/findByPrice/'  + _this.formThree.lowPrice +
                '/' + _this.formThree.highPrice).then(function (resp) {
                    console.log(resp);
                    _this.tableData = resp.data;
                    // _this.tableData = resp.data.content;
                })
            }
        }
    }
</script>

<style scoped>

</style>