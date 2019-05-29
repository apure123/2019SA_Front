import React, { Component } from 'react';
import {Card, Avatar, Table, Tag, List, Skeleton, Button,Drawer} from 'antd';
import "../css/Home.css"
import {connect} from "react-redux";
import SearchPage from "./SearchResult";
import  "../css/Expert_Home.css"
import Expert_echart from "./Echarts/Expert_echart";
import Coworkers_echart from "./Echarts/Coworkers_echart";
import BizTest from "./Charts/BizTest";
import BizBasic from "./Charts/BizBasic";
import axios from "axios"
import {Link} from "react-router-dom";
class Expert_Home extends Component{
    constructor(props) {
        super(props);
        const query = props.location.search// '?uid=123'
        const arr = query.split('=')
        const uid=arr[1]
        console.log(uid)
        //保存uid
        this.state={uid:uid,visible: false}
        this.props.set_uid(uid)
        this.get_expert_data(uid);
    }
    componentDidMount() {
        console.log("mount完成")
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log("组件已经更新")
    }
    componentWillUpdate(nextProps, nextState, nextContext) {
        console.log("组件即将更新")
    }

    columns = [
        {
        title: '发布过的资源',
        dataIndex: 'name',
        key:"name",
        render: (text,record, index) => <Link to={`/system/article?uid=${record.uid}`} target={"_blank"}>
            <p> {text}</p></Link>
    },  {
        title: '发布时间',
        dataIndex: 'year',
            render: (text) => <p>{text}</p>
    }
    ];

    showDrawer = () => {
        this.setState({
            visible: true,
        });
    };

    onClose = () => {
        this.setState({
            visible: false,
        });
    };

    get_expert_data=(uid)=>{
        axios.get(`http://127.0.0.1:8000/api/au_profile/?uid=${uid}`)
            .then((response) =>{
                console.log(response);
                this.props.set_expert(response.data)
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    render() {


        return(<div style={{background: '#eff1f4'}}>

                  {/*  <div style={{width:"100%",display:"flex"}}>
                <Card style={{display:"inline-block",width:"50%",float:"left"}}>
                <img   src={"http://img4.imgtn.bdimg.com/it/u=648251558,316969232&fm=26&gp=0.jpg"}
                      className={"intro"}
                />
                    <p>名字</p>
                    <p>研究领域</p>
                    <p>所属机构</p>
                </Card>
                        <Card style={{width:"50%",float:"right"}}>
                            <Expert_echart/>
                        </Card>
                    </div>
                <hr/>
                <Card style={{float:"left",width:"50%"}}>
                    <h2>资源</h2>
                </Card>
                <Card style={{float:"right",width:"50%"}}>
                    <h2>合作者</h2>
                    <Coworkers_echart/>
                </Card>*/}
                <Card bordered={false} style={{backgroundColor:"#fff"}}>
                <div className={"body"}>
                <div className={"person_image"}>
            <a href="javascript:;" className="person_portraitwr">
                {/*<img
                src={"/lib/static/scholar/cache/homepage/img/default_a139b75.png"} alt="学者头像" className="" width="112"
                height="112" />*/}
                <Avatar size={100} icon="user" />
            </a>
                </div>
                <div className="person_baseinfo" >
                    <div className="p_name">{this.props.expert.name}</div>
                    {/*<div className="p_volume">9191人看过</div>*/}
                    {/*<div className="p_scholarID">
                        <div className="p_scholarID_all">本站学术ID:<span className="p_scholarID_id">{this.props.expert.uid}</span>
                        </div>
                    </div>*/}
                    <div className="p_affiliate" ></div>
                    <ul className="p_ach_wr">
                        <li className="p_ach_item"><p className="p_ach_type c_gray">被引频次</p>
                            <p className="p_ach_num">4275</p></li>
                        <li className="p_ach_item"><p className="p_ach_type c_gray">成果数</p><p
                            className="p_ach_num">{this.props.expert.publishes.length}</p></li>
                        <li className="p_ach_item"><p className="p_ach_type c_gray">H指数</p><p
                            className="p_ach_num">{this.props.expert.h_index}</p></li>
                        <li className="p_ach_item"><p className="p_ach_type c_gray">G指数</p><p
                            className="p_ach_num">{this.props.expert.g_index}</p></li>
                    </ul>

                    <div className="person_editinfo">
                        <div style={{display:"flex"}}>
                            <span style={{marginRight:"5px"}}>领域:</span>
                            <span >
                            {this.props.expert.domains.map(function (value,key) {
                                return(<Tag >{value.name}</Tag>)
                            })}
                        </span>
                        </div>
                    </div>
                </div>
                </div>
                </Card>

            <Card bordered={false} style={{backgroundColor:"#fff",marginTop:"24px"}}>
                <div style={{width:"70%",float:"left"}}>
                <BizBasic/>
                </div>
                <div    style={{width:"20%",float:"right"}}>
                    <List

                        /*itemLayout="horizontal"*/
                        dataSource={this.props.expert.short_coworkers}
                        header={<div style={{display:"flex",textAlign:"center"}}>
                            <p style={{width:"100%"}}>合作者</p>

                        </div>}
                        /*footer={<div>
                            {this.props.expert.detail_coworkers_flag?<Button
                                onClick={()=>this.props.close_detail_coworkers}
                            >收起</Button>:
                            <Button onClick={this.props.open_detail_coworkers}>查看全部</Button>
                            }
                        </div>}*/
                        split={false}
                        renderItem={item => (
                            <List.Item

                            >
                                    <List.Item.Meta style={{width:"100%",float:"left"}}
                                                    title={<div style={{float:"left"}}>
                                                        <Link to={`/system/experthome?uid=${item.uid}`}
                                                            target={"_blank"}>
                                                        <p> {`${item.name}`}</p>
                                                    </Link></div>}
                                                    avatar={<Avatar shape={"square"} icon="user" />}

                                    />



                            </List.Item>
                        )}
                    />
                </div>
                <div style={{height:"100%"}}><BizTest uid={this.state.uid}/></div>
            </Card>
                <Drawer
                    title="Basic Drawer"
                    placement="top"
                    height={"700px"}
                    closable={true}
                    onClose={this.onClose}
                    visible={this.state.visible}
                >



                </Drawer>
            <Card bordered={false} style={{backgroundColor:"#fff",marginTop:"24px"}}>
                <Table  columns={this.columns} dataSource={this.props.expert.publishes} pagination={{pageSize:7}} />
            </Card>
            </div>
        )
    }
}

function mapStateToProps(state)
{
    return{
        expert:state.expert.expert
    }
}

function mapDispatchToProps(dispatch){
    return{
            set_expert:(expert_data)=>{dispatch({type:"set_expert",expert:expert_data})},
        set_uid:(uid)=>{dispatch({type:"set_expert_uid",uid:uid})},
        open_detail_coworkers:()=>{dispatch({type:"open_detail_coworkers"})},
        close_detail_coworkers:()=>{dispatch({type:"close_detail_coworkers"})}

    }
}
Expert_Home=connect(mapStateToProps,mapDispatchToProps)(Expert_Home)
export default  Expert_Home;
