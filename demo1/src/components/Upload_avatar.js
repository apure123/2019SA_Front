import React from 'react';
import {connect} from "react-redux";

import axios from "axios"
import {
    Upload, Button, Icon, message,
} from 'antd';



class Upload_avatar extends React.Component{




    render(){

        const props = {
            name: 'file',
            action: 'http://127.0.0.1:8000/api/au_profile/',
            headers: {
                Authorization: `Token ${this.props.token}`,
                enctype:"multipart/form-data"
            },
            data:{

            },
            onChange(info) {
                if (info.file.status !== 'uploading') {
                    console.log(info.file, info.fileList);
                }
                if (info.file.status === 'done') {
                    message.success(`${info.file.name} file uploaded successfully`);
                } else if (info.file.status === 'error') {
                    message.error(`${info.file.name} file upload failed.`);
                }
            },
        }



        return(
            <Upload {...props}>
                <Button>
                    <Icon type="upload" /> Click to Upload
                </Button>
            </Upload>
        )
    }

}


function mapStateToProps(state)
{
    return{
        token:state.login.token,
    }
}

function mapDispatchToProps(dispatch){
    return{
        set_avator_url:(url)=>{dispatch({type:"set_avator",url:url})}
    }
}
Upload_avatar=connect(mapStateToProps,mapDispatchToProps)(Upload_avatar)
export default Upload_avatar


