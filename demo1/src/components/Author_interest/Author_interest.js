import React, { Component } from 'react';
import {Table, Button, Tag, Popconfirm,message} from 'antd';
import {connect} from "react-redux";
import axios from "axios"



class Author_interest extends Component{
    constructor(props) {
        super(props);
        //获取数据
        this.get_data()
    }


    columns = [{
        title: '专利id',
        dataIndex: 'patent_id',
        key:"name",
        render: (text,record, index) => <a href={record.url} target="_Blank" >{text}</a>
    },
        {
            title: '发送者',
            dataIndex: 'send_user',
            key:"",
            render: (text,record, index) => <a  >{text}</a>
        },
        {
            title: '消息',
            dataIndex: 'message',
            key:"",
            render: (text,record, index) => <p  >{text}</p>
        },
        {
        title: '消息状态',
        dataIndex: 'status',
            render: (text, record, index) => (
                <span>
                    {record==="true"?<Tag>已读</Tag>:<Tag>未读</Tag>}
    </span>
            ),
    },
        {
            title:"回复",
            render:(text,record,index)=>(<Button onClick={()=>{
                console.log(record.message_id);
                //选中要回复的消息id
                this.props.set_message_id(record.id)
                //打开消息框
                this.props.set_reply_visible(true)
            }
            }>回复</Button>)
        }
    ];
    get_data=()=>{
        axios({
            method:"get",
            url:"http://127.0.0.1:8000/api/reply/",
            headers:{
                "Authorization":`Token ${this.props.token}`
            }
        })
            .then( (response) =>{
                console.log(response);
                this.props.set_interest(response.data.result)
            })
            .catch(function (error) {
                console.log(error);

            })
    }



    render(){return (
        <div >
            <Table  columns={this.columns} dataSource={this.props.interest} pagination={{pageSize:7}} />
        </div>
    )

    }
}

function mapStateToProps(state)
{
    return{
        token:state.login.token,
        interest:state.interest_recive.interest
    }
}

function mapDispatchToProps(dispatch){
    return{
        set_interest:(interest)=>{dispatch({type:"set_receive_interest",interest:interest})},
        set_message_id:(id)=>{dispatch({type:"set_reply_uid",uid:id})},
        set_reply_visible:(flag)=>{dispatch({type:"set_reply_visible",visible:flag})}
    }
}
Author_interest=connect(mapStateToProps,mapDispatchToProps)(Author_interest)
export default  Author_interest;
