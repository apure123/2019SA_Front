import React, { Component } from 'react';
import {Table, Button, Tag, Popconfirm,message} from 'antd';
import {connect} from "react-redux";
import axios from "axios"
import {Link} from "react-router-dom";



class User_interest extends Component{
    constructor(props) {
        super(props);
        //获取数据
        this.get_data()
    }

    componentDidMount() {
        this.get_data()
    }

    columns = [

        {
        title: '专利',
        dataIndex: 'patent_id',
        key:"name",
        render: (text,record, index) => <Link to={`/system/article?uid=${text}=P2`} >
            <a>{record.patent_title}</a></Link>
        },
        {
            title: '接收专家',
            dataIndex: 'receive_user',
            key:"",
            render: (text,record, index) => <a  >{text}</a>
        },
        {
            title: '消息',
            dataIndex: 'message',
            key:"",
            render: (text,record, index) => <p  >{text}</p>
        }
    ];
    get_data=()=>{
        axios({
            method:"get",
            url:"http://127.0.0.1:8000/api/interested/",
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
        interest:state.interest.interest
    }
}

function mapDispatchToProps(dispatch){
    return{
        set_interest:(interest)=>{dispatch({type:"set_interest",interest:interest})}
    }
}
User_interest=connect(mapStateToProps,mapDispatchToProps)(User_interest)
export default  User_interest;
