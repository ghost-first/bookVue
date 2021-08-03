<template>
  <div class="about">
    <el-header style="text-align: right; font-size: 12px">
      <span>尊敬的用户 {{$store.state.user.username}}</span>
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
                width="130">
        </el-table-column>
        <el-table-column
                prop="bookName"
                label="书名"
                width="130">
        </el-table-column>
        <el-table-column
                prop="author"
                label="作者"
                width="130">
        </el-table-column>
        <el-table-column
                prop="type"
                label="类型"
                width="130">
        </el-table-column>
        <el-table-column
                prop="price"
                label="价格"
                width="100">
        </el-table-column>
        <el-table-column
                prop="number"
                label="借出情况"
                width="130">
        </el-table-column>
        <el-table-column
                label="借书"
                width="130">
          <template slot-scope="scope">
            <el-button @click="lentBook(scope.row)" type="text" size="small">借书</el-button>
          </template>
        </el-table-column>
        <el-table-column
                fixed="right"
                label="操作"
                width="150"
                v-if="$store.state.user.role === 1">
          <template slot-scope="scope">
            <el-button @click="edit(scope.row)" type="text" size="small">编辑</el-button>
            <el-button @click="updatePrice(scope.row)" type="text" size="small">更新价格</el-button>
            <el-button @click="deleteBook(scope.row)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <el-pagination
            background
            layout="prev, pager, next"
            :page-size="6"
            :total="total"
            @current-change="page">
    </el-pagination>
  </div>
</template>

<script>
  export default {
    methods: {
      //借书
      lentBook(row){
        console.log(row);
        if (row.number !== ""){
          alert("该书已被借走！！");
          return;
        }
        const _this = this;
        //书的id
        _this.lent.bookId = row.bookId;
        //时间
        var date = new Date();
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var strDate = date.getDate();

        if (month >= 1 && month <= 9) {
          month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
          strDate = "0" + strDate;
        }
        var currentdate = year + "--" + month + "--" + strDate;
        console.log(currentdate);
        _this.lent.lentTime = this.updateTime = currentdate

        //发送请求
        var lent = _this.lent;
        console.log(lent.number + '-' + lent.bookId + '-' + lent.lentTime)
        axios.get('http://localhost:8081/lent/save/' + lent.number + '/' + lent.bookId + '/' + lent.lentTime).then(function (resp) {
          console.log(resp)

          //刷新页面
          window.location.reload();
        })
      },
      edit(row) {
        alert(row.bookId)
        this.$router.push({
          path:'/update',
          query:{
            id:row.bookId
          }
        })
      },
      updatePrice(row) {
        this.$router.push({
          path:'/updatePrice',
          query:{
            id:row.bookId
          }
        })
      },
      deleteBook(row){
        const _this = this;
        axios.delete('http://localhost:8081/book/deleteById/' + row.bookId ).then(function () {
          _this.$message({
            message: '书籍删除成功',
            type: 'success'
          });
          window.location.reload();
        })

      },
      page(cp){
        // alert(cp)
        const _this = this;
        axios.get('http://localhost:8081/bookLent/findAll/' + cp + '/6').then(function (resp) {
          console.log(resp);
          _this.tableData = resp.data.content;
          _this.total = resp.data.totalElements;
          for (let i = 0; i < _this.tableData.length; i++) {
            if(_this.tableData[i].number === null){
              _this.tableData[i].number = ""
            }else{
              _this.tableData[i].number = "已借出"
            }
          }
        })
      }
    },
    created(){
      const _this = this;
      // console.log(_this.user)

      // if(_this.$store.state.user.username === ""){
      //   _this.$router.push("/login")
      // }
      // axios.get('http://localhost:8081/book/findAll/1/6').then(function (resp) {
      axios.get('http://localhost:8081/bookLent/findAll/1/6').then(function (resp) {
        // console.log(resp)
        _this.tableData = resp.data.content;
        // console.log(resp.data.content);
        for (let i = 0; i < _this.tableData.length; i++) {
          if(_this.tableData[i].number === null){
            _this.tableData[i].number = ""
          }else{
            _this.tableData[i].number = "已借出"
          }
        }

        // console.log(_this.tableData)
        _this.total = resp.data.totalElements;

      })
    },

    data() {
      return {
        total:null,
        tableData: null,
        role:this.$store.state.user.role,
        lent:{
          number:this.$store.state.user.u_id,
          bookId:null,
          lentTime:null
        }
      }
    }
  }
</script>