import React, { Component } from 'react';
import { Avatar } from 'antd';
import "../css/Home.css"
import {connect} from "react-redux";
import SearchPage from "./SearchResult";
import  "../css/Expert_Home.css"
class Expert_Home extends Component{
    constructor(props) {
        super(props);

    }


    render() {

        return(<div style={{/*background: '#ECECEC'*/}}>


                <h2>专家门户</h2>
                <hr/>
                    <div style={{width:"100%"}}>
                <h2>这里是专家简介</h2>
                <div style={{display:"inline-block",width:"40%"}}>
                <img   src={"http://img4.imgtn.bdimg.com/it/u=648251558,316969232&fm=26&gp=0.jpg"}
                      className={"intro"}
                />
                </div>
                <div style={{float:"right",width:"50%"}}>
                    <p>名字</p>
                    <p>研究领域</p>
                    <p>所属机构</p>
                </div>
                    </div>
                <hr/>
                <div style={{float:"left",width:"50%"}}>
                    <h2>资源</h2>
                </div>
                <div style={{float:"right",width:"50%"}}>
                    <h2>合作者</h2>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state)
{
    return{
        dissearch_flag:state.search.dis_flag,
    }
}

function mapDispatchToProps(dispatch){
    return{

        dis_res:(keyword)=>{dispatch({type:"search",keyword:keyword})},
        init:()=>{dispatch({type:"search_init"})}
    }
}
Expert_Home=connect(mapStateToProps,mapDispatchToProps)(Expert_Home)
export default  Expert_Home;