<template>
    <!--  // 指定图表容器，需要指定宽高，否则可能不显示-->
    <div style="width: 100%;height: 500px;">
        <div id="main" style="width: 600px;height:400px;"></div>
    </div>

</template>

<script>
    // 引入基本模板
    const echarts = require('echarts/lib/echarts')
    // 引入折线图组件
    require('echarts/lib/chart/pie')
    // 引入提示框和title、图例组件
    require('echarts/lib/component/tooltip')
    require('echarts/lib/component/title')
    require('echarts/lib/component/legend')
    export default {
        name: 'App',
        mounted() {
            this.drawLine()
        },
        methods:{
            drawLine() {
                // 基于准备好的dom，初始化echarts实例
                console.log(document.getElementById('main'))
                const myChart = echarts.init(document.getElementById('main'))
                myChart.showLoading() // 开启 loading 效果
                setTimeout(() => {
                    myChart.hideLoading() // 隐藏 loading 效果
                }, 2000)
                // 绘制图表
                myChart.setOption({
                    title: { text: '类型占比' }, // 为图表配置标题
                    tooltip: {}, // 配置提示信息
                    legend: {
                        show: false,
                        orient: 'vertical',
                        x: 'left',
                        data: ['20%-视频', '25%-联盟', '25%-邮件',"15%-直接","15%-搜索"]
                    }, // 图例组件展现了不同系列的标记(symbol)，颜色和名字。可以通过点击图例控制哪些系列不显示
                    series : [
                        {
                            name: '访问来源',
                            type: 'pie',    // 设置图表类型为饼图
                            radius: '55%',  // 饼图的半径，外半径为可视区尺寸（容器高宽中较小一项）的 55% 长度。
                            data:[          // 数据数组，name 为数据项名称，value 为数据项值
                                {value:235, name:'视频广告'},
                                {value:274, name:'联盟广告'},
                                {value:310, name:'邮件营销'},
                                {value:335, name:'直接访问'},
                                {value:400, name:'搜索引擎'}
                            ]
                        }
                    ]
                })
            }

        }

    }
</script>