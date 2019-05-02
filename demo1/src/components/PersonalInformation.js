import React, { Component } from 'react';
import { Card, Icon, Avatar,Row,Col,Divider } from 'antd';
import {quit_action} from "../redux/actions/reg_action";
import {connect} from "react-redux";
import Edit_profile from "./Edit_profile";
import axios from "axios";

const pStyle = {
    fontSize: 16,
    color: 'rgba(0,0,0,0.85)',
    lineHeight: '24px',
    display: 'block',
    marginBottom: 16,
};

const DescriptionItem = ({ title, content }) => (
    <div
        style={{
            fontSize: 14,
            lineHeight: '22px',
            marginBottom: 7,
            color: 'rgba(0,0,0,0.65)',
        }}
    >
        <p
            style={{
                marginRight: 8,
                display: 'inline-block',
                color: 'rgba(0,0,0,0.85)',
            }}
        >
            {title}:
        </p>
        {content}
    </div>
);

class PersonalInformation extends Component{
    constructor(props) {
        super(props);
this.get_profile_data();
        console.log("先输出all_data：" );
        console.log(this.props.all_data)
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
render()
{
    const { Meta } = Card;
    return(
        <div>
        <Card
            style={{ width:"100%" ,margin:"auto"}}
            actions={[<a onClick={()=>this.props.set_visible(true)}> <Icon type="edit" /> 编辑</a>]}
        >
            <Meta
                avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                title={`${this.props.username}的个人信息`}
                description="This is the description"
            />

            <Row>
                <Col span={12}>
                    <DescriptionItem title="用户名" content={this.props.username} />
                </Col>
                <Col span={12}>
                    <DescriptionItem title="用户类型" content={this.props.all_data.user_type} />
                </Col>

            </Row>
            <Row>
                <Col span={24}>
                    <DescriptionItem
                        title="简介"
                        content={this.props.all_data.introduction}
                    />
                </Col>
            </Row>

            <Divider />
            <p style={pStyle}>联系方式</p>
            <Row>
                <Col span={12}>
                    <DescriptionItem title="邮箱" content={this.props.all_data.mail} />
                </Col>
                <Col span={12}>
                    <DescriptionItem title="手机号" content={this.props.all_data.telephone} />
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <DescriptionItem
                        title="Github"
                        content={(
                            <a href="http://github.com/ant-design/ant-design/">
                                github.com/ant-design/ant-design/
                            </a>
                        )}
                    />
                </Col>
            </Row>

            <Divider />
            {this.props.all_data.Type=="E"?
            <div>
                <p style={pStyle}>专家信息</p>
                <Row>
                    <Col span={12}>
                        <DescriptionItem title="所属机构" content={this.props.all_data.institute} />
                    </Col>
                    <Col span={12}>
                        <DescriptionItem title="研究领域" content={this.props.all_data.domain} />
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <DescriptionItem
                            title="简介"
                            content={this.props.all_data.introduction}
                        />
                    </Col>
                </Row>


            </div>
            :<div></div>
            }


            <hr/>
            <h2>学术动态</h2>
            <a ref={""}>震惊！99.99%的人都不知道的死法！</a><Icon type="star" />
        </Card>
        <Edit_profile/>
        </div>
    )
}
}


function mapStateToProps(state)
{
    return{
        username:state.login.username,
        all_data:state.profile.all_data,
        account:state.profile.account,
        user_id:state.login.user_id
    }
}

function mapDispatchToProps(dispatch){
    return{

        quit:()=>{dispatch(quit_action)},
        set_visible:(flag)=>{dispatch({type:"edit_set_visible",visible:flag})},
        set_profile_account:(account,all_data)=>{dispatch(
            {type: "profile_set_account",account:account,all_data: all_data}
        )}
    }
}
PersonalInformation=connect(mapStateToProps,mapDispatchToProps)(PersonalInformation)
export default PersonalInformation;