import React from 'react';
import ReactDOM from 'react-dom';
import {Form, Input, Button, notification} from 'antd';
import request from '../common/request.jsx';
import Alert from '../common/AlertContainer.js'

const FormItem = Form.Item;

class Login extends React.Component {
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
                    Alert.show('fucker', {
                        time:3000,
                        type:'error'
                    })
                    return false
                } else {
                    request({
                        type:'post',
                        url:'/user/login',
                        skip:true,
                        data:this.props.form.getFieldsValue(),
                        errskip:false,
                        errorCallback: function(err,res) {
                            console.log(res)
                        },
                        callback: function(err, res) {
                            // console.log(res)                    
                        }
                    })
                }
            }
        )
    }
    checkUsername(rule, value, callback) {
        let reg = /[0-9A-Za-z]{3,}/
        if (reg.test(value)) {
            callback()
        } else {
            callback(new Error('账号至少3位数字/字母'))
        }
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
            <Form>
            <FormItem {...formItemLayout}
            label='用户名'
            >
                <Input type='text' {...getFieldProps('username', {initialValue:'', rules:[
                    {required:true,min:3,validator:this.checkUsername}]})} placeholder='用户名只能为数字字母'
                />
            </FormItem>

            <FormItem>
                <Input type='password' {...getFieldProps('password', {initialValue:'', rules:[
                    {required:true,min:6,validator:this.checkPassword}]})} placeholder='密码至少6位'
                />
            </FormItem>
            
            <FormItem>
                <Button type='primary' onClick={this.handleSubmit.bind(this)}/>
                login in          
            </FormItem>
            </Form>
        );
    }
};


export default Form.create()(Login);


