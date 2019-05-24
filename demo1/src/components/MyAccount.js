import React, { Component } from 'react';
import {Button, Col, Row, Statistic, Modal, Input, Form} from "antd";
import {connect} from "react-redux";
import axios from "axios";
import echart from "./echart";
import echarts from 'echarts/lib/echarts';
import EchartsTest from "./echart"

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


class MyAccount extends React.Component{
    constructor(props) {
        super(props);
        this.get_profile_data();

    }
componentDidMount() {

}

  get_profile_data=()=>{
        //profile_set_account

        axios.get(`Http://127.0.0.1:8000/profile/${this.props.user_id}/`
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
    state = { visible: false }

    showModal = () => {
        this.setState({
            visible: true,
        });
    }

    handleOk = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
        console.log("输入的卡密：");

    }

    handleCancel = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    }
    recharge=()=>{
        console.log("输入的卡密：")
        console.log(this.props.form.getFieldValue("rechargeCode"))
    }
    render() {
        return(<div style={{padding:"18px"}}>
            <h2>我的账户</h2>
            <Row gutter={16}>
                <Col span={12}>
                    <Statistic title="积分" value={this.props.account} />
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    {/*<Statistic title="用户余额 (CNY)" value={112893} precision={2} />*/}
                    <Button style={{ marginTop: 16 }} type="primary" onClick={this.showModal}>充值</Button>
                    <Button onClick={()=>this.get_profile_data()}>获取数据</Button>
                </Col>
            </Row>
            <Modal
                title="余额充值"
                visible={this.state.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                style={{textAlign:"center"}}
            >
                <Form {...formItemLayout}  onSubmit={()=>this.registerSubmit_test}>

                    <Form.Item label={"卡密"} >
                        {this.props.form.getFieldDecorator('rechargeCode', {
                            rules: [{
                                required: true, message: '请输入兑换卡密!',
                            }],
                        })(
                            <Input />
                        )}
                    </Form.Item>
                    <Button  onClick={()=>this.recharge()}  >兑换卡密</Button>
                </Form>
            </Modal>

        </div>)
    }

}
function mapStateToProps(state)
{
    return{
        account:state.profile.account,
        user_id:state.login.user_id
    }
}

function mapDispatchToProps(dispatch){
    return{

        set_profile_account:(account,all_data)=>{dispatch(
            {type: "profile_set_account",account:account,all_data: all_data}
            )},

    }
}
MyAccount=connect(mapStateToProps,mapDispatchToProps)(MyAccount)
export default  Form.create()(MyAccount);
