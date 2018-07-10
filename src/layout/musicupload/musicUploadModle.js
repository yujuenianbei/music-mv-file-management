import React, { Component } from 'react';
import * as Actions from './redux/action/index';
import { connect } from 'react-redux';
import axios from 'axios';

import { Modal, Form, Select, Input, Button, DatePicker, Upload, Icon, message } from 'antd';


function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

function beforeUpload(file) {
    const isJPG = file.type === 'image/jpeg';
    if (!isJPG) {
        message.error('You can only upload JPG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJPG && isLt2M;
}

const FormItem = Form.Item;
const Option = Select.Option;
class App extends Component {
    constructor() {
        super();
        this.state = {
            loading: false,
            confirmLoading: false,
        }

    }
    uploadOk = (e) => {
        e.preventDefault();
        // 表单提交
        this.props.form.validateFields((err, value) => {
            if (!err) {
                const values = {
                    ...value,
                    'songalbumdate': value['songalbumdate'].format('YYYY-MM-DD')
                }
                console.log('表单中的值: ', values);
                const url = '/add'
                const opts = {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        songname: values.songname,
                        songauthor: values.songauthor,
                        songalbum: values.songalbum,
                        songalbumdate: values.songalbumdate,
                        songalbumimg: values.songalbumimg,
                        songfile: values.songfile,
                    })
                }
                this.setState({
                    confirmLoading: true,
                });
                fetch(url, opts)
                    .then((res) => {
                        //网络请求成功,执行该回调函数,得到响应对象,通过response可以获取请求的数据
                        //json text等
                        //你可以在这个时候将Promise对象转换成json对象:response.json()
                        //转换成json对象后return，给下一步的.then处理
                        return res.json();
                        //或 return response.json();
                    })
                    .then((res) => {
                        console.log(res)
                        this.setState({
                            confirmLoading: false,
                        });
                        this.props.onAddSongState({
                            addSongModle: false,
                        })
                    })
                    .catch((error) => {
                        //网络请求失败,执行该回到函数,得到错误信息
                    })

            }
        });
        // setTimeout(() => {
        //     this.setState({
        //         visible: false,
        //         confirmLoading: false,
        //     });
        // }, 2000);
    }

    uploadCancel = () => {
        this.props.onAddSongState({
            addSongModle: false,
        })
    }

    handleSelectChange = (value) => {
        console.log(value);
        this.props.form.setFieldsValue({
            note: `Hi, ${value === 'male' ? 'man' : 'lady'}!`,
        });
    }
    handleChange = (info) => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, imageUrl => this.setState({
                imageUrl,
                loading: false,
            }));
        }
    }


    upload = () => {
        console.log(this.refs.myInput.files[0])
        let f = this.refs.myInput.files[0];
        let formData = new FormData()
        formData[0] = f
        console.log(formData)
        fetch('/upload', {
            method: "POST",
            mode: "cors",
            credentials: "include",
            headers: {
               "Content-Type":"multipart/form-data;boundary=123"
            },
            body: formData
        })

        // var files = !!this.files ? this.files : [];
        // console.log(this)
        // if (!files.length || !window.FileReader) {
        //     console.log("浏览器不支持HTML5");
        //     return false;   
        // };
        // // 创建一个FormData对象,用来组装一组用 XMLHttpRequest发送请求的键/值对
        // var fd = new FormData();
        // // 把 input 标签获取的文件加入 FromData 中
        // fd.append('file', files[0]);

        // // Ajax
        // var request = new XMLHttpRequest();
        // request.open("POST", "http://localhost:3999/upload");
        // request.send(fd);
        // request.onreadystatechange = function(){
        //     if(request.readyState === 4 & request.status === 200){
        //         console.log("上传成功");
        //         var response = JSON.parse(request.responseText);
        //         console.log(response);
        //     }
        // }
    }

    render() {
        const { getFieldDecorator } = this.props.form;

        const uploadButton = (
            <div>
                <Icon type={this.state.loading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        const imageUrl = this.state.imageUrl;
        return (
            // <Modal title="Title"
            //     visible={this.props.addSong.musicList.addSongModle}
            //     onOk={this.uploadOk}
            //     onCancel={this.uploadCancel}
            //     confirmLoading={this.state.confirmLoading}
            //     okText="确认"
            //     cancelText="取消"
            // >
            //     <Form>
            //         <FormItem
            //             label="歌曲名称"
            //             labelCol={{ span: 5 }}
            //             wrapperCol={{ span: 12 }}
            //         >
            //             {getFieldDecorator('songname', {
            //                 rules: [{ required: true, message: '请输入歌曲名称!' }],
            //             })(
            //                 <Input />
            //             )}
            //         </FormItem>
            //         <FormItem
            //             label="歌手名"
            //             labelCol={{ span: 5 }}
            //             wrapperCol={{ span: 12 }}
            //         >
            //             {getFieldDecorator('songauthor', {
            //                 rules: [{ required: true, message: '请输入歌手名!' }],
            //             })(
            //                 <Input />
            //             )}
            //         </FormItem>
            //         <FormItem
            //             label="专辑名称"
            //             labelCol={{ span: 5 }}
            //             wrapperCol={{ span: 12 }}
            //         >
            //             {getFieldDecorator('songalbum', {
            //                 rules: [{ required: true, message: '请输入专辑名称!' }],
            //             })(
            //                 <Input />
            //             )}
            //         </FormItem>
            //         <FormItem
            //             label="发专时间"
            //             labelCol={{ span: 5 }}
            //             wrapperCol={{ span: 12 }}
            //         >
            //             {getFieldDecorator('songalbumdate', {
            //                 rules: [{ required: true, message: '请输入发专时间!' }],
            //             })(
            //                 <DatePicker style={{ width: '100%' }} />
            //             )}
            //         </FormItem>
            //         <FormItem
            //             label="专辑封面"
            //             labelCol={{ span: 5 }}
            //             wrapperCol={{ span: 12 }}
            //         >
            //             {getFieldDecorator('songalbumimg', {
            //                 rules: [{ required: true, message: '请输入专辑封面!' }],
            //             })(
            //                 // <Upload
            //                 //     name="avatar"
            //                 //     listType="picture-card"
            //                 //     className="avatar-uploader"
            //                 //     showUploadList={false}
            //                 //     action="//jsonplaceholder.typicode.com/posts/"
            //                 //     beforeUpload={beforeUpload}
            //                 //     onChange={this.handleChange}
            //                 // >
            //                 //     {imageUrl ? <img src={imageUrl} alt="avatar" style={{width: 100}} /> : uploadButton}
            //                 // </Upload>
            //                 <input id='img' type='file' multiple accept='image/*' onChange={this.upload} />
            //             )}
            //         </FormItem>
            //         <FormItem
            //             label="歌曲文件"
            //             labelCol={{ span: 5 }}
            //             wrapperCol={{ span: 12 }}
            //         >
            //             {getFieldDecorator('songfile', {
            //                 rules: [{ required: true, message: '请输入歌曲文件!' }],
            //             })(
            //                 <Input />
            //             )}
            //         </FormItem>
            //         {/* <FormItem
            //             label="SongAuthor"
            //             labelCol={{ span: 5 }}
            //             wrapperCol={{ span: 12 }}
            //         >
            //             {getFieldDecorator('gender', {
            //                 rules: [{ required: true, message: 'Please select your songauthor!' }],
            //             })(
            //                 <Select
            //                     placeholder="Select a option and change input text above"
            //                     onChange={this.handleSelectChange}
            //                 >
            //                     <Option value="male">male</Option>
            //                     <Option value="female">female</Option>
            //                 </Select>
            //             )}
            //         </FormItem> */}
            //     </Form>



            // </Modal>


            <div>
                <input type="file" ref="myInput"  multiple accept='image/*' />
                <input
                    type="button"
                    value="点我输入框获取焦点"
                    onClick={this.upload}
                />
            </div>
        );
    }
}
const MusicControllForm = Form.create()(App);


const mapStateToProps = (state) => {
    return {
        addSong: state
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAddSongState: (bool) => {
            dispatch(Actions.addSong(bool));
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(MusicControllForm);