import React, { Component } from 'react';
import {Table, Button, Tag, Popconfirm,message} from 'antd';
import {connect} from "react-redux";
import axios from "axios"



class ShopCar extends Component{
    constructor(props) {
        super(props);
this.get_shopcar_data(this.props.user_id)
        /*this.props.init_stardata();*/
    }

  /*  columns = [{
        title: '资源名称',
        dataIndex: 'name',
        key:"name",
        render: (text,record, index) => <a href={record.url} target="_Blank" >{text}</a>
    }, {
        title: '作者',
        dataIndex: 'author',
        render: (text,record, index) => <a href={record.author_url} target="_Blank" >{text}</a>
    }, {
        title: '资源类型',
        dataIndex: 'type',
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
    ];*/

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
    }, {
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
    get_shopcar_data=(user_id)=>{
        axios.get(`Http://127.0.0.1:8000/item_cart/${user_id}`, {
            params: {

            }})
            .then( (response) =>{
                console.log(response);
                //设置购物车数据
                this.props.get_shopcar_data(response.data.item_list)
            })
            .catch(function (error) {
                console.log(error);
            })
            .then(function () {
                // always executed
            });
    }

    onSelectChange = (selectedRowKeys) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        //这里应该就是将state的选中数组绑定到表格的操作了
        this.props.set_selectedRowKeys(selectedRowKeys);
        console.log("选择项改变后的state长度为"+this.props.data.length)
    }

    //从服务器删除
    handleDelete = (key) => {
        console.log("你想删除"+key);
        console.log("你想删除的这个数据是：")
        console.log(this.props.data[key])
        let list=[];
        console.log("要删除的资源id：")
        console.log(this.props.data[key])
        list.push(this.props.data[key].resource_ID)
        axios.delete(`Http://127.0.0.1:8000/add_item_list/${this.props.user_id}/`, {
            data:{user_ID:this.props.user_id,
                item_list:[this.props.data[key].resource_ID]}
        })
            .then( (response) =>{
                console.log(response);
                //如果删除成功就刷新
                message.success("删除成功");
                //完成删除动作之后需要把选中数组也一起清空
                this.props.set_selectedRowKeys([]);
                //然后重新获取
                this.get_shopcar_data(this.props.user_id);
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
        let select_resource_idlist=[];
        //把需要删除的资源用key提取resource_ID，然后装进数组
        for (let i = 0; i <selectedRowKeys.length ; i++) {
            select_resource_idlist.push(this.props.data[selectedRowKeys[i]].resource_ID)
            /*console.log("看看里面resource_id有啥问题")
            console.log(this.props.data[selectedRowKeys[i]])*/
        }
        console.log("想要删除的id数组为：");
        console.log(select_resource_idlist);
        axios.delete(`Http://127.0.0.1:8000/add_item_list/${this.props.user_id}/`, {
            data: {
                user_ID: this.props.user_id,
                item_list:select_resource_idlist
            }
        })
            .then( (response) =>{
                console.log(response);
                //如果删除成功就刷新
                message.success("删除成功")
                //完成删除动作之后需要把选中数组也一起清空
                this.props.set_selectedRowKeys([]);
                //然后重新获取
                this.get_shopcar_data(this.props.user_id);

            })
            .catch(function (error) {
                console.log(error);
            })
            .then(function () {
                // always executed
            });
    }
    purchase=(selectedRowKeys)=>{
        console.log("你想支付");
        console.log(selectedRowKeys)
        let select_resource_idlist=[];
        let total_cost=0;
        //把需要结算的资源用key提取resource_ID，然后装进数组，顺便计算总价格
        for (let i = 0; i <selectedRowKeys.length ; i++) {
            select_resource_idlist.push(this.props.data[selectedRowKeys[i]].resource_ID);
            total_cost=total_cost+this.props.data[selectedRowKeys[i]].price
            console.log("看看里面price有啥问题")
            console.log(this.props.data[selectedRowKeys[i]])
        }
        console.log("想要支付的id数组为：");
        console.log(select_resource_idlist);
        axios.post(`Http://127.0.0.1:8000/purchase/${this.props.user_id}/`, {

                item_list:select_resource_idlist,
                total_cost:total_cost
        })
            .then( (response) =>{
                console.log(response);
                //如果结算成功就刷新
                message.success("结算成功")
                //完成结算动作之后需要把选中数组也一起清空
                this.props.set_selectedRowKeys([]);
                //然后重新获取
                this.get_shopcar_data(this.props.user_id);

            })
            .catch(function (error) {
                console.log(error);
            })
            .then(function () {
                // always executed
            });
    }

get_shopcar_data_test=()=>{

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

                    onClick={()=>{this.multiDelete(this.props.selectedRowKeys)}}
                    disabled={!hasSelected}
                    /*loading={loading}*/
                    style={{margin:"auto"}}
                >
                    批量删除
                </Button>
                <Button
                    type="primary"
                    onClick={()=>{this.purchase(this.props.selectedRowKeys)}}
                    disabled={!hasSelected}
                    /*loading={loading}*/
                    style={{margin:"auto"}}
                >
                    批量结算
                </Button>
                <button onClick={()=>{console.log(this.props.data)}}>输出state</button>
                <button onClick={()=>this.get_shopcar_data_test()}>初始化data</button>

            </div>
        );

}}

    function mapStateToProps(state)
{
    return{
        data:state.shopcar.data,
        selectedRowKeys:state.shopcar.selectedRowKeys,
        user_id:state.login.user_id
    }
}

    function mapDispatchToProps(dispatch){
    return{

        set_selectedRowKeys:(selectedRowKeys)=>{dispatch({type: "set_shopcar_selectedRowKeys",selectedRowKeys:selectedRowKeys})},
        get_shopcar_data:(data)=>{dispatch({type:"get_shopcar",data:data})}
    }
}
    ShopCar=connect(mapStateToProps,mapDispatchToProps)(ShopCar)
export default  ShopCar;