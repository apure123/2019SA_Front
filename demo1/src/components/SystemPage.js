import React, { Component } from 'react';
import { Layout, Menu, Icon,Avatar } from 'antd';
import routes, {routes2} from "../routes";
import {BrowserRouter as Router,Route,Link}from "react-router-dom"
import {close_regaction, quit_action} from "../redux/actions/reg_action";
import {connect} from "react-redux";
import {Redirect }from "react-router-dom"
import "../css/SysPage.css"
import axios from "axios";
import HeaderBar from "./HeaderBar/HeaderBar";



const { Header, Sider, Content ,Footer} = Layout;
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
    this.get_profile_data();
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
    get_profile_data=()=>{
        //profile_set_account
                                                        //?token=${token}
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


    render() {
        /*if (!this.props.loginflag)
        {
            return<Redirect to={"/"}/>
        }*/
        return(<div>
            <Layout style={{height:"100%"}}>


                <Layout style={{  }}>
                    <Header style={{ background: '#ffffff', padding: 0 }}>
                        {/*<Icon
                            className="trigger"
                            type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                            onClick={this.toggle}
                        />*/}
                       {/* <Avatar   src={this.props.avator_url} style={{display:"inline-block",margin:"10px"}}/>*/}
                       {/* <div style={{display:"flex",float:"right"}}>
                            <p>用户你好</p>
                            <p>nihao</p>
                            <p>nih  </p>
                            <p style={padding:"10px"}>{`${this.props.username}你好`}</p>
                            <a onClick={this.props.quit}>注销登录</a>
                        </div>*/}
                        <HeaderBar  />

                    </Header>
                    <Content style={{
                        /*margin: '24px 16px',*/ padding: 24, background: '#eff1f4', minHeight: 280, overflow: 'initial'
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
                    <Footer style={{ textAlign: 'center' }}>学术资源平台 ©2019 Created by ta说要划啊划 </Footer>
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
        is_expert:state.profile.all_data.is_expert,
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
