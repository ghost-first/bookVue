<template>
    <!--  // 指定图表容器，需要指定宽高，否则可能不显示-->
    <div style="width: 100%;height: 500px;">
        <div id="myChart" class="charts-box" style="width: 100%;height: 420px;" />
    </div>

</template>

<script>
    // 引入基本模板
    const echarts = require('echarts/lib/echarts');
    // 引入折线图组件
    require('echarts/lib/chart/bar');
    // 引入提示框和title、图例组件
    require('echarts/lib/component/tooltip');
    require('echarts/lib/component/title');
    require('echarts/lib/component/legend');
    export default {
        name: 'Chart3',
        mounted() {
        },
        data(){
          return{
              title:[],
              num:[]
          }
        },
        methods:{
            drawLine() {
                const _this = this;
                // 基于准备好的dom，初始化echarts实例
                console.log(document.getElementById('myChart'));
                const myChart = echarts.init(document.getElementById('myChart'));
                myChart.showLoading(); // 开启 loading 效果
                setTimeout(() => {
                    myChart.hideLoading() // 隐藏 loading 效果
                }, 2000)
                // 绘制图表
                myChart.setOption({
                    title: { text: '图书类型统计' }, // 为图表配置标题
                    tooltip: {}, // 配置提示信息
                    xAxis: {
                        type: 'category',
                        // data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                        data: _this.title
                    },
                    yAxis: {
                        type: 'value'
                    },
                    // legend: {
                    //     data: ['浏览量', '收藏量']
                    // }, // 图例组件展现了不同系列的标记(symbol)，颜色和名字。可以通过点击图例控制哪些系列不显示
                    series: [{
                        // data: [120, 200, 150, 80, 70, 110, 130],
                        data: _this.num,
                        type: 'bar',
                        showBackground: true,
                        backgroundStyle: {
                            color: 'rgba(180, 180, 180, 0.2)'
                        }
                    }]
                })
            }

        },
        created() {
            const _this = this;
            axios.get('http://localhost:8081/book/mathTitle').then(function (resp) {
                console.log(resp);
                _this.title = resp.data;
                console.log("--");
                console.log(_this.title)
            });
            axios.get('http://localhost:8081/book/mathData').then(function (resp) {
                _this.num = resp.data;
                _this.drawLine();
                console.log("hhhhhhhhhhhhhhhhh")
            })
        }

    }
</script>