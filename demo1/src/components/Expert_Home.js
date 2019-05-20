import React, { Component } from 'react';
import {Card, Avatar, Table, Tag} from 'antd';
import "../css/Home.css"
import {connect} from "react-redux";
import SearchPage from "./SearchResult";
import  "../css/Expert_Home.css"
import Expert_echart from "./Echarts/Expert_echart";
import Coworkers_echart from "./Echarts/Coworkers_echart";
import BizTest from "./Charts/BizTest";
import BizBasic from "./Charts/BizBasic";
class Expert_Home extends Component{
    constructor(props) {
        super(props);

    }
    columns = [{
        title: '资源名称',
        dataIndex: 'title',
        key:"name",
        render: (text,record, index) => <a href={record.url} target="_Blank" >{text}</a>
    },  {
        title: '资源类型',
        dataIndex: 'Type',
        render: type => (
            <span>
      <Tag color={'geekblue'} >{type}</Tag>
    </span>
        ),
    },{
        title: '价格',
        dataIndex: 'price',
        key:"price",
        render: (text) => <p>{text}</p>
    }
    ];

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
                    <div className="p_name">胡晓峰</div>
                    <div className="p_volume">9191人看过</div>
                    <div className="p_scholarID">
                        <div className="p_scholarID_all">ScholarID:<span className="p_scholarID_id">CN-BG739SGJ</span>
                        </div>
                    </div>
                    <div className="p_affiliate" >国防大学信息作战与指挥训练教研部</div>
                    <ul className="p_ach_wr">
                        <li className="p_ach_item"><p className="p_ach_type c_gray">被引频次</p>
                            <p className="p_ach_num">4275</p></li>
                        <li className="p_ach_item"><p className="p_ach_type c_gray">成果数</p><p
                            className="p_ach_num">395</p></li>
                        <li className="p_ach_item"><p className="p_ach_type c_gray">H指数</p><p
                            className="p_ach_num">31</p></li>
                        <li className="p_ach_item"><p className="p_ach_type c_gray">G指数</p><p
                            className="p_ach_num">51</p></li>
                    </ul>

                    <div className="person_editinfo">
                        <div className=""><span className="c_gray prefix_label">领域:</span><span
                            className="person_domain person_text"><a
                            href="//xueshu.baidu.com/s?wd=%E6%88%98%E7%95%A5%E3%80%81%E6%88%98%E5%BD%B9%E3%80%81%E6%88%98%E6%9C%AF%E5%AD%A6&amp;tn=SE_baiduxueshu_c1gjeupa&amp;ie=utf-8"
                            target="_blank">战略、战役、战术学</a></span></div>
                    </div>
                </div>
                </div>
                </Card>

            <Card bordered={false} style={{backgroundColor:"#fff",marginTop:"24px"}}>
                <BizBasic/>
                <BizTest/>
            </Card>
            <Card bordered={false} style={{backgroundColor:"#fff",marginTop:"24px"}}>
                <Table  columns={this.columns} dataSource={this.props.data} pagination={{pageSize:7}} />
            </Card>
            </div>
        )
    }
}

function mapStateToProps(state)
{
    return{
        dissearch_flag:state.search.dis_flag,
    }
}

function mapDispatchToProps(dispatch){
    return{

        dis_res:(keyword)=>{dispatch({type:"search",keyword:keyword})},
        init:()=>{dispatch({type:"search_init"})}
    }
}
Expert_Home=connect(mapStateToProps,mapDispatchToProps)(Expert_Home)
export default  Expert_Home;
