import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom'
import {Table, Button, Menu,Dropdown} from 'antd';
import {quit_action} from "../../redux/actions/reg_action";
import {connect} from "react-redux";
class HeaderBar extends React.Component{
    constructor(props) {
        super(props);
    }



    render() {

        const menu = (
            <Menu className='menu'  mode="horizontal">
                {/*<Menu.ItemGroup title='用户中心' className='menu-group'  mode="horizontal">*/}
                    <Menu.Item>你好 - {"用户"}</Menu.Item>
                <Menu.Item><Link to={"/system/personalinformation/star"}>个人信息</Link></Menu.Item>
                    <Menu.Item><span onClick={()=>this.props.quit()} >退出登录</span></Menu.Item>
            </Menu>
        )
const menu2=(
    <Menu>
        <Menu.Item>个人设置</Menu.Item>
        <Menu.Item>系统设置</Menu.Item>
    </Menu>
)

        return(
        <div style={{float:"right", marginRight:"10px",padding:"5px"}}>
            {this.props.loginflag?<Dropdown overlay={menu} placement="bottomLeft">
                <Button icon={"user"}>{this.props.username}</Button>
            </Dropdown>:<Link to={"/"}><Button icon={"user"} >登录</Button></Link>

            }

        </div>
    )
    }
}

function mapStateToProps(state)
{
    return{
        loginflag:state.login.loginflag,
        username:state.login.username
    }
}

function mapDispatchToProps(dispatch){
    return{

        quit:()=>{dispatch(quit_action)}
    }
}
HeaderBar=connect(mapStateToProps,mapDispatchToProps)(HeaderBar)
export default HeaderBar
