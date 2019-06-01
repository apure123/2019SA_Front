import React, { Component } from 'react';
import {Table, Button, Tag, Popconfirm, message,Badge, Menu, Dropdown,Icon} from 'antd';
import {quit_action} from "../redux/actions/reg_action";
import {connect} from "react-redux";
import axios from "axios";
import {Link} from "react-router-dom";


class MyStar extends Component{
    constructor(props) {
        super(props);
//构造器的初始化操作

        this.get_star_data()
    }

     columns = [{
        title: '资源名称',
        dataIndex: 'name',
        key:"name",
        render: (text,record, index) => <Link to={`/system/article?uid=${this.props.data[index].uid}=${this.props.data[index].article_type}`} >
            <p> {text}</p></Link>
    },  {
        title: '资源类型',
        dataIndex: 'Type',
        render: text => (
            <span>
                {
                    text==="专利"?<Tag color={'geekblue'} >{text}</Tag>:<Tag color="cyan">{text}</Tag>
                }

    </span>
        ),
    },{
        title:"操作",
        dataIndex:"operation",
        render: (text, record) => (
            this.props.data.length >= 1
                ? (
                    <div>
                    <Popconfirm title="确认删除?" onConfirm={() => this.handleDelete(record.uid)}>
                        <Button>取消收藏</Button>
                    </Popconfirm>

                    </div>
                ) : null
        ),
    }
    ];


    onSelectChange = (selectedRowKeys) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        //这里应该就是将state的选中数组绑定到表格的操作了
        this.props.set_selectedRowKeys(selectedRowKeys);
        console.log("选择项改变后的state长度为"+this.props.data.length)
    }


    //取消收藏的方法
     handleDelete = (uid) => {
        console.log("你想删除"+uid);

         axios({
             method:"delete",
             url:"http://127.0.0.1:8000/api/star/",
             data:{data:{item_list:uid}},
             headers:{
                 "Authorization":`Token ${this.props.token}`,
                 "Content-Type":"application/json"
             }
         })
             .then( (response) =>{
                 console.log(response);
                 if(response.data.msg==="已取消收藏"){
                     message.success("已取消收藏")
                     this.get_star_data()
                 }else {message.error(response.data.msg)}
             })
             .catch(function (error) {
                 console.log(error);
             })

    }
    multiDelete=(selectedRowKeys) => {

        console.log("你想删除");
        console.log(selectedRowKeys)
        console.log("类里面的state：");
        console.log(this.props.data)

        let select_resource_idlist=[];
        //把需要删除的资源用key提取resource_ID，然后装进数组
        for (let i = 0; i <selectedRowKeys.length ; i++) {
            select_resource_idlist.push(this.props.data[selectedRowKeys[i]].id)
        }
        console.log("想要删除的id数组为：");
        console.log(select_resource_idlist);

        //下面是真正的删除后端数据
        axios.delete(`Http://127.0.0.1:8000/api/star/?token=${this.props.token}`,
            {data:{
                data:{item_list:select_resource_idlist}
            }}
        )
            .then( (response) =>{
                console.log(response);
                //如果删除成功就刷新
                if(response.data.msg=="已取消收藏"){
                    message.success("已取消收藏");
                    this.get_star_data(this.props.user_id)
                }else {
                    message.error(response.data.msg)
                }
                //完成删除动作之后需要把选中数组也一起清空
                this.props.set_selectedRowKeys([]);
            })
            .catch(function (error) {
                console.log(error);
            })
            .then(function () {
                // always executed
            });



    }


    //购买
    buy=(id)=>{
        axios.post(`Http://127.0.0.1:8000/api/buy/?token=${this.props.token}`, {
            data:{item_id:id}
        })
            .then( (response) =>{
                if(response.data.msg=="交易成功"){
                    message.success("购买成功")
                }else {
                    message.error(response.data.msg)
                }
            })
            .catch(function (error) {
                console.log(error);
                alert("购买失败")
            })
    }
    //获取收藏数据
    get_star_data=()=>{
        console.log(this.props.token)
        axios({
            method:"get",
            url:"http://127.0.0.1:8000/api/star/",
            headers:{
                "Authorization":`Token ${this.props.token}`
            }
        })
            .then( (response) =>{
                console.log(response);
                this.props.set_star_data(response.data.star)

            })
            .catch(function (error) {
                console.log(error);
            })


    }

    render()  {

         console.log("页面渲染！");
        const rowSelection = {
            selectedRowKeys:this.props.selectedRowKeys,
            onChange: this.onSelectChange,
        };

        const hasSelected = this.props.selectedRowKeys.length > 0;

        return (
            <div style={{}}>
                <div style={{ marginBottom: 6 ,marginRight:8, float:"left"}}>
                    <span style={{ marginRight: 8 }}>
                        {hasSelected ? ` ${this.props.selectedRowKeys.length} 条资源已选中` : ''}
                    </span>
                </div>

                <br/>

                <Table
                    /*rowSelection={rowSelection}*/
                        columns={this.columns}
                        dataSource={this.props.data}
                        pagination={{pageSize:7}}

                />




            </div>
        );
    }



}

function mapStateToProps(state)
{
    return{
        data:state.star.star_data,
        selectedRowKeys:state.star.selectedRowKeys,
        user_id:state.login.user_id,
        token:state.login.token,

    }
}

function mapDispatchToProps(dispatch){
    return{

        set_selectedRowKeys:(selectedRowKeys)=>{dispatch({type: "set_selectedRowKeys",selectedRowKeys:selectedRowKeys})},
        delete_stardata:(itemkey)=>{dispatch({type:"delete_stardata",itemkey:itemkey})},
        multidelete_stardata:()=>{dispatch({type:"multidelete_stardata"})},
        init_stardata:()=>{dispatch({type:"init_stardata"})},
        set_star_data:(data)=>{dispatch({type:"set_star_data",data:data})},
        set_star_detail:(authors,buyed,key)=>{dispatch({type:"set_star_detail",
            authors:authors,buyed:buyed,key:key})}
    }
}
MyStar=connect(mapStateToProps,mapDispatchToProps)(MyStar)
export default  MyStar;
