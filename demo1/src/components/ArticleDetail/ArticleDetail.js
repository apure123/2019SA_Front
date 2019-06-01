import React, { Component } from 'react';
import  "./ArticleDetail.css"
import {Card, Layout, Tag, Menu, Row, Col, Button, Form, message} from "antd"
import axios from "axios"

import {Link} from "react-router-dom";
import {routes3} from "../../routes";
import Similar_Article_list from "./Similar_Article_list";
import {connect} from "react-redux";
import Send_interest from "../Send_interest";
const { Header, Content, Footer } = Layout;

class ArticleDetail extends Component{

    constructor(props) {
        super(props);
        const query = props.location.search// '?uid=123=P1'
        const arr = query.split('=')
        const uid=arr[1]
        const article_type=arr[2]
        //把文章类型存进redux里面
        this.props.set_article_type(article_type)
        console.log(arr)
        //获取文章详细数据
        if(this.props.loginflag)
            this.get_detail_login(uid,article_type);
        else
            this.get_detail_not_login(uid,article_type);
    }

get_detail_login=(uid,article_type)=>{
        console.log(uid)
    axios({
        method:"post",
        url:"http://127.0.0.1:8000/api/detail/",
        data:{"Type":article_type,
        "uid":uid},
        headers:{
            "Authorization":`Token ${this.props.token}`,
            "Content-Type":"application/json"
        }
    })
        .then( (response) =>{
            console.log(response);
            if(article_type==="P1")
                this.props.set_article_data(response.data)
            else this.props.set_patent(response.data)
        })
        .catch(function (error) {
            console.log(error);
        })
}
get_detail_not_login=(uid,article_type)=>{
    axios({
        method:"post",
        url:"http://127.0.0.1:8000/api/detail/",
        data:{"Type":article_type,
            "uid":uid}
    })
        .then( (response) =>{
            console.log(response);
            if(article_type==="P1")
            this.props.set_article_data(response.data)
            else this.props.set_patent(response.data)
        })
        .catch(function (error) {
            console.log(error);
        })
}

    star=(resource_id)=>{

        if(this.props.loginflag){
            axios({
                method:"post",
                url:"http://127.0.0.1:8000/api/star/",
                data:{data:{"item_list":resource_id,
                        "type_list":this.props.article_type}},
                headers:{
                    "Authorization":`Token ${this.props.token}`,
                    "Content-Type":"application/json"
                }
            })
                .then( (response) =>{
                    console.log(response);
                    if(response.data.msg==="收藏成功"){
                        message.success("收藏成功")
                    }else {message.error(response.data.msg)}
                })
                .catch(function (error) {
                    console.log(error);
                    message.error("收藏失败")
                })

        }else {
            alert("请先登录您的账号，再进行收藏")
        }
    }

