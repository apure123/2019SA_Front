import {Modal, Button, Form, Input, message} from 'antd';
import React, { Component } from 'react';
import {connect} from "react-redux";
import axios from "axios";
const { TextArea } = Input;
class Reply_interest extends React.Component {
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
            this.send_message(this.props.token,this.props.message_id,this.state.message)
        setTimeout(() => {
            this.setState({
                visible: false,
                confirmLoading: false,

            });
        }, 500);

        this.props.set_visible(false)

    };

    handleCancel = () => {
        console.log('Clicked cancel button');
        this.setState({
            visible: false,
        });
        this.props.set_visible(false)
    };
    handleInput=(e)=>{
        this.setState({message:e.target.value})
    }
    send_message=(token,message_id,Smessage)=>{

        axios({
            method:"post",
            url:"http://127.0.0.1:8000/api/reply/",
            data:{
                id:message_id,
                message:Smessage
            },
            headers:{
                "Authorization":`Token ${token}`,
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
        const {  confirmLoading, ModalText } = this.state;
        return (
            <div style={{display:"flex"}}>

                <Modal
                    title="联系作者"
                    visible={this.props.visible}
                    onOk={this.handleOk}
                    confirmLoading={confirmLoading}
                    onCancel={this.handleCancel}
                >
                    <TextArea rows={4}
                              onChange={this.handleInput}
                              placeholder={"在这里留下你的回复吧"} />

                </Modal>
            </div>
        );
    }
}

function mapStateToProps(state)
{
    return{

        token:state.login.token,
        expert_email:state.expert.expert.email,

        loginflag:state.login.loginflag,
        visible:state.reply.visible,
        message_id:state.reply.message_uid
    }
}

function mapDispatchToProps(dispatch){
    return{

        set_visible:(flag)=>{dispatch({type:"set_reply_visible",visible:flag})},
        set_profile_account:(account,all_data)=>{dispatch(
            {type: "profile_set_account",account:account,all_data: all_data}
        )},
        set_expert_email:(email)=>{dispatch({type:"set_expert_email",email:email})}

    }
}
Reply_interest=connect(mapStateToProps,mapDispatchToProps)(Reply_interest)
export default Form.create()(Reply_interest);
