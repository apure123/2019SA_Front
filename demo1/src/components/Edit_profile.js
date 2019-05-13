import React, { Component } from 'react';
import {Button, Checkbox, Icon, Input,Form,Drawer,message} from "antd";
import "../App.css"
import {connect} from "react-redux";
import axios from "axios"
import Upload_avatar from "./Upload_avatar";


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


class Edit_profile extends Component{

    state = {
        confirmDirty: false,
        autoCompleteResult: [],
    };

    //验证老密码
    comfirmOldPassword=(rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== this.props.all_data.password) {
            callback('原密码输入不正确!');
        } else {
            callback();
        }
    }

    //密码框对应的方法
    validateToNextPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    }

    //确认密码框的方法
    compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('两次新密码输入不一致!');
        } else {
            callback();
        }
    }

    //确认密码框不聚焦时触发的方法
    //只要有输入就把confirmDirty设为真
    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    }


    //修改信息提交的方法，包含后续的关闭抽屉和重新加载个人信息
    Edit_Submit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                let newdata={};
                let au_data={};
                newdata.username=values.username;
                newdata.password=values.password;
                if(values.mail) {
                    newdata.email=values.mail;
                }else {
                    newdata.email=""
                }
                newdata.telephone=values.phone;
                newdata.Type=this.props.all_data.Type;
                if(this.props.all_data.Type=="E"){
                    au_data.introduction="";
                    if(values.introduction) {
                        au_data.introduction=values.introduction;
                    }
                    au_data.institute="";
                    if(values.institute){
                        au_data.institute=values.institute;
                    }
                    au_data.domain="";
                    if(values.domain){
                        au_data.domain=values.domain;
                    }

                    newdata.name=null;
                }else {

                }
                /*newdata.balance=this.props.all_data.balance;*/
                console.log("发送的参数：")
                console.log(newdata);
                axios.post(`Http://127.0.0.1:8000/api/profile/?token=${this.props.token}`,{data:newdata})
                    .then( (response) =>{
                        console.log(response);
                        if(response.data.detail)
                        {
                            message.error(response.data.detail)
                        }else {
                            message.success("个人信息设置成功");
                        }
                        //关闭抽屉
                        this.onClose();

                        //重新加载
                        this.get_profile_data();
                    })
                    .catch(function (error) {
                        console.log(error);
                    })
                    .then(function () {
                        // always executed
                    });
            }
        });

    }

    showDrawer = () => {
        this.setState({
            visible: true,
        });
    };

    //关闭抽屉
    onClose = () => {
        this.props.set_visible(false);
    };

    //从后端加载账户数据
    get_profile_data=()=>{

            axios.get(`Http://127.0.0.1:8000/api/profile/?token=${this.props.token}`
            )
                .then( (response) =>{
                    console.log(response);
                    this.props.set_profile_account(response.data.balance,response.data)

                })
                .catch(function (error) {
                    console.log(error);
                })
                .then(function () {
                    // always executed
                });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return(
            <div >
                <Drawer
                    title="修改个人信息"
                    width={720}
                    onClose={this.onClose}
                    visible={this.props.visible}
                >
                    <div style={{margin:"auto"}}>
                    <Upload_avatar/>
                    </div>
                <Form {...formItemLayout}  onSubmit={this.Edit_Submit}>

                    <Form.Item label={"用户名"} >
                        {getFieldDecorator('username', {
                            rules: [{
                                message: '请输入用户名!',
                            }, {
                                required: true, message: 'Please input your username!',
                            }],
                        })(
                            <Input placeholder={this.props.username} />
                        )}
                    </Form.Item>
                    <Form.Item
                        label="原密码"
                    >
                        {getFieldDecorator('oldpassword', {
                            rules: [{
                                required: true, message: '请输入原密码!',
                            }],
                        })(
                            <Input type="password" />
                        )}
                    </Form.Item>
                    <Form.Item
                        label="新密码"
                    >
                        {getFieldDecorator('password', {
                            rules: [{
                                required: true, message: '请输入新密码!',
                            }, {
                                validator: this.validateToNextPassword,
                            }],
                        })(
                            <Input type="password" />
                        )}
                    </Form.Item>

                    <Form.Item
                        label="确认密码"
                    >
                        {getFieldDecorator('confirm', {
                            rules: [{
                                required: true, message: '请再次输入您的密码!',
                            }, {
                                validator: this.compareToFirstPassword,
                            }],
                        })(
                            <Input type="password" onBlur={this.handleConfirmBlur} />
                        )}
                    </Form.Item>
                    <Form.Item
                        label="手机号"
                    >
                        {getFieldDecorator('phone', {
                            rules: [{ required: true, message: '请输入您的手机号码!' }],
                        })(
                            <Input  placeholder={this.props.all_data.telephone} ></Input>
                        )}
                    </Form.Item>
                    <Form.Item
                        label="邮箱"
                    >
                        {getFieldDecorator('mail')(
                            <Input  placeholder={this.props.all_data.mail} ></Input>
                        )}
                    </Form.Item>
                    {this.props.all_data.Type=="E"?
                        <div>
                            <Form.Item
                            label="简介"
                        >
                            {getFieldDecorator('introduction')(
                                <TextArea rows={4} placeholder={this.props.all_data.introduction} ></TextArea>
                            )}
                        </Form.Item>
                            <Form.Item
                                label="所属机构"
                            >
                                {getFieldDecorator('institute')(
                                    <Input  placeholder={this.props.all_data.institute} ></Input>
                                )}
                            </Form.Item>
                            <Form.Item
                                label="研究领域"
                            >
                                {getFieldDecorator('domain')(
                                    <Input  placeholder={this.props.all_data.domain} ></Input>
                                )}
                            </Form.Item>

                        </div>
                    :<div></div>
                    }

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
                            Cancel
                        </Button>
                        <Button  type="primary"  htmlType="submit"  >
                            Submit
                        </Button>

                    </div>
                </Form>

                </Drawer>


            </div>
        )
    }

}
function mapStateToProps(state)
{
    return{
        visible:state.editProfile.edit_visible,
        username:state.login.username,
        all_data:state.profile.all_data,
        token:state.login.token,
    }
}

function mapDispatchToProps(dispatch){
    return{

        set_visible:(flag)=>{dispatch({type:"edit_set_visible",visible:flag})},
        set_profile_account:(account,all_data)=>{dispatch(
            {type: "profile_set_account",account:account,all_data: all_data}
        )},

    }
}
Edit_profile=connect(mapStateToProps,mapDispatchToProps)(Edit_profile)
export default Form.create()(Edit_profile);