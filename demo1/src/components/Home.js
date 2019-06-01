import React, { Component } from 'react';
import { Input,Carousel,Card, Col, Row,Switch ,Select} from 'antd';
import "../css/Home.css"
import {connect} from "react-redux";
import SearchPage from "./SearchResult";
import Register from "./Register";
import Super_Search from "./Super_Search";
import {Link} from "react-router-dom";
import axios from "axios";
const Option = Select.Option;

class Home extends Component{
    constructor(props) {
        super(props);
        /*this.props.init();*/
        this.get_recom1();
        this.get_recom2()

    }

    get_recom1=()=>{
        axios.post(`http://127.0.0.1:8000/api/search/`, {
            field:"Title",
            content:"电",
            type:"P1"
        })
            .then( (response) =>{
                console.log(response);
                this.props.set_recom1(response.data.result)
            })
            .catch(function (error) {
                console.log(error);
            })
    }
    get_recom2=()=>{
        axios.post(`http://127.0.0.1:8000/api/search/`, {
            field:"Title",
            content:"的",
            type:"P1"
        })
            .then( (response) =>{
                console.log(response);
                this.props.set_recom2(response.data.result)
            })
            .catch(function (error) {
                console.log(error);
            })
    }
    render() {
        if (this.props.dissearch_flag)
        {
            return(<div>
                <SearchPage/>
            </div>)
        }
        return(<div style={{/*background: '#ECECEC'*/}}>

                <div style={{backgroundColor:"#fff",width:"95%",margin:"auto",padding:"36px"}}>

                    <Super_Search/>
                </div>
            <h2>资讯推荐</h2>
                <div style={{width:"95%", margin:"auto"}}>
            <Carousel autoplay >
                <div className={"zhenjing"} ><Link to={`/system/article?uid=8e5ecb33-1d70-4d99-96b8-5035bd6c22d0=P1`} >
                    <h2 style={{color:"#fff"}}>RECENT DEVELOPMENT IN MATERIALS DESIGN OF THERMAL BARRIER COATINGS FOR GAS TURBINE</h2></Link></div>

                <div className={"zhenjing2"}><Link to={`/system/article?uid=ba848e02-267b-4459-9cea-eaaaab423f82=P1`} >
                    <h2 style={{color:"#fff"}}>磁控形状记忆合金Ni2MnGa的制备与性能研究</h2></Link></div>

                <div className={"zhenjing3"}><Link to={`/system/article?uid=92077658-9f64-4c79-9548-31d968bae90e=P1`} >
                    <h2 style={{color:"#fff"}}>PHASE TRANSFORMATION TEMPERATURES AND HYSTERESIS IN TiNiPd HIGH TEMPERATURE SHAPE MEMORY ALLOY</h2></Link></div>
            </Carousel>
                </div>

            <div style={{  padding: '30px' }}>
                <Row gutter={16}>
                    <Col span={12}>
                        <Card title="学术动态" bordered={false}>

                            {
                                this.props.recom1_datalist.map(value => {
                                    return(<div>
                                        <Link to={`/system/article?uid=${value.uid}=${this.props.article_type}`} >
                                            <p> {value.name}</p>
                                        </Link>


                                    </div>)
                                })
                            }
                        </Card>
                    </Col>
                    {/*<Col span={8}>
                        <Card title="Card title" bordered={false}>Card content</Card>
                    </Col>*/}
                    <Col span={12}>
                        <Card title="热搜排名" bordered={false}>
                            {
                                this.props.recom2_datalist.map(value => {
                                    return(<div>
                                        <Link to={`/system/article?uid=${value.uid}=${this.props.article_type}`} >
                                            <p> {value.name}</p>
                                        </Link>


                                    </div>)
                                })
                            }

                        </Card>

                    </Col>
                </Row>
            </div>
        </div>
        )
    }
}

function mapStateToProps(state)
{
    return{
        dissearch_flag:state.search.dis_flag,
        super_search_flag:state.search.super_search_flag,
        recom1_datalist:state.recom1.datalist,
        recom2_datalist:state.recom2.datalist,
        article_type:state.search.article_type
    }
}

function mapDispatchToProps(dispatch){
    return{

        dis_res:(keyword)=>{dispatch({type:"search",keyword:keyword})},
        init:()=>{dispatch({type:"search_init"})},
        open_super_search:()=>{dispatch({type:"open_super_search"})},
        close_super_search:()=>{dispatch({type:"close_super_search"})},
        set_recom1:(datalist)=>{dispatch({type:"set_recom1",datalist:datalist})},
        set_recom2:(datalist)=>{dispatch({type:"set_recom2",datalist:datalist})},
    }
}
Home=connect(mapStateToProps,mapDispatchToProps)(Home)
export default  Home;
