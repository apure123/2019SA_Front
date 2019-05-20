import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom'
import {Table, Button, Menu,Dropdown} from 'antd';
class HeaderBar extends React.Component{
    constructor(props) {
        super(props);
    }



    render() {

        const menu = (
            <Menu className='menu'  mode="horizontal">
                {/*<Menu.ItemGroup title='用户中心' className='menu-group'  mode="horizontal">*/}
                    <Menu.Item>你好 - {"用户"}</Menu.Item>
                    <Menu.Item>个人信息</Menu.Item>
                    <Menu.Item><span /*onClick={this.logout}*/ >退出登录</span></Menu.Item>
               {/* </Menu.ItemGroup>*/}
                {/*<Menu.ItemGroup title='设置中心' className='menu-group'  mode="horizontal">
                    <Menu.Item>个人设置</Menu.Item>
                    <Menu.Item>系统设置</Menu.Item>
                </Menu.ItemGroup>*/}
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
            <Dropdown overlay={menu} placement="bottomLeft">
            <Button icon={"user"}>个人信息</Button>
        </Dropdown>
            <Dropdown overlay={menu2} placement="bottomLeft">
                <Button icon={"setting"}>设置</Button>
            </Dropdown>
        </div>
    )
    }
}
export default HeaderBar
