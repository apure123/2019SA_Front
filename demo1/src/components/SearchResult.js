import React, { Component } from 'react';
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

const count = 3;



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

    //搜索方法，已经加入具体搜索！，具体搜索的时候不能有假数据！！！
    search=(keyword)=>{
        console.log("！！！！！！！！！！！执行搜索方法！！！！！！！！！！！")
        /*this.props.loading();*/
        axios.get(`Http://127.0.0.1:8000/api/search/`, {params:{
            token:this.props.token,
                keyword:keyword
            }})
    .then( (response) =>{
            console.log(response);
        if(response.data.detail){
            message.error("获取搜索结果错误："+response.data.detail);
            this.props.deloading();
        }else {
            //先删除假数据
            this.props.deloading();
            this.props.set_res(response.data,keyword);
            //接下来遍历搜索结果，为每个搜索结果进行具体搜索

            this.all_search_detail();


        }
        })
            .catch((error)=> {
                console.log(error);
                this.props.deloading();
            })

    }

    //具体搜索方法（加载更多）
    search_detail=(id,key)=>{

        axios.get(`Http://127.0.0.1:8000/api/search_detail`, {params:{
                token:this.props.token,
                id:id
            }})
            .then( (response) =>{
                if(response.data.detail){
                    message.error("获取搜索结果错误："+response.data.detail);
                }else {
                    this.props.search_detail(response.data.authors,response.data.starred,key)
                }
            })
            .catch((error)=> {
                console.log(error);
            })
    }
    //具体搜索的时候有假数据
    all_search_detail=()=>{
        for (let i = 0; i <this.props.result_list.length-1 ; i++) {
            this.search_detail(this.props.result_list[i].id,this.props.result_list[i].key)
        }
}

    //收藏方法,收藏后修改本地数据，不再搜索
    star=(resource_id,key)=>{
        axios.post(`Http://127.0.0.1:8000/api/star/?token=${this.props.token}`, {
        data:{item_list:[resource_id]}
        })
            .then( (response) =>{
                console.log(response);
                if(response.data.msg=="添加成功"){
                    message.success("添加成功");
                    this.props.star(key);

                }
                else message.error(response.data.msg);
            })
            .catch(function (error) {
                console.log(error);
                message.error("收藏失败");
            })
    }

    //加到购物车
    add_to_shopcar=(resource_id)=>{
        axios.post(`Http://127.0.0.1:8000/add_item_list/${this.props.user_id}/`, {
                user_ID: this.props.user_id,
                item_list: [resource_id]
        })
            .then( (response) =>{
                console.log(response);
                //如果删除成功就刷新
                /*alert("添加到购物车成功");*/
                message.success("添加成功")
                this.search(this.props.keyword)
            })
            .catch(function (error) {
                console.log(error);
                alert("添加失败")
            })
            .then(function () {
                // always executed
            });
    }


    componentDidMount() {
        //组件加载完毕就进行默认搜索，会将详情顶掉
    }
    render() {

        console.log("搜索页渲染！")
        console.log(this.props.result_list)

        return(<div>
            <Icon type="close" className={"close"} onClick={this.props.quit_search}  />
            <p>搜索框</p>
            {/*<Input.Search
                placeholder="input search text"
                enterButton="Search"
                size="large"
                defaultValue={this.props.keyword}
                onSearch={value => {console.log(value);this.search(value)}}
                style={{width:'40%'}}
            />*/}
            <div style={{backgroundColor:"#fff",width:"95%",margin:"auto",padding:"36px"}}>
                <h2>资源检索</h2>
                <Input.Search
                    placeholder="这里是搜索测试，请输入你想获取几条数据，必须是数字"
                    enterButton="检索"
                    size="large"

                    onSearch={value => this.search(value)}
                    style={{width:'50%'}}
                />
                <div style={{width:"10%",float:"right"}}>
                    <Row>
                        <Col span={20}>
                            <p>高级搜索：</p>
                        </Col>
                        <Col span={1}>
                            <Switch checkedChildren="开" unCheckedChildren="关" defaultChecked={false}
                                    onChange={()=>{this.props.switch_super_search()}}
                            />
                        </Col>
                    </Row>
                </div>
                {this.props.super_search_flag?<div>
                    <Register/>
                </div>:<div></div>}
            </div>

            <h2>搜索结果</h2>

            <Card
                style={{ marginTop: 24 }}
                bordered={false}
                bodyStyle={{ padding: '8px 32px 32px 32px' }}
            >
                123
            </Card>

            <Card/>


            <List
                className="demo-loadmore-list"
                itemLayout="horizontal"
                dataSource={this.props.result_list}
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
                            <List.Item.Meta style={{width:"60%",float:"left"}}
                                title={<a href={item.url}>{`标题：${item.title}`}</a>}
                                description={
                                    <div >
                                    <p className={"line-limit-length"}>{`简介：${item.intro}`}</p>
                                    <div><p>价格：{item.price}</p></div>
                                    </div>}
                            />
                            <Tag color={'geekblue'} >{item.Type}</Tag>
                            <Button onClick={()=>{this.star(item.id,item.key)}}>收藏</Button>
                        </Skeleton>
                    </List.Item>
                )}
            />

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
        super_search_flag:state.search.super_search_flag

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
