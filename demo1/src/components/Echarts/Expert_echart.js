import React, { Component } from 'react';

// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
// 引入柱状图

/*// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';*/

//引入雷达图
/*import "echarts/lib/component/radar"*/
import ReactEcharts from "echarts-for-react"

const e_option={
    title: {
        text: '基础雷达图'
    },
    tooltip: {},
    legend: {
        data: ['预算分配（Allocated Budget）', '实际开销（Actual Spending）']
    },
    radar: {
        // shape: 'circle',
        radius: '40%',
        name: {
            textStyle: {
                color: '#fff',
                backgroundColor: '#999',
                borderRadius: 3,
                padding: [3, 5]
            }
        },
        indicator: [
            { name: '销售', max: 6500},
            { name: '管理', max: 16000},
            { name: '信息技术', max: 30000},
            { name: '客服', max: 38000},
            { name: '研发', max: 52000},
            /*{ name: '市场（Marketing）', max: 25000}*/
        ]
    },
    series: [{
        name: '预算 vs 开销（Budget vs spending）',
        type: 'radar',

        // areaStyle: {normal: {}},
        data : [
            {
                value : [4300, 10000, 28000, 35000, 50000/*, 19000*/],
                name : '预算分配（Allocated Budget）'
            },
            {
                value : [5000, 14000, 28000, 31000, 42000/*, 21000*/],
                name : '实际开销（Actual Spending）'
            }
        ]
    }]
}
class Expert_echart extends Component {
    componentDidMount() {
        // 基于准备好的dom，初始化echarts实例
        var expertChart = echarts.init(document.getElementById('expert'));
        // 绘制图表
        expertChart.setOption(e_option
        );
    }
    render() {
        return (
            <div id="expert" style={{ width: 400, height: 400 }}>

            </div>

        );
    }
}

export default Expert_echart;