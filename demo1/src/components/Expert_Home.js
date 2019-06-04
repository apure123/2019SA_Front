import React, { Component } from 'react';
import {Card, Avatar, Table, Tag, List, Skeleton, Button,Drawer,Spin} from 'antd';
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
import User2Expert from "./PersonalInformation";
import User2Expert_inExpertHome from "./User2Expert_inExpertHome";


class Expert_Home extends Component{
    constructor(props) {
        super(props);
        const query = props.location.search// '?uid=123'
        const arr = query.split('=')
        const uid=arr[1]
        console.log(uid)
        //保存uid
        this.state={uid:uid,visible: false,spinning:true}
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
        title: '发布过的论文',
        dataIndex: 'name',
        key:"name",
        render: (text,record, index) => <Link to={`/system/article?uid=${record.uid}=P1`} >
            <p> {text}</p></Link>
    },  {
        title: '发布时间',
        dataIndex: 'year',
            render: (text) => <p>{text}</p>
    }
    ];
    columns2 = [
        {
            title: '发布过的专利',
            dataIndex: 'name',
            key:"name",
            render: (text,record, index) => <Link to={`/system/article?uid=${record.uid}=P2`} >
                <p> {text}</p></Link>
        },  {
            title: '发布时间',
            dataIndex: 'year',
            render: (text) => <p>{text}</p>
        }
    ];



    get_expert_data=(uid)=>{
        axios.get(`http://127.0.0.1:8000/api/au_profile/?uid=${uid}`)
            .then((response) =>{
                console.log(response);
                this.props.set_expert(response.data)

                this.setState({spinning:false})
            })
            .catch( (error)=>{
                console.log(error);

                this.setState({spinning:false})
            })
    }
    get_graph=(uid)=>{
        console.log("将要获取关系图数据 ")
        console.log(uid)
        axios.post("http://127.0.0.1:8000/api/CoGraph/",{uid:uid})
            .then((response) =>{
                console.log(response);
                this.props.set_relation_graph(response.data)
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    comfirm_button=()=>{
        if(this.props.loginflag){
            this.props.set_u2e_ine_visible(true)
        }else {
            alert("请先登录您的账号")
        }
    }

    render() {


        return(
            <Spin spinning={this.state.spinning}>
            <div style={{background: '#eff1f4'}}>


                <div style={{width:"78%",float:"left"}}>
                <Card bordered={false} style={{backgroundColor:"#fff"}}>
                <div className={"body"}>
                <div className={"person_image"}>
            <a href="javascript:;" className="person_portraitwr">
                {/*<img
                src={"/lib/static/scholar/cache/homepage/img/default_a139b75.png"} alt="学者头像" className="" width="112"
                height="112" />*/}
                <Avatar size={100} icon="user" />
            </a>
                    <Button style={{marginTop:"20px"}} onClick={()=>this.comfirm_button()}>我要认证</Button>
                </div>

                <div className="person_baseinfo" >
                    <div className="p_name">{this.props.expert.name}</div>
                    <div className="p_affiliate" ></div>
                    <ul className="p_ach_wr">
                        <li className="p_ach_item"><p className="p_ach_type c_gray">被引频次</p>
                            <p className="p_ach_num">{this.props.expert.ci_count_total}</p></li>
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
                <div style={{width:"70%",float:"left",display:"block"}}>
                <BizBasic/>
                </div>

                <div style={{height:"100%"}}>
                    <BizTest uid={this.state.uid}/>
                </div>
            </Card>

            <Card bordered={false} style={{backgroundColor:"#fff",marginTop:"24px"}}>
                <Table  columns={this.columns} dataSource={this.props.expert.publishes} pagination={{pageSize:7}} />
            </Card>
                    <Card bordered={false} style={{backgroundColor:"#fff",marginTop:"24px"}}>
                        <Table  columns={this.columns2} dataSource={this.props.expert.patent} pagination={{pageSize:7}} />
                    </Card>

                </div >
                <div style={{width:"20%",float:"right"}}>
                    <div   style={{backgroundColor:"#fff",padding:"24px"}} >

                        <List

                            /*itemLayout="horizontal"*/
                            dataSource={this.props.expert.coworkers}
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
                                                    title={<span style={{float:"left"}}>

                                                        <a onClick={()=>{
                                                            this.setState({spinning:true})
                                                            this.get_expert_data(item.uid)
                                                            this.setState({uid:item.uid})
                                                            this.get_graph(item.uid)
                                                        }}> {`${item.name}`}</a>
                                                    </span>}
                                                    avatar={<Avatar shape={"square"} icon="user" />}

                                    />



                                </List.Item>
                            )}
                        />
                    </div>
                </div>
                <User2Expert_inExpertHome/>
            </div>
            </Spin>
        )
    }
}

function mapStateToProps(state)
{
    return{
        expert:state.expert.expert,
        loginflag:state.login.loginflag,
        token:state.login.token,
        article_type:state.search.article_type,
        graph_expert_uid:state.relation_graph.uid
    }
}

function mapDispatchToProps(dispatch){
    return{
            set_expert:(expert_data)=>{dispatch({type:"set_expert",expert:expert_data})},
        set_uid:(uid)=>{dispatch({type:"set_expert_uid",uid:uid})},
        open_detail_coworkers:()=>{dispatch({type:"open_detail_coworkers"})},
        close_detail_coworkers:()=>{dispatch({type:"close_detail_coworkers"})},
        //用来显示升级为专家的抽屉
        set_u2e_ine_visible:(flag)=>{dispatch({type:"u2e_ine_set_visible",visible:flag})},
        set_relation_graph:(graph)=>{
            dispatch({type:"set_relation_graph",graph:graph})
        }

    }
}
Expert_Home=connect(mapStateToProps,mapDispatchToProps)(Expert_Home)
export default  Expert_Home;
