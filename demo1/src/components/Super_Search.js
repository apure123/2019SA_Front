import React, { Component } from 'react';
import {quit_action} from "../redux/actions/reg_action";
import {connect} from "react-redux";
import {Select, Input, message, Form} from "antd";
import Register from "./Register";
import {isDimensionStacked} from "echarts/src/data/helper/dataStackHelper";
import axios from "axios";

const Option = Select.Option;

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
    },
    wrapperCol: {
        xs: {span: 24},
        sm: {span: 10},
    }
};
class Super_Search extends Component{

    search=(value)=>{
        console.log(value);
        if(this.props.search_type=="super"){
            //高级搜索
            this.super_search();
            this.props.dis_res(value)//把要搜索的关键字设进redux数据里
        }else {
            if(value!=""){
                //
                if(this.props.search_type=="title"){
                    this.search_title(value);

                }else if(this.props.search_type=="author"){
                    this.search_author(value);
                }else console.log("出现错误！")
                this.props.dis_res(value)//把要搜索的关键字设进redux数据里
            }
            else console.log("搜索框的输入不能为空")
        }
    }

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

    search_author=(value)=>{
        axios.post(`http://127.0.0.1:8000/api/search/`, {
            field:"Author",
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

    super_search=()=>{
        axios.post(`http://127.0.0.1:8000/api/advsearch/`, {
            title:this.props.form.getFieldValue("title")?this.props.form.getFieldValue("title"):"",
            author:this.props.form.getFieldValue("author")?this.props.form.getFieldValue("author"):"",
            type:"P1",
            keyword:this.props.form.getFieldValue("keyword")?this.props.form.getFieldValue("keyword"):"",
            time_low:this.props.form.getFieldValue("time_low")?this.props.form.getFieldValue("time_low"):"",
            time_high:this.props.form.getFieldValue("time_high")?this.props.form.getFieldValue("time_high"):""
        })
            .then( (response) =>{
                console.log(response);
                this.props.set_search_result_data(response.data.result);
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    handleChange=(value) =>{
        console.log(`selected ${value}`);
        if(value=="super"){
            this.props.open_super_search();
        }
        else {
            this.props.close_super_search();
        }
        this.props.set_search_type(value);
    }


    render() {
        const { getFieldDecorator } = this.props.form;
        return(<div>
        <h2>资源检索</h2>
        <Select defaultValue={this.props.search_type} style={{ width: 120 }} onChange={this.handleChange}
                size={"large"}>
            <Option value="title">标题</Option>
            <Option value="author">作者</Option>
            <Option value="super">高级</Option>

        </Select>
        <Input.Search
            placeholder="请输入关键字"
            defaultValue={this.props.keyword}
            enterButton="检索"
            size="large"
            onSearch={value => this.search(value)}
            style={{width:'50%'}}
        />
        <div style={{width:"10%",float:"right"}}>

        </div>
        {this.props.super_search_flag?<div>
            <Form {...formItemLayout}  >
                <br/>
                <br/>
                <Form.Item label={"题目"} >
                    {getFieldDecorator('title', {
                        rules: [],
                    })(
                        <Input />
                    )}
                </Form.Item>
                <Form.Item label={"关键词"} >
                    {getFieldDecorator('keyword', {
                        rules: [],
                    })(
                        <Input />
                    )}
                </Form.Item>
                <Form.Item label={"作者"} >
                    {getFieldDecorator('author', {
                        rules: [],
                    })(
                        <Input />
                    )}
                </Form.Item>
                <Form.Item label={"发布时间从"} >
                    {getFieldDecorator('time_low', {
                        rules: [],
                    })(
                        <Input />
                    )}
                </Form.Item>
                <Form.Item label={"到"} >
                    {getFieldDecorator('time_high', {
                        rules: [],
                    })(
                        <Input />
                    )}
                </Form.Item>

            </Form>
        </div>:<div></div>}

        </div>)
    }
}

function mapStateToProps(state)
{
    return{
        keyword:state.search.keyword,
        dissearch_flag:state.search.dis_flag,
        super_search_flag:state.search.super_search_flag,
        super_search_filed:state.search.super_search_filed,
        search_type:state.search.search_type
    }
}

function mapDispatchToProps(dispatch){
    return{

        dis_res:(keyword)=>{dispatch({type:"search",keyword:keyword})},
        init:()=>{dispatch({type:"search_init"})},
        open_super_search:()=>{dispatch({type:"open_super_search"})},
        close_super_search:()=>{dispatch({type:"close_super_search"})},
        set_search_type:(search_type)=>{dispatch({type:"set_search_type",search_type:search_type})},
        set_search_result_data:(list)=>{dispatch({type:"search_load",list:list})}
    }
}
Super_Search=connect(mapStateToProps,mapDispatchToProps)(Super_Search)
export default Form.create()(Super_Search);