    render() {
        return(
            <div >
                <div id="dtl_l">


                    <div className="main-info">

                        {this.props.article_type==="P1"?<h2>
                            <a >{this.props.article.name}</a>
                        </h2>:<h2>
                            <a >{this.props.patent.name}</a><Tag style={{marginLeft:"8px"}}>专利</Tag>
                        </h2>}
                        <div className="c_content" >
                           {/* <div className="love_wr">
                                <div className="label-ll">
                                    <span>来自</span>
                                    <a href="http://www.cqvip.com/QK/72137X/201501/667162866.html" target="_blank"
                                       data-click="{'button_tp': 'from_nm'}">维普</a>
                                    <span className="love_wr_distr"></span>
                                </div>
                                <div className="label-l">
                                    <a href="javascript:;" className="love-wr-link"
                                       data-click="{'button_tp': 'like', 'fm': 'beha'}" data-isliked="false">
                                        <i className="iconfont love-wr-icon"
                                           style={{top: "1px", color: "rgb(153, 153, 153)"}}></i>
                                        <span className="like-amount-txt">喜欢</span>
                                        <span className="like-amount-num">0</span>
                                    </a>
                                </div>
                                <div className="label-r">
                                    <p className="">阅读量：</p>
                                    <p>14</p>
                                </div>
                            </div>*/}
                            <br/>
                            <br/>
                            {
                                this.props.article_type==="P1"? <div>

                                <div className="author_wr">
                                    <p className="label">作者：</p>
                                    <p className="author_text">
                                        {this.props.article.authors.map(function (value,key) {
                                            return(<span style={{margin:"5px"}}>
                                            <Link to={`/system/experthome?uid=${value.uid}`} >
                                            <a>{value.name}
                                            </a></Link>
                                        </span>)
                                        })}

                                    </p>
                                </div>

                                <div className="abstract_wr" data-shorth="">
                                    <p className="label">摘要：</p>
                                    <p className="abstract" data-sign="">{this.props.article.abstract}</p>
                                </div>
                                <div className="kw_wr">
                                    <p className="label">关键词：</p>
                                    <p className="kw_main" data-click="{'button_tp':'keyword'}">
                                        {this.props.article.keyword_list.map(function (value) {
                                            return(<span><a
                                                href=""
                                                target="_blank" className="">{value}</a></span>)
                                        })}
                                    </p>
                                </div>
                                <div className="ref_wr">
                                    <p>被引量：</p>
                                    <p className="ref-wr-num">
                                        <a href=""
                                           target="_blank" className="sc_cite_cont" data-click="{'button_tp':'sc_cited'}">
                                            {this.props.article.ci_count}
                                        </a></p>
                                </div>
                            </div>:<div>

                                <div className="author_wr">
                                    <p className="label">发明人：</p>
                                    <p className="author_text">
                                        {this.props.patent.inventor.map(function (value,key) {
                                            return(<span style={{margin:"5px"}}>
                                            <Link to={`/system/experthome?uid=${value.uid}`} >
                                            <a>{value.name}
                                            </a></Link>
                                        </span>)
                                        })}

                                    </p>
                                </div>
                                <div className="abstract_wr" data-shorth="">
                                    <p className="label">专利号：</p>
                                    <p className="abstract" data-sign="">{this.props.patent.patent_id}</p>
                                </div>
                                    <div className="abstract_wr" data-shorth="">
                                        <p  style={{color:"#999"}}>发布日期：</p>
                                        <p className="abstract" data-sign="">{this.props.patent.applicant_date}</p>
                                    </div>


                            </div>}

                        </div>
                        <div className="dtl_subinfo" data-click="{'act_block': 'main'}">
                            <div className="subinfo_tool" style={{display:"flex"}}>
                                <Button size={"small"}
                                        style={{marginRight:"5px"}}
                                    color="cyan" onClick={()=>{
                                    if(this.props.article_type==="P1"){
                                        this.star(this.props.article.uid)
                                    }else {
                                        this.star(this.props.patent.uid)
                                    }


                                }
                                }>收藏</Button>

                                <Send_interest/>

                            </div>
                        </div>
                        <br/>
                        <br/>
                    </div>

                    <br/>

                    <Card style={{ width:"100%", float:"left",margin:"auto",padding:"0"}} bordered={false}>
                        <Layout style={{padding:"0",margin:"0",paddingLeft:"0px"}}>
                            <Header  style={{  zIndex: 1, width: '100%',padding:"0px" ,height:'24px'}}>

                                <Menu

                                    mode="horizontal"
                                    defaultSelectedKeys={['1']}
                                    style={{ lineHeight: '24px',width:"100%" }}
                                >

                                    <Menu.Item key="1">
                                        <span>免费下载</span>
                                    </Menu.Item>
                                    <Menu.Item key="2">
                                        <Link to={"/system/personalinformation/profile"}>
                                            <span>求助全文</span>
                                        </Link>
                                    </Menu.Item>
                                </Menu>
                            </Header>
                            <Content style={{ padding: '0 0px', marginTop: 0 ,backgroundColor:"#fff"}}>
                                <br/>

                                <span className="dl_item_span">
                    <a className="dl_item" target="_blank" href={this.props.article.resource_url} style={{width:"50%",float:"left",lineHeight:"32px"}}>
                    <span  title="下载链接1">下载链接1</span>
                    </a>
                    </span>


                            </Content>

                        </Layout>
                    </Card>
                    <br/>

                    <Card style={{ width:"100%", float:"left",marginTop:"24px",padding:"0",backgroundColor:"#fff"}} bordered={false}>
                        <Layout style={{padding:"0",margin:"0",paddingLeft:"0px"}}>
                            <Header  style={{  zIndex: 1, width: '100%',padding:"0px" ,height:'24px'}}>

                                <Menu

                                    mode="horizontal"
                                    defaultSelectedKeys={['1']}
                                    style={{ lineHeight: '24px',width:"100%" }}
                                >
                                    <Menu.Item key="1">
                                        <span>相似资源</span>
                                    </Menu.Item>
                                </Menu>
                            </Header>
                            <Content style={{ padding: '0 0px', marginTop: 0 ,backgroundColor:"#fff"}}>
                                <Similar_Article_list/>
                            </Content>

                        </Layout>
                    </Card>
                </div>
                {/*<div style={{width:"23%",float:"right",backgroundColor:"#fff",margin:"10px",marginTop:"35px",padding:"24px"}}>
                    <h2>研究点分析</h2>
                    <Row>
                        <Col span={12}><Button icon="bar-chart">Search</Button></Col>
                        <Col span={12}><Button icon="bar-chart">Search</Button></Col>
                    </Row>
                    <Row>
                        <Col span={12}><Button icon="bar-chart">Search</Button></Col>
                        <Col span={12}><Button icon="bar-chart">Search</Button></Col>
                    </Row>
                    <Row>
                        <Col span={12}><Button icon="bar-chart">Search</Button></Col>
                        <Col span={12}><Button icon="bar-chart">Search</Button></Col>
                    </Row>
                </div>*/}
            </div>
        )
    }
}

function mapStateToProps(state)
{
    return{

        username:state.login.username,
        token:state.login.token,
        article:state.article.article,
        patent:state.article.patent,
        loginflag:state.login.loginflag,
        article_type:state.article.article_type
    }
}

function mapDispatchToProps(dispatch){
    return{


        set_profile_account:(account,all_data)=>{dispatch(
            {type: "profile_set_account",account:account,all_data: all_data}
        )},
        set_article_data:(article_data)=>{dispatch({type:"set_article",article:article_data})},
        set_patent:(patent_data)=>{dispatch({type:"set_patent",patent_data:patent_data})},
        set_article_type:(article_type)=>{dispatch({type:"set_article_type",article_type:article_type})}

    }
}
ArticleDetail=connect(mapStateToProps,mapDispatchToProps)(ArticleDetail)
export default ArticleDetail;
