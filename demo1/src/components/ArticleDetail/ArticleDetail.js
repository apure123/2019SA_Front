import React, { Component } from 'react';
import  "./ArticleDetail.css"
import {Card, Layout, Tag,Menu} from "antd"

import {Link} from "react-router-dom";
import {routes3} from "../../routes";
const { Header, Content, Footer } = Layout;

class ArticleDetail extends Component{


    render() {
        return(
            <div className={"body"}>
                <div id="dtl_l">


                    <div className="main-info">

                        <h2>
                            <a href="http://www.cqvip.com/QK/72137X/201501/667162866.html"
                               data-click="{'act_block':'main','button_tp':'title'}" target="_blank">语言运用与意识双重结构</a>
                        </h2>
                        <div className="c_content" data-click="{'act_block': 'main'}">
                            <div className="love_wr">
                                <div className="label-ll">
                                    <span>来自</span>
                                    <a href="http://www.cqvip.com/QK/72137X/201501/667162866.html" target="_blank"
                                       data-click="{'button_tp': 'from_nm'}">维普</a>
                                    <span className="love_wr_distr"></span>
                                </div>
                                <div className="label-l">
                                    <a href="javascript:;" className="love-wr-link"
                                       data-click="{'button_tp': 'like', 'fm': 'beha'}" data-isliked="false">
                                        <i className="iconfont love-wr-icon"
                                           style={{top: "1px", color: "rgb(153, 153, 153)"}}></i>
                                        <span className="like-amount-txt">喜欢</span>
                                        <span className="like-amount-num">0</span>
                                    </a>
                                </div>
                                <div className="label-r">
                                    <p className="">阅读量：</p>
                                    <p>14</p>
                                </div>
                            </div>
                            <div className="author_wr">
                                <p className="label">作者：</p>
                                <p className="author_text">
                                    <span><a
                                        href="//xueshu.baidu.com/s?wd=author%3A%28%E5%BE%90%E7%9B%9B%E6%A1%93%29%20%E6%B2%B3%E5%8D%97%E5%A4%A7%E5%AD%A6%E5%A4%96%E8%AF%AD%E5%AD%A6%E9%99%A2&amp;tn=SE_baiduxueshu_c1gjeupa&amp;ie=utf-8&amp;sc_f_para=sc_hilight%3Dperson"
                                        target="_blank" className="" data-click="{'button_tp':'author'}">徐盛桓</a></span>
                                </p>
                            </div>
                            <div className="abstract_wr" data-shorth="">
                                <p className="label">摘要：</p>
                                <p className="abstract" data-sign="">摘 要：
                                    ＂语言运用意识双重结构理论模型＂是心智哲学对语言研究的一种进路,认为语言运用的基底是意识活动,因此语言研究——包括同语言运用有关的语言现象研究、文学语言研究、翻译研究、语言教学研究等等——必定以意识活动作为基础性机制。语言最基本的性质是语言是基于心智的;感知觉信息的表达是语言运用的基础;语言所表征的是心理的表征,因此语言运用中的意识研究是语言心智研究的核心内容,而对感觉感受的研究又是研究的基础。从研究语言习得来说,＂语言运用意识双重结构理论模型＂正是要说明是从基于使用来习得语言的。</p>
                                <p className="abstract_more OP_LOG_BTN" data-open="1"
                                   data-click="{'button_tp':'abstract_more','fm':'beha'}"><span>展开</span><i
                                    className="iconfont"></i></p>
                            </div>
                            <div className="kw_wr">
                                <p className="label">关键词：</p>
                                <p className="kw_main" data-click="{'button_tp':'keyword'}">
                                    <span><a
                                        href="http://xueshu.baidu.com/s?wd=%E6%84%8F%E8%AF%86%E5%8F%8C%E9%87%8D%E7%BB%93%E6%9E%84%E7%90%86%E8%AE%BA%E6%A8%A1%E5%9E%8B&amp;tn=SE_baiduxueshu_c1gjeupa&amp;ie=utf-8"
                                        target="_blank" className="">意识双重结构理论模型</a></span>
                                    <span><a
                                        href="http://xueshu.baidu.com/s?wd=%E5%9F%BA%E4%BA%8E%E4%BD%BF%E7%94%A8&amp;tn=SE_baiduxueshu_c1gjeupa&amp;ie=utf-8"
                                        target="_blank" className="">基于使用</a></span>
                                    <span><a
                                        href="http://xueshu.baidu.com/s?wd=%E6%9C%AC%E4%BD%93%E7%BB%93%E6%9E%84-%E6%91%B9%E7%8A%B6%E7%BB%93%E6%9E%84&amp;tn=SE_baiduxueshu_c1gjeupa&amp;ie=utf-8"
                                        target="_blank" className="">本体结构-摹状结构</a></span>
                                    <span><a
                                        href="http://xueshu.baidu.com/s?wd=%E6%84%8F%E5%90%91%E6%80%A7&amp;tn=SE_baiduxueshu_c1gjeupa&amp;ie=utf-8"
                                        target="_blank" className="">意向性</a></span>
                                    <span><a
                                        href="http://xueshu.baidu.com/s?wd=%E6%A0%BC%E5%BC%8F%E5%A1%94%E8%BD%AC%E6%8D%A2&amp;tn=SE_baiduxueshu_c1gjeupa&amp;ie=utf-8"
                                        target="_blank" className="">格式塔转换</a></span>
                                    <span><a
                                        href="http://xueshu.baidu.com/s?wd=%E6%84%8F%E8%B1%A1%E5%A1%91%E5%BD%A2&amp;tn=SE_baiduxueshu_c1gjeupa&amp;ie=utf-8"
                                        target="_blank" className="">意象塑形</a></span>
                                </p>
                            </div>
                            <div className="ref_wr">
                                <p>被引量：</p>
                                <p className="ref-wr-num">
                                    <a href="http://xueshu.baidu.com/s?wd=refpaperuri:(5f06ac08957ed7d0eff6ad866f412b7e)&amp;sc_f_para=sc_cita%3D%7B%E8%AF%AD%E8%A8%80%E8%BF%90%E7%94%A8%E4%B8%8E%E6%84%8F%E8%AF%86%E5%8F%8C%E9%87%8D%E7%BB%93%E6%9E%84%2C14%7D&amp;sort=sc_cited&amp;tn=SE_baiduxueshu_c1gjeupa&amp;ie=utf-8"
                                       target="_blank" className="sc_cite_cont" data-click="{'button_tp':'sc_cited'}">
                                        14
                                    </a></p>
                            </div>
                        </div>
                        <div className="dtl_subinfo" data-click="{'act_block': 'main'}">
                            <div className="subinfo_tool">
                                <Tag color="cyan">收藏</Tag>
                                <Tag color="cyan">引用</Tag>
                                <Tag color="cyan">批量引用</Tag>
                                <Tag color="cyan">报错</Tag>
                                <Tag color="cyan">分享</Tag>
                            </div>
                        </div>
                        <br/>
                        <br/>
                    </div>

                    <br/>
                    <br/>
                    <br/>
                    <Card style={{ width:"100%", float:"left",margin:"auto",padding:"0"}} bordered={false}>
                        <Layout style={{padding:"0",margin:"0",paddingLeft:"0px"}}>
                            <Header  style={{  zIndex: 1, width: '100%',padding:"0px" ,height:'24px'}}>

                                <Menu

                                    mode="horizontal"
                                    defaultSelectedKeys={['1']}
                                    style={{ lineHeight: '24px',width:"100%" }}
                                >
                                    <Menu.Item key="1">
                                        <span>全部来源</span>
                                    </Menu.Item>
                                    <Menu.Item key="2">
                                        <span>免费下载</span>
                                    </Menu.Item>
                                    <Menu.Item key="3">
                                        <Link to={"/system/personalinformation/profile"}>
                                            <span>求助全文</span>
                                        </Link>
                                    </Menu.Item>
                                </Menu>
                            </Header>
                            <Content style={{ padding: '0 0px', marginTop: 0 ,backgroundColor:"#fff"}}>
                                <br/>

                                <span className="dl_item_span">
                    <a className="dl_item" target="_blank" href="http://www.cnki.com.cn/Article/CJFDTotal-WGYJ201501002.htm" style={{width:"50%",float:"left",lineHeight:"32px"}}>
                        <span className="dl_icon" style={{paddingRight:"10px"}} ><img
                            src={"http://hiphotos.baidu.com/space/wh%3D16%2C16/sign=6e847407ba315c6043c063eebb9dfa25/b90e7bec54e736d1a154541a9d504fc2d5626959.jpg"}
                            width="16" height="16"/>
                        </span>
                    <span className="dl_source" title="知网">知网</span>
                    </a>
                    </span>
                                <span className="dl_item_span">
                    <a className="dl_item" target="_blank" href="http://www.cnki.com.cn/Article/CJFDTotal-WGYJ201501002.htm" style={{width:"50%",float:"right",lineHeight:"32px"}}>
                        <span className="dl_icon" style={{paddingRight:"10px"}} ><img
                            src={"http://hiphotos.baidu.com/space/wh%3D16%2C16/sign=6e847407ba315c6043c063eebb9dfa25/b90e7bec54e736d1a154541a9d504fc2d5626959.jpg"}
                            width="16" height="16"/>
                        </span>
                    <span className="dl_source" title="知网">知网</span>
                    </a>
                    </span>

                            </Content>

                        </Layout>
                    </Card>
                   {/* <div className="paper_src_wr">


                        <div className="paper_src_tab OP_LOG_BTN" data-click="{'fm':'beha','button_tp':'tab'}">
                            <a href="javascript:;" className="src_tabitem paper-source-tar tab_cur"
                               data-target="allversion_wr" data-click="{'act_block':'paper_source'}">全部来源</a>
                            <a href="javascript:;" className="src_tabitem savelink-tar" data-target="savelink_wr"
                               data-click="{'act_block':'savelink'}">免费下载</a>
                            <a href="javascript:;" className="src_tabitem paperhelp-tar" data-target="help_r"
                               data-click="{'act_block':'paperhelp'}">求助全文</a>
                            <a href="javascript:;" className="src_tabitem purchase-tar" style={{display:"none"}}
                               data-target="purchase_wr" data-click="{'act_block':'purchase'}">付费下载</a>
                        </div>

                        <div className="paper_src_content">

                            <div id="allversion_wr" className="src_container" data-click="{'act_block':'paper_source'}"
                                 style={{display:"block"}}>
                                <div className="allversion_content">
                                        <span className="dl_item_span">
                <a className="dl_item" target="_blank" href="http://www.cqvip.com/QK/72137X/201501/667162866.html"
                   data-click="{'button_tp':'down_link','libbuy':'0'}"
                   data-url="http://www.cqvip.com/QK/72137X/201501/667162866.html" data-embed="0">
                        <span className="dl_icon"><img
                            src={"http://hiphotos.baidu.com/space/wh%3D16%2C16/sign=a6d2b3fd8bb1cb133e3c3412eb786778/2e2eb9389b504fc247186817e3dde71190ef6d59.jpg"}
                            width="16" height="16"/></span>
                                        <span className="dl_source" title="维普">维普</span>
                    </a>
                    </span>
                                    <span className="dl_item_span">
                <a className="dl_item" target="_blank" href="http://www.cnki.com.cn/Article/CJFDTotal-WGYJ201501002.htm"
                   data-click="{'button_tp':'down_link','libbuy':'0'}"
                   data-url="http://www.cnki.com.cn/Article/CJFDTotal-WGYJ201501002.htm" data-embed="0">
                        <span className="dl_icon"><img
                            src={"http://hiphotos.baidu.com/space/wh%3D16%2C16/sign=6e847407ba315c6043c063eebb9dfa25/b90e7bec54e736d1a154541a9d504fc2d5626959.jpg"}
                            width="16" height="16"/>
                        </span>
                    <span className="dl_source" title="知网">知网</span>
                    </a>
                    </span>
                                    <span className="dl_item_span">
                <a className="dl_item" target="_blank"
                   href="http://www.ixueshu.com/document/9a0e808ac86b7ccf318947a18e7f9386.html"
                   data-click="{'button_tp':'down_link','libbuy':'0'}"
                   data-url="http://www.ixueshu.com/document/9a0e808ac86b7ccf318947a18e7f9386.html" data-embed="0">
                        <span className="dl_icon"><img
                            src={"http://ps-scholar-static.bj.bcebos.com/common/15aa6c2b6ebda14ba60f5123fbd692cd.png"}
                            width="16" height="16"/></span>
                                        <span className="dl_source" title="爱学术">爱学术</span>
                    </a>
                        <span className="dl_lib">(全网免费下载)</span>
                    </span>
                                    <span className="dl_item_span">
                <a className="dl_item" target="_blank" href="http://www.doc88.com/p-7945215556470.html"
                   data-click="{'button_tp':'down_link','libbuy':'0'}"
                   data-url="http://www.doc88.com/p-7945215556470.html" data-embed="0">
                        <span className="dl_icon"><img
                            src={"http://hiphotos.baidu.com/space/wh%3D16%2C16/sign=c110757249c2d562f25dd8ecd13da1d9/0dd7912397dda144d51cb7a0b4b7d0a20cf4868f.jpg"}
                            width="16" height="16"/></span>
                                        <span className="dl_source" title="道客巴巴">道客巴巴</span>
                    </a>
                        <span className="dl_lib">(帐号登录下载)</span>
                    </span>
                                    <input type="hidden" id="log-sources-init-value" value=""/>
                                </div>
                            </div>
                            <div id="savelink_wr" className="src_container" data-click="{'act_block':'savelink'}">

                    <span className="dl_item_span">
        <a className="dl_item" target="_blank"
           href="http://www.ixueshu.com/document/9a0e808ac86b7ccf318947a18e7f9386.html"
           data-click="{'button_tp':'link','libbuy':'0'}">
                <span className="dl_icon"><img
                    src={"http://ps-scholar-static.bj.bcebos.com/common/15aa6c2b6ebda14ba60f5123fbd692cd.png"} width="16"
                    height="16"/></span>

        <span className="dl_source" title="爱学术">爱学术</span>
    </a>
        <span className="dl_lib">(全网免费下载)</span>
        </span>

                                <span className="dl_item_span">
        <a className="dl_item" target="_blank" href="http://www.doc88.com/p-7945215556470.html"
           data-click="{'button_tp':'link','libbuy':'0'}">
                <span className="dl_icon"><img
                    src={"http://hiphotos.baidu.com/space/wh%3D16%2C16/sign=c110757249c2d562f25dd8ecd13da1d9/0dd7912397dda144d51cb7a0b4b7d0a20cf4868f.jpg"}
                    width="16" height="16"/></span>

        <span className="dl_source" title="道客巴巴">道客巴巴</span>
    </a>
        <span className="dl_lib">(帐号登录下载)</span>
        </span>
                                <input type="hidden" id="log-free-download-value" value=""/>
                            </div>

                            <i className="reqdata" style={{display:"none"}} urlmd="7e61000ed2bf4eb342903dfb59133198"
                               url="http://www.cqvip.com/QK/72137X/201501/667162866.html"
                               longsign="5f06ac08957ed7d0eff6ad866f412b7e" diversion=""></i>


                            <div id="help_r" className="src_container" data-click="{'act_block':'paperhelp'}">
                                <div className="help_content">
                                    <p>通过<a href="//xueshu.baidu.com/u/paperhelp" target="_blank"
                                            data-click="{'button_tp':'help_link','fm':'beha'}">文献互助</a>平台发起求助，成功后即可免费获取论文全文。
                                    </p>
                                    <p>您可以选择<strong>简单搜索</strong>、<strong>微信</strong>扫码或<strong>财富值</strong>支付求助。</p>
                                </div>
                                <a href="javascript:;" target="_blank" className="sc_paperhelp gethelp"
                                   data-click="{'button_tp':'help_btn','fm':'beha'}"
                                   data-longsign="5f06ac08957ed7d0eff6ad866f412b7e" data-title="语言运用与意识双重结构"
                                   data-author="">
                                    <span className="paperhelp_text">我要求助</span>
                                </a>
                            </div>

                            <div id="purchase_wr" className="src_container" data-click="{'act_block':'purchased'}"
                                 style={{display: "none"}}>
                                <div className="purchase_content">
                                    <p>我们已与文献出版商建立了直接购买合作。</p>
                                    <p className="info1">你可以通过身份认证进行实名认证，认证成功后本次下载的费用将由您所在的图书馆支付</p>
                                    <p className="info2">您可以直接购买此文献，1~5分钟即可下载全文。</p>

                                </div>
                                <a href="javascript:;" target="_blank" className="sc_bind getbind"
                                   data-click="{'button_tp':'bind_btn','fm':'beha'}"
                                   data-longsign="5f06ac08957ed7d0eff6ad866f412b7e" data-title="语言运用与意识双重结构"
                                   data-author="">
                                    <span>身份认证</span>
                                </a>
                                <a href="javascript:;" target="_blank" className="sc_download getdownload"
                                   data-click="{'button_tp':'download_btn','fm':'beha'}"
                                   data-longsign="5f06ac08957ed7d0eff6ad866f412b7e" data-title="语言运用与意识双重结构"
                                   data-author="">
                                    <span>付费下载</span>
                                </a>
                            </div>
                        </div>
                    </div>*/}
                   {/* <i className="reqdata" style="display:none;" urlmd="7e61000ed2bf4eb342903dfb59133198"
                       url="http://www.cqvip.com/QK/72137X/201501/667162866.html"
                       longsign="5f06ac08957ed7d0eff6ad866f412b7e" diversion=""></i>
*/}
                </div>

            </div>
        )
    }
}
export default ArticleDetail
