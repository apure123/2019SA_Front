import React, { Component } from 'react';
import {Link}from "react-router-dom"
import {
    Input,
    List,
    Skeleton,
    Avatar,
    Icon,
    Tag,
    message,
    Button,
    Collapse,
    Card,
    Form,
    Menu,
    Row,
    Col,
    Select,
    Switch
} from "antd";
import {connect} from "react-redux";
import axios from "axios"
import "../css/Search_Result.css"
import Register from "./Register";
import Super_Search from "./Super_Search";

const FormItem = Form.Item;
const formItemLayout = {
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 24 },
        md: { span: 12 },
    },
};


class SearchPage extends Component{

    constructor(props) {
        super(props);
        /*this.search(this.props.keyword)*/
    }

    //收藏方法
    star=(resource_id,key)=>{

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




    componentDidMount() {

    }
    render() {

        console.log("搜索页渲染！")

        return(<div>
            <Icon type="close" className={"close"} onClick={this.props.quit_search}  />

            <div style={{backgroundColor:"#fff",width:"95%",margin:"auto",padding:"36px"}}>
                <Super_Search/>
            </div>

            <h2>搜索结果</h2>

            <Card
                style={{ marginTop: 24 }}
                bordered={false}
                bodyStyle={{ padding: '8px 32px 32px 32px' }}
            >
                <List
                    className="demo-loadmore-list"
                    /*itemLayout="horizontal"*/
                    dataSource={this.props.result_list}
                    header={<div style={{display:"flex",textAlign:"center"}}>
                        <p style={{width:"40%"}}>标题</p>
                        <p style={{width:"20%"}}>作者</p>
                        <p style={{width:"20%"}}>发表时间</p>
                        <p style={{width:"10%"}}></p>
                        <p style={{width:"10%"}}>操作</p>
                    </div>}
                    renderItem={item => (
                        <List.Item
                            /*actions={[
                            <a onClick={
                                ()=>{console.log(item);
                                    this.star(item.id,item.key);
                                }
                            }>
                                {item.starred?<Icon type={"star"}theme={"filled"} />:<Icon type={"star"} />}
                            </a>
                            ]}*/
                        >
                            <Skeleton  title={false} loading={item.loading} active>

                                <p style={{margin:"10px",padding:"10px"}}>{item.key}</p>
                                <List.Item.Meta style={{width:"40%",float:"left"}}
                                                title={<Link to={`/system/article?uid=${item.uid}=${this.props.article_type}`} /*target={"_blank"}*/><p> {`${item.name}`}</p></Link>}

                                />
                                {/*作者*/}
                                <div style={{width:"20%"}}>{item.authors.map(function (value,key) {
                                    return(<Link to={`/system/experthome?uid=${value.uid}`}><Button size={"small"} onClick={()=>console.log(item)} style={{margin:"2px"}}>{value.name}</Button></Link>)
                                })}</div>

                                <div style={{width:"20%"}}>
                                    <p>{`发表时间：${item.year}`}</p>
                                </div>
                                {/*<Tag color={'geekblue'} >{item.Type}</Tag>*/}
                                <div style={{width:"10%"}}>
                                    {item.patent_id?<p>{`专利号:${item.patent_id}`}</p>:<p></p>}
                                </div>
                               {/* 收藏按钮*/}
                                <div style={{width:"10%"}}>
                                    <Button onClick={()=>{this.star(item.uid,item.key)}}>收藏</Button>
                                </div>


                            </Skeleton>
                        </List.Item>
                    )}
                />
            </Card>

            <Card/>




        </div>)
    }

}

function mapStateToProps(state)
{
    return{
        dissearch_flag:state.search.dis_flag,
        result_list:state.search.search_result_list,
        keyword:state.search.keyword,
        user_id:state.login.user_id,
        token:state.login.token,
        detail_flag:state.search.detail_flag,
        super_search_flag:state.search.super_search_flag,
        article_type:state.search.article_type,
        //用来收藏的时候判断
        loginflag:state.login.loginflag,



    }
}

function mapDispatchToProps(dispatch){
    return{

        dis_res:()=>{dispatch({type:"search"})},
        init:()=>{dispatch({type:"search_init"})},
        set_res:(list,keyword)=>{dispatch({type:"search_load",list:list,keyword:keyword})},
        quit_search:()=>{dispatch({type:"quit_search"})},
        loading:()=>{dispatch({type:"search_loading"})},
        deloading:()=>{dispatch({type:"search_deloading"})},
        search_detail:(authors,starred,key)=>{dispatch({type:"search_detail",
            authors:authors,starred:starred,key:key})},
            star:(key)=>{dispatch({type:"star",key:key})},
        switch_super_search:()=>{dispatch({type:"switch_super_search"})}
    }
}
SearchPage=connect(mapStateToProps,mapDispatchToProps)(SearchPage)
export default SearchPage;
