import {Modal, Button, Form, Input, message} from 'antd';
import React, { Component } from 'react';
import {connect} from "react-redux";
import axios from "axios";
const { TextArea } = Input;
class Send_interest extends React.Component {
    state = {
        ModalText: 'Content of the modal',
        visible: false,
        confirmLoading: false,
        message:""
    };

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = () => {
        this.setState({
            ModalText: 'The modal will be closed after two seconds',
            confirmLoading: true,
        });
        if(this.props.article_type==="P1"){
            this.send_message(this.props.token,this.props.article.uid,this.state.message)
        }else {
            this.send_message(this.props.token,this.props.patent.uid,this.state.message)
        }

        setTimeout(() => {
            this.setState({
                visible: false,
                confirmLoading: false,
            });
        }, 500);
    };

    handleCancel = () => {
        console.log('Clicked cancel button');
        this.setState({
            visible: false,
        });
    };
    handleInput=(e)=>{
        this.setState({message:e.target.value})
    }
    send_message=(token,pid,Smessage)=>{

        axios({
            method:"post",
            url:"http://127.0.0.1:8000/api/interested/",
            data:{
                pid:pid,
                message:Smessage
            },
            headers:{
                "Authorization":`Token ${token}`,
                'Content-Type': 'application/json'
            }
        })
            .then( (response) =>{
                console.log(response);
                if (response.data.msg==="消息发送成功！"){
                    message.success("消息发送成功！")
                }else {message.error(response.data.msg)}
            })
            .catch(function (error) {
                console.log(error);
                message.error("发送消息失败")
            })
    }

    render() {
        const { visible, confirmLoading, ModalText } = this.state;
        return (
            <div style={{display:"flex"}}>
                <p>对这个资源感兴趣？尝试</p>
                <Button size={"small"}
                    onClick={()=>{
                    if (this.props.loginflag){
                        if(this.props.article_type==="P1"){
                            message.error("暂时只支持联系专利的作者")
                        }else {
                            this.showModal()
                        }

                    } else {message.error("请先登录您的账号")}

                }}>
                    联系作者
                </Button>
                <Modal
                    title="联系作者"
                    visible={visible}
                    onOk={this.handleOk}
                    confirmLoading={confirmLoading}
                    onCancel={this.handleCancel}
                >
                    <TextArea rows={4}
                    onChange={this.handleInput}
                              placeholder={"在这里留下你的联系方式吧"} />

                </Modal>
            </div>
        );
    }
}

function mapStateToProps(state)
{
    return{
        article_type:state.article.article_type,
        token:state.login.token,
        expert_email:state.expert.expert.email,
        article:state.article.article,
        patent:state.article.patent,
        loginflag:state.login.loginflag,
    }
}

function mapDispatchToProps(dispatch){
    return{

        set_visible:(flag)=>{dispatch({type:"u2e_ine_set_visible",visible:flag})},
        set_profile_account:(account,all_data)=>{dispatch(
            {type: "profile_set_account",account:account,all_data: all_data}
        )},
        set_expert_email:(email)=>{dispatch({type:"set_expert_email",email:email})}

    }
}
Send_interest=connect(mapStateToProps,mapDispatchToProps)(Send_interest)
export default Form.create()(Send_interest);
