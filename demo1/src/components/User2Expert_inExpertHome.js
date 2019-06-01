import React, { Component } from 'react';
import {Button, Checkbox, Icon, Input, Form, Drawer, message, Col, Row} from "antd";
import "../App.css"
import {connect} from "react-redux";
import axios from "axios"
import Upload_avatar from "./Upload_avatar";
import {Redirect }from "react-router-dom"

const { TextArea } = Input
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
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 4,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};


class User2Expert_inExpertHome extends Component{

    state = {
        confirmDirty: false,
        autoCompleteResult: [],
    };

    //发送验证码
    send_code=()=>{
        this.props.form.validateFields((err, values) => {

            console.log('Received values of form: ', values);
            axios({
                method:"put",
                url:"http://127.0.0.1:8000/api/profile/",
                data:{"uid":this.props.expert_uid},
                headers:{
                    "Authorization":`Token ${this.props.token}`,
                    "Content-Type":"application/json"
                }
            })
                .then( (response) =>{
                    console.log(response);
                    if (response.data.email){
                        message.success("验证码已发送至您的邮箱:"+response.data.email)
                        this.props.set_expert_email(response.data.email)
                    }
                })
                .catch(function (error) {
                    console.log(error);
                    message.error("验证码发送失败")
                })


        });
    }

    //修改信息提交的方法，包含后续的关闭抽屉和重新加载个人信息
    u2e_Submit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);

                axios.post("http://127.0.0.1:8000/api/verify/",{data:{
                        email:this.props.expert_email,
                        token:values.code,
                        username:this.props.username
                    }})
                    .then( (response) =>{
                        console.log(response);
                        if(response.data.msg=="申请成功"){
                            message.success("申请成功");
                            this.onClose();
                        }else {message.error(response.data.msg)}

                    })
                    .catch(function (error) {
                        console.log(error);
                        message.error("验证码错误，请重新输入！")
                    })
                    .then(function () {
                        // always executed
                    });
            }
        });

    }


    //关闭抽屉
    onClose = () => {
        this.props.set_visible(false);
    };


    render() {


        const { getFieldDecorator } = this.props.form;
        return(
            <div >
                <Drawer
                    title="认证为专家"
                    width={720}
                    onClose={this.onClose}
                    visible={this.props.visible}
                >

                    <div style={{margin:"auto"}} align="ceter">
                        <Button onClick={()=>{this.send_code()}}>获取验证码</Button>
                    </div>
                    <Form {...formItemLayout}  onSubmit={this.u2e_Submit}>
                        <Form.Item label={"验证码"} >
                            {getFieldDecorator('code', {
                                rules: [{
                                    message: '请输入我们发送至您邮箱的验证码!',
                                }, {
                                    required: true, message: '请输入我们发送至您邮箱的验证码 !',
                                }],
                            })(
                                <Input  />
                            )}
                        </Form.Item>
                        <div
                            style={{
                                position: 'absolute',
                                left: 0,
                                bottom: 0,
                                width: '100%',
                                borderTop: '1px solid #e9e9e9',
                                padding: '10px 16px',
                                background: '#fff',
                                textAlign: 'right',
                            }}
                        >
                            <Button onClick={this.onClose} style={{ marginRight: 8 }}>
                                取消
                            </Button>
                            <Button  type="primary"  htmlType="submit"  >
                                提交
                            </Button>

                        </div>
                        {/*</Form.Item>*/}
                    </Form>
                </Drawer>


            </div>
        )
    }

}
function mapStateToProps(state)
{
    return{
        visible:state.u2e_ine.u2e_visible,
        username:state.login.username,
        all_data:state.profile.all_data,
        token:state.login.token,
        expert_uid:state.expert.expert.uid,
        expert_email:state.expert.expert.email
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
User2Expert_inExpertHome=connect(mapStateToProps,mapDispatchToProps)(User2Expert_inExpertHome)
export default Form.create()(User2Expert_inExpertHome);
