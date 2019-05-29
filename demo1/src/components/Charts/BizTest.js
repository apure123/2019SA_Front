import $ from "jquery";
import React from "react";
import {
    G2,
    Chart,
    Geom,
    Axis,
    Tooltip,
    Coord,
    Label,
    Legend,
    View,
    Guide,
    Shape,
    Facet,
    Util
} from "bizcharts";
import DataSet from "@antv/data-set";
import {connect} from "react-redux";
import axios from "axios"
let data;

/*
$.ajax({
    url: "https://alifd.alibabausercontent.com/materials/@bizcharts/relation-chord/0.2.8/mock.json",
    async : false,
    success: (iData) => { data = iData }
});
*/
data={
    "nodes":[
        {"id":0,"name":"0","value":40},{"id":1,"name":"1","value":40}
        ,{"id":2,"name":"2","value":40}
        ],
    "links":
        [{"source":0,"target":0,"sourceWeight":30,"targetWeight":30},{"source":1,"target":1,"sourceWeight":30,"targetWeight":30},{"source":2,"target":2,"sourceWeight":30,"targetWeight":30},

            {"source":0,"target":1,"sourceWeight":30,"targetWeight":30},
            {"source":0,"target":2,"sourceWeight":30,"targetWeight":30}
        ]
}

class BizTest extends React.Component {
    constructor(props) {
        super(props);
        /*const query = props.location.search// '?uid=123'
        const arr = query.split('=')
        const uid=arr[1]*/
        console.log("输出bizchart里面的props")
        console.log(props)
        /*this.get_graph(this.props.uid)
        data=this.props.graph;*/
    }

    componentDidMount() {
        this.get_graph(this.props.uid)
        data=this.props.graph;
    }

    get_graph=(uid)=>{
        console.log("将要获取关系图数据 ")
        console.log(uid)
        axios.post("http://127.0.0.1:8000/api/CoGraph/",{uid:uid})
            .then((response) =>{
                console.log(response);
                this.props.set_relation_graph(response.data)
            })
            .catch(function (error) {
                console.log(error);
            })
    }
    render() {
        const ds = new DataSet();
        const dv = ds.createView().source(this.props.graph, {
            type: "graph",
            edges: d => d.links
        });

        /*dv.transform({
            type: "diagram.arc",
            marginRatio: 0.5 // sortBy: 'frequency' // id, weight, frequency, {function}
        });
        return (
            <div>
                <Chart data={data} forceFit={true} height={window.innerHeight}>
                    <Tooltip showTitle={false} />
                    <View data={dv.edges} axis={false}>
                        <Geom
                            type="edge"
                            position="x*y"
                            shape="arc"
                            color="source"
                            opacity={0.5}
                            tooltip={"source*target"}
                        />
                    </View>
                    <View data={dv.nodes} axis={false}>
                        <Geom
                            type="point"
                            position="x*y"
                            shape="circle"
                            size="value"
                            color="id"
                            opacity={0.5}
                            style={{
                                stroke: "grey"
                            }}
                        >
                            <Label
                                content="name"
                                offset={-10}
                                textStyle={{
                                    textAlign: "left",
                                    rotate: 90,
                                    fill: "black"
                                }}
                            />
                        </Geom>
                    </View>
                </Chart>
            </div>
        );*/
        dv.transform({
            type: "diagram.arc",
            sourceWeight: e => e.sourceWeight,
            targetWeight: e => e.targetWeight,
            weight: true,
            marginRatio: 0.3
        });
        const scale = {
            x: {
                sync: true
            },
            y: {
                sync: true
            }
        };
        return (
            <div>
                <Chart
                    data={data}
                    forceFit={true}
                    height={window.innerHeight}
                    scale={scale}
                >
                    <Tooltip showTitle={false} />
                    <View data={dv.edges} axis={false}>
                        <Coord type="polar" reflect="y" />
                        <Geom
                            type="edge"
                            position="x*y"
                            shape="arc"
                            color="source"
                            opacity={0.5}
                            tooltip={"source*target*value"}
                        />
                    </View>
                    <View data={dv.nodes} axis={false}>
                        <Coord type="polar" reflect="y" />
                        <Geom type="polygon" position="x*y" color="id">
                            <Label
                                content="name"
                                labelEmit={true}
                                textStyle={{
                                    fill: "black"
                                }}
                            />
                        </Geom>
                    </View>
                </Chart>
            </div>
        );
    }
}

function mapStateToProps(state)
{
    return{
        graph:state.relation_graph.graph,

    }
}

function mapDispatchToProps(dispatch){
    return{
        set_relation_graph:(graph)=>{
            dispatch({type:"set_relation_graph",graph:graph})
        }

    }
}
BizTest=connect(mapStateToProps,mapDispatchToProps)(BizTest)
export default  BizTest;

