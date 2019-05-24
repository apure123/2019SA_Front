import React, { Component } from 'react';
import {Table, Button, Tag, Popconfirm, message,Badge, Menu, Dropdown,Icon} from 'antd';
import {quit_action} from "../redux/actions/reg_action";
import {connect} from "react-redux";
import axios from "axios";



//拓展行
const expandedRowRender = (record, index, indent, expanded) => {
        const columns = [
            {
                title: '作者',
                dataIndex: 'authors',
                render: (text,record, index) =>(
                    <span>
{record.authors.map((author)=><Button size={"small"}
                                         onClick={
                                             ()=>{
                                                 console.log("这里有个可用的作者");
                                                 console.log(author.name)
                                                 const w=window.open('about:blank');
                                                 w.location.href="https://www.baidu.com/";
                                             }}
                                         disabled={author.id==-1}   >{author.name}</Button>)}
</span>
                )
            },
            { title: '是否已购', dataIndex: 'buyed', key: 'buyed',
                render: () => <span><Badge status="success" />状态</span> },
            {
                title: 'Action',
                dataIndex: 'operation',
                key: 'operation',
                render: () => (
                    <span className="table-operation">
            <a href="javascript:;">Pause</a>
            <a href="javascript:;">Stop</a>

          </span>
                ),
            },
            <Button onClick={()=>console.log(record)}>输出这里的record</Button>
        ];

        return (
        <div>
            <Table
                columns={columns}
                dataSource={[record]}
                pagination={false}
            />
        </div>
    )
    };

class MyStar extends Component{
    constructor(props) {
        super(props);
//构造器的初始化操作

        this.get_star_data(this.props.user_id)
    }





/*
{
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
},*/


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
        title:"操作",
        dataIndex:"operation",
        render: (text, record) => (
            this.props.data.length >= 1
                ? (
                    <div>
                        <Popconfirm title="确认购买?" onConfirm={() => this.buy(record.id)}>
                            <Button type="primary">购买</Button>
                        </Popconfirm>
                    <Popconfirm title="确认删除?" onConfirm={() => this.handleDelete(record.key)}>
                        <Button>取消收藏</Button>
                    </Popconfirm>

                    </div>
                ) : null
        ),
    }
    ];

     //展开执行的方法
     onexpand=(expanded, record)=>{
         console.log("有表项被展开，下面输出它的expand和record")
         console.log(expanded);
         console.log(record);
         //获取具体数据
         this.get_star_detail(record.id,record.key);
         this.render()
     }

    onSelectChange = (selectedRowKeys) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        //这里应该就是将state的选中数组绑定到表格的操作了
        this.props.set_selectedRowKeys(selectedRowKeys);
        console.log("选择项改变后的state长度为"+this.props.data.length)
    }
    expandchange=(expandedRows)=>{

    }

    //真正的从后端删除的方法
     handleDelete = (key) => {
        console.log("你想删除"+key);
        console.log("类里面的state：");
        console.log(this.props.data[key])
         axios.delete(`Http://127.0.0.1:8000/api/star/?token=${this.props.token}`, {
             data:{
                 data:{
                 item_list:[this.props.data[key].id]
                 }
             }
         })
             .then( (response) =>{
                 console.log(response);
                 //如果删除成功就刷新
                 if(response.data.msg=="已取消收藏"){
                     message.success("已取消收藏");
                     this.get_star_data(this.props.user_id)
                 }else {
                     message.error(response.data.msg)
                 }
             })
             .catch(function (error) {
                 console.log(error);
                 message.error("取消收藏操作出现错误")
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
    //加到购物车
    add_to_shopcar=(selectedRowKeys)=>{
        let select_resource_idlist=[];
        //把需要操作的资源用key提取resource_ID，然后装进数组
        for (let i = 0; i <selectedRowKeys.length ; i++) {
            select_resource_idlist.push(this.props.data[selectedRowKeys[i]].id)
        }
        axios.post(`Http://127.0.0.1:8000/api/buy/?token=/${this.props.token}`, {
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
    //获取概要收藏数据
    get_star_data=()=>{
        axios.get(`Http://127.0.0.1:8000/api/star`,{headers:{
                Authorization:`Token ${this.props.token}`
            }})
            .then( (response) =>{
                console.log(response);
                //设置收藏夹数据
                this.props.set_star_data(response.data)
            })
            .catch(function (error) {
                console.log(error);
            })
            .then(function () {
                // always executed
            });
    }
    //获取某个资源的具体收藏数据
    get_star_detail=(resource_id,key)=>{
         console.log("开始向后台获取具体数据")
        axios.get(`Http://127.0.0.1:8000/api/star_detail`,{params:{
            token:this.props.token,
                id:resource_id
            }})
            .then( (response) =>{
                console.log(response);
                if(response.data.msg){
                    message.error(response.data.msg);
                }else{
                //设置收藏夹数据
                this.props.set_star_detail(response.data.authors,response.data.buyed,key)
                    this.render()
                    }
            })
            .catch(function (error) {
                console.log(error);
            })
            .then(function () {
                // always executed
            });
}
    render()  {

         console.log("页面渲染！");
        const rowSelection = {
            selectedRowKeys:this.props.selectedRowKeys,
            onChange: this.onSelectChange,
        };
        const expandedRowKeys={
            expandedRowKeys:this.props.expandedRowKeys,
            onChange: this.expandchange
        }
        const hasSelected = this.props.selectedRowKeys.length > 0;

        return (
            <div style={{}}>
                <div style={{ marginBottom: 6 ,marginRight:8, float:"left"}}>
                    <span style={{ marginRight: 8 }}>
                        {hasSelected ? ` ${this.props.selectedRowKeys.length} 条资源已选中` : ''}
                    </span>
                </div>

                <br/>

                <Table  rowSelection={rowSelection}
                        columns={this.columns}
                        dataSource={this.props.data}
                        pagination={{pageSize:7}}
                        expandedRowRender={expandedRowRender}
                        onExpand={this.onexpand}
                />
                <Button
                    type="primary"
                    onClick={()=>{this.multiDelete(this.props.selectedRowKeys)}}
                    disabled={!hasSelected}
                    /*loading={loading}*/
                    style={{margin:"auto"}}
                >
                    批量删除
                </Button>



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
