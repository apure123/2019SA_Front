import React, { Component } from 'react';
import { Card, Icon, Avatar,Row,Col,Divider,Layout,Breadcrumb,Menu } from 'antd';
import {quit_action} from "../redux/actions/reg_action";
import {connect} from "react-redux";
import {BrowserRouter as Router,Route,Link}from "react-router-dom"
import Edit_profile from "./Edit_profile";
import axios from "axios";
import User2Expert from "./User2Expert";
import {routes3} from "../routes";
import {Redirect }from "react-router-dom"

const { Header, Content, Footer } = Layout;
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

        axios.get(`Http://127.0.0.1:8000/api/profile`,{headers:{
                Authorization:`Token ${this.props.token}`
            }}
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
    if (!this.props.loginflag)
    {
        return<Redirect to={"/"}/>
    }
    const { Meta } = Card;
    return(
        <div>
            <div >
        <Card
            style={{ width:"28%" ,float:"left",marginRight:"2%"}}
            actions={this.props.all_data.Type=="E"? [<a onClick={()=>this.props.set_visible(true)}> <Icon type="edit" /> 编辑</a>]:
                [<a onClick={()=>this.props.set_visible(true)}> <Icon type="edit" /> 编辑</a>,
                    <a onClick={()=>this.props.set_u2e_visible(true)}> <Icon type="arrow-up" /> 申请成为专家</a>]}
        >
            <Meta
                /*avatar={<Avatar size={64} icon="user"  style={{margin:"auto"}}/>}*/
                /*title={`${this.props.username}的个人信息`}*/
            />
            <Avatar size={100} icon="user"  style={{margin:"auto"}}/>
            <br/>


            <Col span={24} >
            <Card  /*style={{height:"220px"}}*/ bordered={false}>
                <p style={pStyle}>基本信息</p>
                <Row >
                    <DescriptionItem title="用户名" content={this.props.username} />
            </Row>
            <Row>
                    <DescriptionItem title="用户类型" content={this.props.all_data.user_type} />
            </Row>
            </Card>
            </Col>

            <Col span={24}>
            <Card style={{}} bordered={false}>
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
            <Col span={24} >
            <Card style={{display:"block"/*,background: '#ECECEC'*/}} bordered={false}>
            <p style={pStyle}>联系方式</p>
            <Row>

                    <DescriptionItem title="邮箱" content={this.props.all_data.email} />

            </Row>
            <Row>

                    <DescriptionItem title="手机号" content={this.props.all_data.telephone} />

            </Row>
            {/*<Row>
                    <DescriptionItem
                        title="Github"
                        content={(
                            <a href="http://github.com/ant-design/ant-design/">
                                github.com/ant-design/ant-design/
                            </a>
                        )}
                    />
            </Row>*/}
            </Card>
            </Col>

            {this.props.all_data.Type=="E"?
            <div>
                <Col span={24} >
                <Card style={{display:"block"}}>
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
                <Card style={{ width:"70%", float:"right",margin:"auto"}}>
                    <Layout>
                        <Header style={{  zIndex: 1, width: '100%',padding:"0px" }}>

                            <Menu
                                theme="light"
                                mode="horizontal"
                                defaultSelectedKeys={['1']}
                                style={{ lineHeight: '64px',width:"100%" }}
                            >
                                <Menu.Item key="1">
                                    <Link to={"/system/personalinformation/star"}>
                                        <span>我的收藏</span>
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key="2"><Link to={"/system/personalinformation/buyed"}>
                                    <span>已购买</span>
                                </Link></Menu.Item>
                                <Menu.Item key="3">
                                    <Link to={"/system/personalinformation/profile"}>
                                        <span>账户信息</span>
                                    </Link>
                                </Menu.Item>
                            </Menu>
                        </Header>
                        <Content style={{ padding: '0 0px', marginTop: 0 }}>
                            {
                                routes3.map((route,key)=>{
                                    if(route.exact){
                                        return <Route key={key} exact path={route.path} component={route.component} />
                                    }
                                    else {
                                        return <Route key={key}  path={route.path} component={route.component} />
                                    }
                                })
                            }

                        </Content>
                    </Layout>
                </Card>
            </div>




        <Edit_profile/>
        <User2Expert/>
        </div>
    )
}
}


function mapStateToProps(state)
{
    return{
        loginflag:state.login.loginflag,
        username:state.login.username,
        all_data:state.profile.all_data,
        account:state.profile.account,
        token:state.login.token,
    }
}

function mapDispatchToProps(dispatch){
    return{

        quit:()=>{dispatch(quit_action)},
        set_visible:(flag)=>{dispatch({type:"edit_set_visible",visible:flag})},
        set_u2e_visible:(flag)=>{dispatch({type:"u2e_set_visible",visible:flag})},
        set_profile_account:(account,all_data)=>{dispatch(
            {type: "profile_set_account",account:account,all_data: all_data}
        )}
    }
}
PersonalInformation=connect(mapStateToProps,mapDispatchToProps)(PersonalInformation)
export default PersonalInformation;
