import React, { Component } from 'react';
import {Table, Button, Tag, Popconfirm, message} from 'antd';
import {quit_action} from "../redux/actions/reg_action";
import {connect} from "react-redux";
import axios from "axios";


class MyStar extends Component{
    constructor(props) {
        super(props);
//构造器的初始化操作

        this.get_star_data(this.props.user_id)
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
            <span>
                {record.author_IDs.map((author)=><Button size={"small"}
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
        title:"操作",
        dataIndex:"operation",
        render: (text, record) => (
            this.props.data.length >= 1
                ? (
                    <Popconfirm title="确认删除?" onConfirm={() => this.handleDelete(record.key)}>
                        <a href="javascript:;">Delete</a>
                    </Popconfirm>
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

    //真正的从后端删除的方法
     handleDelete = (key) => {
        console.log("你想删除"+key);
        console.log("类里面的state：");
        console.log(this.props.data[key])
         axios.delete(`Http://127.0.0.1:8000/star/${this.props.user_id}/`, {
             data:{user_ID:this.props.user_id,
                 resource_ID:[this.props.data[key].resource_ID]}

         })
             .then( (response) =>{
                 console.log(response);
                 //如果删除成功就刷新
                 alert("删除成功");
                 this.get_star_data(this.props.user_id)
             })
             .catch(function (error) {
                 console.log(error);
             })
             .then(function () {
                 // always executed
             });

    }
    multiDelete=(selectedRowKeys) => {

        console.log("你想删除");
        console.log(selectedRowKeys)
        console.log("类里面的state：");
        console.log(this.props.data)

        let select_resource_idlist=[];
        //把需要删除的资源用key提取resource_ID，然后装进数组
        for (let i = 0; i <selectedRowKeys.length ; i++) {
            select_resource_idlist.push(this.props.data[selectedRowKeys[i]].resource_ID)
        }
        console.log("想要删除的id数组为：");
        console.log(select_resource_idlist);

        //下面是真正的删除后端数据
        axios.delete(`Http://127.0.0.1:8000/star/${this.props.user_id}/`,
            {data:{resource_ID:select_resource_idlist}}
        )
            .then( (response) =>{
                console.log(response);
                //如果删除成功就刷新
                alert("删除成功");
                this.get_star_data(this.props.user_id);
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
    //加到购物车
    add_to_shopcar=(selectedRowKeys)=>{
        let select_resource_idlist=[];
        //把需要操作的资源用key提取resource_ID，然后装进数组
        for (let i = 0; i <selectedRowKeys.length ; i++) {
            select_resource_idlist.push(this.props.data[selectedRowKeys[i]].resource_ID)
        }
        axios.post(`Http://127.0.0.1:8000/add_item_list/${this.props.user_id}/`, {
            user_ID: this.props.user_id,
            item_list: select_resource_idlist
        })
            .then( (response) =>{
                console.log(response);
                //如果删除成功就刷新
                /*alert("添加到购物车成功");*/
                message.success("添加成功")

            })
            .catch(function (error) {
                console.log(error);
                alert("添加失败")
            })
            .then(function () {
                // always executed
            });
    }
    get_star_data=(user_id)=>{
        axios.get(`Http://127.0.0.1:8000/my_collections/${user_id}`, {
            params: {

            }})
            .then( (response) =>{
                console.log(response);
                //设置收藏夹数据
                this.props.set_star_data(response.data.resource_list)
            })
            .catch(function (error) {
                console.log(error);
            })
            .then(function () {
                // always executed
            });
    }

    render()  {

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

                <Table  rowSelection={rowSelection} columns={this.columns} dataSource={this.props.data} pagination={{pageSize:7}} />
                <Button
                    type="primary"
                    onClick={()=>{this.multiDelete(this.props.selectedRowKeys)}}
                    disabled={!hasSelected}
                    /*loading={loading}*/
                    style={{margin:"auto"}}
                >
                    批量删除
                </Button>
                <Button
                    onClick={()=>{this.add_to_shopcar(this.props.selectedRowKeys)}}
                    disabled={!hasSelected}
                    /*loading={loading}*/
                    style={{margin:"auto"}}
                >
                    加入购物车
                </Button>
                <button onClick={()=>{console.log(this.props.data)}}>输出state</button>


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

    }
}

function mapDispatchToProps(dispatch){
    return{

        set_selectedRowKeys:(selectedRowKeys)=>{dispatch({type: "set_selectedRowKeys",selectedRowKeys:selectedRowKeys})},
        delete_stardata:(itemkey)=>{dispatch({type:"delete_stardata",itemkey:itemkey})},
        multidelete_stardata:()=>{dispatch({type:"multidelete_stardata"})},
        init_stardata:()=>{dispatch({type:"init_stardata"})},
        set_star_data:(data)=>{dispatch({type:"set_star_data",data:data})}
    }
}
MyStar=connect(mapStateToProps,mapDispatchToProps)(MyStar)
export default  MyStar;