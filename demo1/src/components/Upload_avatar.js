import React from 'react';
import {connect} from "react-redux";
import ReactDOM from 'react-dom';
import axios from "axios"
import {
    Upload, Button, Icon, message,
} from 'antd';

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

class Upload_avatar extends React.Component {
    state = {
        fileList: [],
        uploading: false,
    }

    handleUpload = () => {
        const { fileList } = this.state;
        const File = new FormData();
        fileList.forEach((file) => {
            File.append('File', file);
        });

        this.setState({
            uploading: true,
        });

        console.log("这里输出axios请求的参数")
        console.log(File)
        axios.post(`Http://127.0.0.1:8000/user_avator/${this.props.user_id}/`,{File:File})
            .then( (response) =>{
                console.log(response);
                message.success("上传头像成功");
                this.setState({uploading:false});
                //从后端获取最新的头像
                this.get_avator_url();
            })
            .catch((error) =>{
                console.log(error);
                this.setState({uploading:false});
                message.error("上传头像出错")
            })
        // You can use any AJAX library you like
        /*reqwest({
            url: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
            method: 'post',
            processData: false,
            data: formData,
            success: () => {
                this.setState({
                    fileList: [],
                    uploading: false,
                });
                message.success('upload successfully.');
            },
            error: () => {
                this.setState({
                    uploading: false,
                });
                message.error('upload failed.');
            },
        });*/
    }
    handleChange = (info) => {
        if (info.file.status === 'uploading') {
            /*this.setState({ loading: true });*/
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, imageUrl => this.setState({
                imageUrl
            }));
        }
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
    }

    render() {
        const { uploading, fileList } = this.state;
        const props = {
            onRemove: (file) => {
                this.setState((state) => {
                    const index = state.fileList.indexOf(file);
                    const newFileList = state.fileList.slice();
                    newFileList.splice(index, 1);
                    return {
                        fileList: newFileList,
                    };
                });
            },
            beforeUpload: (file) => {
                const isJPG = file.type === 'image/jpeg';
                if (!isJPG) {
                    message.error('You can only upload JPG file!');
                }
                this.setState(state => ({
                    fileList: [file],
                }));
                return false;
            },
            fileList,
            onChange:this.handleChange,
            listType: 'picture'
        };

        const uploadButton = (
            <div >
                <Icon type={'plus'} />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        return (
            <div style={{margin:"auto"}} align="center">
                <Upload {...props}>
                    <Button>
                        <Icon type="upload" /> 点击上传头像
                    </Button>
                </Upload>
                <Button
                    type="primary"
                    onClick={this.handleUpload}
                    disabled={fileList.length === 0}
                    loading={uploading}
                    style={{ marginTop: 16 }}
                >
                    {uploading ? 'Uploading' : 'Start Upload' }
                </Button>
                <Button onClick={()=>console.log(this.state)}>输出state</Button>
            </div>
        );
    }
}


function mapStateToProps(state)
{
    return{
        user_id:state.login.user_id
    }
}

function mapDispatchToProps(dispatch){
    return{
        set_avator_url:(url)=>{dispatch({type:"set_avator",url:url})}
    }
}
Upload_avatar=connect(mapStateToProps,mapDispatchToProps)(Upload_avatar)
export default Upload_avatar


