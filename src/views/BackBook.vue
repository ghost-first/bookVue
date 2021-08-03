<template>
    <div class="about">
        <el-header style="font-size: 12px">
            <span>以下是您借走的书</span>
            <span> 尊敬的用户 {{$store.state.user.u_id}} {{$store.state.user.username}}:</span>
        </el-header>
        <template>
            <el-table
                    :data="tableData"
                    border
                    style="width: 100%">
                <el-table-column
                        fixed
                        prop="bookId"
                        label="编号"
                        width="150">
                </el-table-column>
                <el-table-column
                        prop="bookName"
                        label="书名"
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
                <el-table-column
                        fixed="right"
                        label="操作"
                        width="150">
                    <template slot-scope="scope">
                        <el-button @click="backBook(scope.row)" type="text" size="small">确认归还</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </template>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                tableData:null,
                userId:this.$store.state.user.u_id,
                bookId:null
            }
        },
        created() {
            const _this = this

            axios.get('http://localhost:8081/bookLent/haveLent/' + _this.userId).then(function (resp) {
                console.log(resp)
                _this.tableData = resp.data
            })
        },
        methods:{
            backBook(row){
                console.log(row);
                const _this = this
                _this.bookId = row.bookId

                axios.delete('http://localhost:8081/lent/delete/' + _this.userId + '/' + _this.bookId).then(function (resp) {
                    window.location.reload();
                })
            }
        }

    }
</script>

<style scoped>

</style>