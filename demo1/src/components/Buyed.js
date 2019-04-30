import React, { Component } from 'react';
import {Table, Button, Tag, Popconfirm,message} from 'antd';
import {connect} from "react-redux";
import axios from "axios"



class Buyed extends Component{
    constructor(props) {
        super(props);
        this.get_shopcar_data(this.props.user_id)
    }


    columns = [{
        title: '资源名称',
        dataIndex: 'title',
        key:"name",
        render: (text,record, index) => <a href={record.url} target="_Blank" >{text}</a>
    }, {
        title: '作者',
        dataIndex: 'authors',
        render: (text,record, index) =>(
            <span style={{maxWidth:"200px"}}>
                {record.author_IDs.map((author)=><Button size={"small"} style={{maxWidth:"200px",overflow:"hidden"}}
                                                         onClick={
                                                             ()=>{
                                                                 console.log("这里有个可用的作者");
                                                                 console.log(author.author_ID)
                                                                 const w=window.open('about:blank');
                                                                 w.location.href="https://www.baidu.com/";
                                                             }}
                                                         disabled={author.author_ID==-1}   >{author.name}</Button>)}
            </span>
        )
    }, {
        title: '资源类型',
        dataIndex: 'Type',
        render: type => (
            <span>
      <Tag color={'geekblue'} >{type}</Tag>
    </span>
        ),
    },{
        title: '价格',
        dataIndex: 'price',
        key:"price",
        render: (text) => <p>{text}</p>
    }
    ];
    get_shopcar_data=(user_id)=>{
        axios.get(`Http://127.0.0.1:8000/buyed_resource/${user_id}`)
            .then( (response) =>{
                console.log("下面是已购资源数据")
                console.log(response);
                //设置已购资源数据

                this.props.get_buyed_data(response.data.resouce_list)
            })
            .catch(function (error) {
                console.log(error);
            })
            .then(function () {
                // always executed
            });
    }



    render(){return (
        <div >
            <Table  columns={this.columns} dataSource={this.props.data} pagination={{pageSize:7}} />
        </div>
    )

    }
}

function mapStateToProps(state)
{
    return{
        data:state.buyed.data,
        user_id:state.login.user_id
    }
}

function mapDispatchToProps(dispatch){
    return{
        get_buyed_data:(data)=>{dispatch({type:"set_buyed",data:data})}
    }
}
Buyed=connect(mapStateToProps,mapDispatchToProps)(Buyed)
export default  Buyed;