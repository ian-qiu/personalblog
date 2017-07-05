import React from 'react';
import ReactDOM from 'react-dom';
import {Form, Input, Button, notification, Tag, Tooltip, message} from 'antd';
import request from '../../common/request.jsx';

const FormItem = Form.Item;

class AddArticle extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            title: '',
            content: '',
            tags:[],
            inputTag:'',
            tag_ids:[]
        }
    }
    handleSubmit(e) {
        e.preventDefault();
        const self = this
        let input = this.props.form.getFieldsValue();
        let tag_ids = this.state.tag_ids
        let data = {
            ...input, 
            'tag_ids': tag_ids
        }

        this.props.form.validateFields(
            (errors, values) =>  {
                if (!!errors) {
                    message.error(errors)
                    return false
                } else {
                    request({
                        type:'post',
                        url:'/article/add_article',
                        skip:true,
                        data:data,
                        errskip:false,
                        errorCallback: function(err,res) {
                            message.error(res.body.msg)
                        },
                        callback: function(err, res) {
                            if (res.body.status === 0) {
                                let article_id = res.body.data
                                if (article_id > 0) {
                                    message.info('添加成功')
                                    self.props.history.push('/article/' + article_id)
                                }
                            }
                        }
                    })
                }
            }
        )
    }
    checkUsername(rule, value, callback) {

        if (value) {
            callback()
        } else {
            callback(new Error('标题不能为空'))
        }
    }
    checkPassword(rule, value, callback) {
        if (value) {
            callback()
        } else {
            callback(new Error('密码不能为空'))
        }
    }

    saveTagRef = input => this.input = input

    handleTagChange = (e) => {
        this.setState({inputTag: e.target.value})
    }
    handleTagConfirm = () => {
        const self = this
        const state = this.state
        const inputTag = state.inputTag
        let tags = state.tags
        let tag_ids = state.tag_ids
        if (inputTag.trim().length !== 0 &&tags.indexOf(inputTag) === -1) {
            //new_tag
            request({
                type:'post',
                url:'/article/new_tag',
                skip:true,
                data:{tag:inputTag},
                errskip:false,
                errorCallback: function(err,res) {
                    message.error(res.body.msg)
                },
                callback: function(err, res) {
                    if (res.body.status === 0) {
                        let tag_id = res.body.data
                        if (tag_id > 0) {
                            tag_ids = [...tag_ids, tag_id]
                            self.setState({
                                tag_ids
                            })
                        }
                    }
                }
            })

            tags = [...tags, inputTag]
            this.setState({
                tags,
                inputTag:''
            })
        }
    }

    handleTagClose = (tagRemove) => {
        const tags = this.state.tags.filter(tag => tag !== tagRemove);
        this.setState({tags})
    }

    render() {
        const {getFieldProps} = this.props.form;
        const {inputTag, tags} = this.state
        
        const formItemLayout = {
            labelCol:{span:6},
            wrapperCol:{span:15}
        }
        const tailFormItemLayout = {
            wrapperCol:{
                span:14,
                offset:6
            }
        }

        return (
              <div style={{ background: '#fff', padding: 24, minHeight: 100, marginTop:20 }}>
             
            <Form >
            <FormItem {...formItemLayout}
            label='标题'
            >
                <Input type='text' {...getFieldProps('title', {initialValue:'', rules:[
                    {required:true,min:3,validator:this.checkUsername}]})} placeholder='用户名只能为数字字母'
                />
            </FormItem>

            <FormItem {...formItemLayout}
            label='内容'
            >
                <Input type='textarea' {...getFieldProps('content', {initialValue:'', rules:[
                    {required:true,min:6,validator:this.checkPassword}]})} placeholder='支持markdown'
                    autosize={{minRows:5}}
                />
            </FormItem>

            <FormItem {...formItemLayout}
            label='标签'
            >
                <div>

                {tags.map((tag,index) => {
                    const isLongTag = tag.length > 10
                    const tagElem = (
                        <Tag key={tag} closable={true} afterClose={() => this.handleTagClose(tag)}>
                        {isLongTag ? `${tag.slice(1,5)}...` : tag}
                        </Tag>
                    )
                    return isLongTag ? <Tooltip title={tag}>{tagElem}</Tooltip> : tagElem;
                })}

                <Input ref={this.saveTagRef}  type='text' size='small' style={{width:78}} value={inputTag}
                onChange={this.handleTagChange} onBlur={this.handleTagConfirm} onPressEnter={this.handleTagConfirm}
                />
                </div>
            </FormItem>

            
            <FormItem {...tailFormItemLayout}
            >
                <Button type='primary' onClick={this.handleSubmit.bind(this)} htmlType='submit' >
                submit
                </Button>

            </FormItem>
            </Form>
             </div>            
        );
    }
};


export default Form.create()(AddArticle);