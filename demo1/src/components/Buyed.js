import React, { Component } from 'react';
import {Table, Button, Tag, Popconfirm,message} from 'antd';
import {connect} from "react-redux";
import axios from "axios"



class Buyed extends Component{
    constructor(props) {
        super(props);
        this.get_buyed_data()
    }


    columns = [{
        title: '资源名称',
        dataIndex: 'title',
        key:"name",
        render: (text,record, index) => <a href={record.url} target="_Blank" >{text}</a>
    },  {
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
    get_buyed_data=()=>{
        axios.get(`Http://127.0.0.1:8000/api/buy/?token=${this.props.token}`)
            .then( (response) =>{
                console.log("下面是已购资源数据")
                console.log(response);
                //设置已购资源数据
                this.props.get_buyed_data(response.data)
            })
            .catch(function (error) {
                console.log(error);
                message.error("获取已购资源失败")
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
        token:state.login.token,
    }
}

function mapDispatchToProps(dispatch){
    return{
        get_buyed_data:(data)=>{dispatch({type:"set_buyed",data:data})}
    }
}
Buyed=connect(mapStateToProps,mapDispatchToProps)(Buyed)
export default  Buyed;