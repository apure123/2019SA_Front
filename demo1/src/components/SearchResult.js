import React, { Component } from 'react';
import {Input, List, Skeleton, Avatar, Icon, Tag,message} from "antd";
import {connect} from "react-redux";
import axios from "axios"
import "../css/Search_Result.css"
const count = 3;

class SearchPage extends Component{
    //搜索方法
    search=(keyword)=>{
        this.props.loading();
        axios.get(`Http://127.0.0.1:8000/search/${this.props.user_id}`, {
            params: {
                keywords: keyword
            }})
    .then( (response) =>{
            console.log(response);
            this.props.set_res(response.data,keyword)
        })
            .catch((error)=> {
                console.log(error);
                this.props.deloading();
            })

    }
    //收藏方法
    star=(resource_id)=>{
        /*this.props.loading();*/
        axios.post(`Http://127.0.0.1:8000/star/${this.props.user_id}/`, {
                user_ID:this.props.user_id,
                resource_ID:resource_id
        })
            .then( (response) =>{
                console.log(response);

            })
            .catch(function (error) {
                console.log(error);
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
        this.search(this.props.keyword)
    }
    render() {
        return(<div>
            <Icon type="close" className={"close"} onClick={this.props.quit_search}  />
            <p>搜索框</p>
            <Input.Search
                placeholder="input search text"
                enterButton="Search"
                size="large"
                defaultValue={this.props.keyword}
                onSearch={value => {console.log(value);this.search(value)}}
                style={{width:'100%'}}
            />
            <h2>搜索结果</h2>
            <List
                className="demo-loadmore-list"
                /*bordered={true}*/
                /*loading={initLoading}*/
                itemLayout="horizontal"
                /*loadMore={loadMore}*/
                dataSource={this.props.result_list}
                renderItem={item => (
                    <List.Item
                        /*style={{float:"left"}}*/
                        actions={[<a onClick={()=>{this.add_to_shopcar(item.resource_ID)}}>
                        加入购物车</a>,
                        <a onClick={()=>{console.log(item);this.star(item.resource_ID);this.search(this.props.keyword)}}>
                            {item.is_star?<Icon type={"star"}theme={"filled"} />:<Icon type={"star"} />}
                        </a>]}>
                        <Skeleton avatar title={false} loading={item.loading} active>
                            <p style={{margin:"10px",padding:"10px"}}>{item.rank}</p>
                            <List.Item.Meta style={{width:"60%",float:"left"}}
                                /*avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}*/
                                title={<a href={item.url}>{`标题：${item.title}`}</a>}
                                description={<div >
                                    <p className={"line-limit-length"}>{`简介：${item.intro}`}</p>
                                    <a href={item.url} target="_Blank" style={{margin:"10px",padding:"10px"}}>{item.authors}</a>

                                    <div><p>价格：{item.price}</p></div>
                                </div>}
                            />
                            <Tag color={'geekblue'} >文章类型</Tag>

                        </Skeleton>
                    </List.Item>
                )}
            />
            <button onClick={()=>this.search(3)}>获取3条后台get的数据</button>
        </div>)
    }

}

function mapStateToProps(state)
{
    return{
        dissearch_flag:state.search.dis_flag,
        result_list:state.search.search_result_list,
        keyword:state.search.keyword,
        user_id:state.login.user_id
    }
}

function mapDispatchToProps(dispatch){
    return{

        dis_res:()=>{dispatch({type:"search"})},
        init:()=>{dispatch({type:"search_init"})},
        set_res:(list,keyword)=>{dispatch({type:"search_load",list:list,keyword:keyword})},
        quit_search:()=>{dispatch({type:"quit_search"})},
        loading:()=>{dispatch({type:"search_loading"})},
        deloading:()=>{dispatch({type:"search_deloading"})}
    }
}
SearchPage=connect(mapStateToProps,mapDispatchToProps)(SearchPage)
export default SearchPage;