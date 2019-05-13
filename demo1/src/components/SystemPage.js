import React, { Component } from 'react';
import { Layout, Menu, Icon,Avatar } from 'antd';
import routes, {routes2} from "../routes";
import {BrowserRouter as Router,Route,Link}from "react-router-dom"
import {close_regaction, quit_action} from "../redux/actions/reg_action";
import {connect} from "react-redux";
import {Redirect }from "react-router-dom"
import "../css/SysPage.css"
import axios from "axios";


const { Header, Sider, Content } = Layout;
class SystemPage extends Component{
    constructor(props) {
        super(props);
        /*this.get_avator_url();*/

    }
    state = {
        collapsed: false,
    };
componentDidMount() {
    console.log(this.props.token)
    this.get_profile_data(this.props.token);
}

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }

    //从后端获取头像的函数
    get_avator_url=()=>{
        axios.get(`Http://127.0.0.1:8000/user_avator/${this.props.user_id}/`
        )
            .then( (response)=> {
                console.log("打印后端传来的头像数据")
                console.log(response);
                this.props.set_avator_url(response.data.avator);
            })
            .catch(function (error) {
                console.log(error);
            })

        //获取完成之后的redux内的头像url
        console.log("从后端获取完成之后的redux内的头像url");
        console.log(this.props.avator_url);
    }

    //从后端获取账户信息(包含用户id)
    get_profile_data=(token)=>{
        //profile_set_account

        axios.get(`Http://127.0.0.1:8000/api/profile?token=${token}`
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
        if (!this.props.loginflag)
        {
            return<Redirect to={"/"}/>
        }
        return(<div>
            <Layout style={{height:"100%",minHeight:"720px",background: "rgb(32,96,79)"}}>
                <Sider
                    trigger={null}
                    collapsible
                    collapsed={this.state.collapsed}
                    style={{background: "rgb(32,96,79)",height:"100%"}}
                >
                    <div className="logo" />
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} style={{background: "rgb(32,96,79)"}}>
                        <Avatar  size={64} src={this.props.avator_url} style={{display:"inline-block",margin:"10px"}}/>
                        <br/>

                        <p style={{padding:"10px"}}>{`${this.props.username}你好`}</p>
                        <a onClick={this.props.quit}>注销登录</a>
                        <div style={{margin:"10%",padding:"10%"}}></div>
                        <Menu.Item key="1" >
                            <Link to={"/system/"}>
                            <Icon type="home"/>
                            <span >首页</span>
                            </Link>
                        </Menu.Item>

                        <Menu.Item key="2">
                            <Link to={"/system/personalinformation"}>
                            <Icon type="user" />
                            <span>个人信息</span>
                            </Link>
                        </Menu.Item>

                        <Menu.Item key="3">
                            <Link to={"/system/star"}>
                            <Icon type="star" />
                            <span>我的收藏</span>
                            </Link>
                        </Menu.Item>

                        <Menu.Item key="4" >
                            <Link to={"/system/account"}>
                            <Icon type="wallet" />
                            <span>我的账户</span>
                            </Link>
                        </Menu.Item>

                        <Menu.Item key="5" >
                            <Link to={"/system/buyed"}>
                                <Icon type="read" />
                                <span>已购资源</span>
                            </Link>
                        </Menu.Item>

                        <Menu.Item key="6"disabled={!this.props.is_expert} title={ this.props.is_expert? "": "此功能只向专家用户开放"}>
                            <Link to={"/system/experthome"}>
                                <Icon type="solution" />
                                <span>个人门户</span>
                            </Link>
                        </Menu.Item>

                        <Menu.Item key="7" >
                            <Link to={"/system/shopcar"}>
                                <Icon type="shopping-cart" />
                                <span>购物车</span>
                            </Link>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{ background: '#ffffff', padding: 0 }}>
                        <Icon
                            className="trigger"
                            type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                            onClick={this.toggle}
                        />
                    </Header>
                    <Content style={{
                        margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280
                    }}
                    >
                        {
                            routes2.map((route,key)=>{
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
            </Layout>

        </div>)
    }

}


function mapStateToProps(state)
{
    return{
        loginflag:state.login.loginflag,
        username:state.login.username,
        is_expert:state.login.is_expert,
        avator_url:state.avator.avator_url,
        user_id:state.login.user_id,
        token:state.login.token
    }
}

function mapDispatchToProps(dispatch){
    return{

        quit:()=>{dispatch(quit_action)},
        set_avator_url:(url)=>{dispatch({type:"set_avator",url:url})},
        set_profile_account:(account,all_data)=>{dispatch(
            {type: "profile_set_account",account:account,all_data: all_data}
        )}
    }
}
SystemPage=connect(mapStateToProps,mapDispatchToProps)(SystemPage)
export default SystemPage;