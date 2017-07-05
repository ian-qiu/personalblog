import React from 'react';
import ReactDOM from 'react-dom';
import {Form, Input, Button, notification} from 'antd';
import request from '../common/request.jsx';
import Alert from '../common/AlertContainer.js'

const FormItem = Form.Item;

class Registe extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            username: '',
            password: ''
        }
    }
    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields(
            (errors, values) =>  {
                if (!!errors) {
                    Alert.show('请检查您的输入', {
                        time:3000,
                        type:'error'
                    })
                    return false
                } else {
                    request({
                        type:'post',
                        url:'/user/registe',
                        skip:true,
                        data:this.props.form.getFieldsValue(),
                        errskip:false,
                        errorCallback: function(err,res) {
                            Alert.show('请检查您的输入', {
                            time:3000,
                            type:'error'
                        })
                            return false
                        },
                        callback: function(err, res) {
                            
                        }
                    })
                }
            }
        )
    }
    checkUsername(rule, value, callback) {
        let reg = /[0-9A-Za-z]{2,}/
        if (reg.test(value)) {
            callback()
        } else {
            callback(new Error('账号至少3位数字/字母'))
        }
        
    }
    usernameIsRegiste(e) {
        //验证用户名是否重复
        let value = e.target.value
        request({
            type:'post',
            url:'/user/check_username',
            skip:true,
            data:{username:value},
            errskip:false,
            errorCallback:function(err,res){
                if (res.body.status !== 0) {
                    Alert.show(res.body.msg, {
                        time:3000,
                        type:'error'
                    })
                    return false;   
                }
            },
            callback:function(err, res){
                // console.log(res)
                // if (res.body.status !== 0) {
                //     console.log('用户名重复')
                // }
            }
        });
    }
    checkPassword(rule, value, callback) {
        if (value) {
            callback()
        } else {
            callback(new Error('密码不能为空'))
        }
    }
    render() {
        const {getFieldProps} = this.props.form;
        const formItemLayout = {
            labelCol:{span:6},
            wrapperCol:{span:15}
        }
        return (
            <Form onSubmit={this.handleSubmit.bind(this)}>
            <FormItem {...formItemLayout}
            label='用户名'
            >
                <Input type='text' {...getFieldProps('username', {initialValue:'', rules:[
                    {required:true,min:3,validator:this.checkUsername}]})} placeholder='用户名只能为数字字母'
                    onBlur={this.usernameIsRegiste.bind(this)}
                />
            </FormItem>

            <FormItem>
                <Input type='password' {...getFieldProps('password', {initialValue:'', rules:[
                    {required:true,min:6,validator:this.checkPassword}]})} placeholder='密码至少6位'
                />
            </FormItem>
            
            <FormItem>
                <Button type='primary' htmlType='submit'/>
                registe          
            </FormItem>
            </Form>
        );
    }
};


export default Form.create()(Registe);


