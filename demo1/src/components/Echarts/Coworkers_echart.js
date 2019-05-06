import {Component} from "react";
import echarts from "echarts/lib/echarts";
import React from "react";

const option={
    title: {
        text: ''
    },
    tooltip: {},
    animationDurationUpdate: 1500,
    animationEasingUpdate: 'quinticInOut',
    label: {
        normal: {
            show: true,
            textStyle: {
                fontSize: 12
            },
        }
    },
    legend: {
        x: "center",
        show: false,
        data: ["夫妻", "战友", '亲戚']
    },
    series: [
        {
            type: 'graph',
            layout: 'force',
            symbolSize: 45,
            focusNodeAdjacency: true,
            roam: true,
            categories: [{
                name: '夫妻',
                itemStyle: {
                    normal: {
                        color: "#009800",
                    }
                }
            }, {
                name: '战友',
                itemStyle: {
                    normal: {
                        color: "#4592FF",
                    }
                }
            }, {
                name: '亲戚',
                itemStyle: {
                    normal: {
                        color: "#3592F",
                    }
                }
            }],
            label: {
                normal: {
                    show: true,
                    textStyle: {
                        fontSize: 12
                    },
                }
            },
            force: {
                repulsion: 1000
            },
            edgeSymbolSize: [4, 50],
            edgeLabel: {
                normal: {
                    show: true,
                    textStyle: {
                        fontSize: 10
                    },
                    formatter: "{c}"
                }
            },
            data: [{
                name: 'Mary',
                draggable: true,
            }, {
                name: 'Tom',
                category: 1,
                draggable: true,
            }, {
                name: 'Allen',
                category: 1,
                draggable: true,
            }, {
                name: 'Kevin',
                category: 1,
                draggable: true,
            }, {
                name: 'Rose',
                category: 1,
                draggable: true,
            }],
            links: [{
                source: 0,
                target: 1,
                category: 0,
                value: '夫妻'
            }, {
                source: 0,
                target: 2,
                value: '子女'
            }, {
                source: 0,
                target: 3,
                value: '夫妻'
            }, {
                source: 0,
                target: 4,
                value: '父母'
            }, {
                source: 1,
                target: 2,
                value: '表亲'
            }],
            lineStyle: {
                normal: {
                    opacity: 0.9,
                    width: 1,
                    curveness: 0
                }
            }
        }
    ]
}

const option2={}

class Coworkers_echart extends Component {
    componentDidMount() {
        // 基于准备好的dom，初始化echarts实例
        var coworkersChart = echarts.init(document.getElementById('coworkers'));
        // 绘制图表
        coworkersChart.setOption(option
        );
    }
    render() {
        return (
            <div id="coworkers" style={{ width: 400, height: 400 }}>

            </div>

        );
    }
}

export default Coworkers_echart;