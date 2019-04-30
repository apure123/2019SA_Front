import React, { Component } from 'react';
import {Button, Col, Row, Statistic} from "antd";
import {connect} from "react-redux";
import axios from "axios";

class MyAccount extends Component{
    constructor(props) {
        super(props);
        this.get_profile_data()
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
    render() {
        return(<div>
            <p>我的账户</p>
            <Row gutter={16}>
                <Col span={12}>
                    <Statistic title="积分" value={this.props.account} />
                </Col>
                <Col span={12}>
                    {/*<Statistic title="用户余额 (CNY)" value={112893} precision={2} />*/}
                    <Button style={{ marginTop: 16 }} type="primary">充值</Button>
                    <Button onClick={()=>this.get_profile_data()}>获取数据</Button>
                </Col>
            </Row>
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
export default MyAccount;