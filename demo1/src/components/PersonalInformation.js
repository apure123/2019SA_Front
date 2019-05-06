import React, { Component } from 'react';
import { Card, Icon, Avatar,Row,Col,Divider } from 'antd';
import {quit_action} from "../redux/actions/reg_action";
import {connect} from "react-redux";
import Edit_profile from "./Edit_profile";
import axios from "axios";

const pStyle = {
    fontSize: 18,
    color: 'rgba(0,0,0,0.95)',
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
            float:"left"
        }}
    >
        <p
            style={{
                marginRight: 8,
                display: 'inline-block',
                color: 'rgba(0,0,0,0.85)',
                float:"left"
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
            <div >
        <Card
            style={{ width:"100%" ,margin:"auto"}}
            actions={this.props.all_data.Type=="E"? [<a onClick={()=>this.props.set_visible(true)}> <Icon type="edit" /> 编辑</a>]:
                [<a onClick={()=>this.props.set_visible(true)}> <Icon type="edit" /> 编辑</a>,
                    <a onClick={()=>alert("即将进入专家申请页")}> <Icon type="arrow-up" /> 申请成为专家</a>]}
        >
            <Meta
                avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                title={`${this.props.username}的个人信息`}

            />
            <br/>
            <br/>

            <Col span={12} >
            <Card  style={{height:"220px"}}>
                <p style={pStyle}>基本信息</p>
                <Row >
                    <DescriptionItem title="用户名" content={this.props.username} />
            </Row>
            <Row>
                    <DescriptionItem title="用户类型" content={this.props.all_data.user_type} />
            </Row>
            </Card>
            </Col>

            <Col span={12}>
            <Card style={{height:"220px",background: '#ECECEC'}}>
                <p style={pStyle}>简介</p>
            <Row >
                    <DescriptionItem
                        title="简介"
                        content={this.props.all_data.introduction}
                    />

            </Row>
            </Card>
            </Col>

            {/*<Divider />*/}
            <Col span={12} >
            <Card style={{display:"block",background: '#ECECEC',height:"220px"}}>
            <p style={pStyle}>联系方式</p>
            <Row>

                    <DescriptionItem title="邮箱" content={this.props.all_data.mail} />

            </Row>
            <Row>

                    <DescriptionItem title="手机号" content={this.props.all_data.telephone} />

            </Row>
            <Row>
                    <DescriptionItem
                        title="Github"
                        content={(
                            <a href="http://github.com/ant-design/ant-design/">
                                github.com/ant-design/ant-design/
                            </a>
                        )}
                    />
            </Row>
            </Card>
            </Col>

            {this.props.all_data.Type=="E"?
            <div>
                <Col span={12} >
                <Card style={{display:"block",height:"220px"}}>
                    <p style={pStyle}>专家信息</p>
                <Row>
                        <DescriptionItem title="所属机构" content={this.props.all_data.institute} />
                </Row>
                <Row>
                        <DescriptionItem title="研究领域" content={this.props.all_data.domain} />
                </Row>
                <Row>
                        <DescriptionItem
                            title="简介"
                            content={this.props.all_data.introduction}
                        />
                </Row>
                </Card>
                </Col>
            </div>
            :<div></div>
            }
        </Card>
            </div>

            <hr/>
            <h2>学术动态</h2>
            <a ref={""}>震惊！99.99%的人都不知道的死法！</a><Icon type="star" />


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