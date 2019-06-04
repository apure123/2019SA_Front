import { List, Avatar, Button, Skeleton } from 'antd';
import React, { Component } from 'react';
import {Link} from "react-router-dom";
import axios from "axios"
import {connect} from "react-redux";
const count = 3;


class Similar_Article_list extends React.Component {
    state = {
        initLoading: true,
        loading: false,
        data: [],
        list: [],
    };

    componentDidMount() {
        this.getData(res => {
            this.setState({
                initLoading: false,
                list: res.result,
            });
        });
    }

    getData = callback => {
        /*axios.get(fakeDataUrl)
            .then((response)=>{
                //console.log(response)
                callback(response.data);
            })*/
        if(this.props.article.keyword_list[0]&&this.props.article.keyword_list[0]!=""){
            axios.post(`http://127.0.0.1:8000/api/search/`, {
                field:"Title",
                content:this.props.article.keyword_list[0],
                type:"P1"
            })
                .then( (response) =>{
                    callback(response.data);
                })
                .catch((err)=>console.log(err))
        }
    };

    onLoadMore = () => {
        this.setState({
            loading: true,
            list: this.state.data.concat([...new Array(count)].map(() => ({ loading: true, name: {} }))),
        });
        this.getData(res => {
            const data = this.state.data.concat(res.results);
            this.setState(
                {
                    data,
                    list: data,
                    loading: false,
                },
                () => {
                    // Resetting window's offsetTop so as to display react-virtualized demo underfloor.
                    // In real scene, you can using public method of react-virtualized:
                    // https://stackoverflow.com/questions/46700726/how-to-use-public-method-updateposition-of-react-virtualized
                    window.dispatchEvent(new Event('resize'));
                },
            );
        });
    };
//按标题搜索
    search_title=(value)=>{
        axios.post(`http://127.0.0.1:8000/api/search/`, {
            field:"Title",
            content:value,
            type:"P1"
        })
            .then( (response) =>{
                console.log(response);
                this.props.set_search_result_data(response.data.result);
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

    render() {
        const { initLoading, loading, list } = this.state;
        const loadMore =
            !initLoading && !loading ? (
                <div
                    style={{
                        textAlign: 'center',
                        marginTop: 12,
                        height: 32,
                        lineHeight: '32px',
                    }}
                >
                    <Button onClick={this.onLoadMore}>loading more</Button>
                </div>
            ) : null;

        return (
            <List
                className="demo-loadmore-list"
                loading={initLoading}
                itemLayout="horizontal"
                /*loadMore={loadMore}*/
                dataSource={list}
                renderItem={item => (
                    <List.Item >
                        <Skeleton  title={false} loading={item.loading} active>
                            <List.Item.Meta
                                title={
                                    <a onClick={()=>{
                                        //相当于重新加载文章页
                                        this.get_detail_not_login(item.uid,"P1")
                                        //重新加载相似资源
                                        this.getData(res => {
                                            this.setState({
                                                initLoading: false,
                                                list: res.result,
                                            });
                                        });
                                    }} style={{color:"#1da57a",float:"left",marginLeft:"50px"}}>{item.name}</a>}
                            />

                        </Skeleton>
                    </List.Item>
                )}
            />
        );
    }
}


function mapStateToProps(state)
{
    return{

        username:state.login.username,
        token:state.login.token,
        article:state.article.article,
        loginflag:state.login.loginflag
    }
}

function mapDispatchToProps(dispatch){
    return{


        set_profile_account:(account,all_data)=>{dispatch(
            {type: "profile_set_account",account:account,all_data: all_data}
        )},
        set_article_data:(article_data)=>{dispatch({type:"set_article",article:article_data})},

        set_patent:(patent_data)=>{dispatch({type:"set_patent",patent_data:patent_data})},

    }
}
Similar_Article_list=connect(mapStateToProps,mapDispatchToProps)(Similar_Article_list)
export default Similar_Article_list;
