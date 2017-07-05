import React from 'react'
import request from '../../common/request.jsx';
import {message} from 'antd'

class Article extends React.Component {
    constructor (props) {
        super(props)
        let article_id = this.props.params.article_id
        this.state = {
            article_id:  article_id,
            data: {}
        }
    }

    componentDidMount () {
        const article_id = this.state.article_id
        const self = this
        request({
            type:'get',
            url:'/article/get_article_by_id?article_id=' + article_id,
            skip:true,
            data:'',
            errskip:false,
            errorCallback: function(err,res) {
                message.error(res.body.msg)
            },
            callback: function(err, res) {
                if (res.body.status === 0) {
                    let data = res.body.data
                    if (data.length === 0) {
                        message.error('找不到该文章')
                        self.props.history.push('/')
                    } else {
                        self.setState({
                            data
                        })
                    }
                }
            }
        })
    }
    render () {
        return (
            <div style={{ background: '#fff', padding: 24, minHeight: 100, marginTop:20 }}>
                {this.state.data.title}
                {this.state.data.ctime}
                {this.state.data.mtime}
                {this.state.data.content}
            </div>
        )
    }
}

export default Article