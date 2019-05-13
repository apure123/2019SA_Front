import React, { Component } from 'react';
import { Input,Carousel,Card, Col, Row } from 'antd';
import "../css/Home.css"
import {connect} from "react-redux";
import SearchPage from "./SearchResult";

class Rsource_Detail extends Component{
    constructor(props) {
        super(props);
        this.props.init();
    }


    render() {

        return(<div style={{/*background: '#ECECEC'*/}}>



                <div style={{  padding: '30px' }}>
                    <p>这里是文章详情页</p>
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
Rsource_Detail=connect(mapStateToProps,mapDispatchToProps)(Rsource_Detail)
export default  Rsource_Detail;