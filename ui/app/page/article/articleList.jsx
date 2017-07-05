import React from 'react'
import request from '../../common/request.jsx';
import Alert from '../../common/AlertContainer.js'
import {Link} from 'react-router'

class ArticleList extends React.Component {
    constructor (props) {
        super(props)
        let self = this
        self.state = {
            articleList:[]
        }

        request({
            type:'get',
            url:'/article/get_article_list',
            skip:true,
            data:'',
            errskip:false,
            errorCallback: function(err,res) {
                Alert.show(res.body.msg, {
                time:3000,
                type:'error'
            })
                return false
            },
            callback: function(err, res) {
                let data = res.body.data
                if (res.body.status == 0) {
                    self.setState({
                        articleList : data
                    })
                }
            }
        });
    }

    show () {
        let list_p = this.state.articleList;
        let lists = '';
        if (list_p.length !== 0) {
             lists =  list_p.map(function(list, key) {
            return (
            <div style={{ background: '#fff', padding: 24, minHeight: 100, marginTop:20 }} key={key}>
                <p>{list.title}</p>            
                <p>标签: {list.label}</p>            
                <p>发布时间: {list.publish_time}</p>            
                <p>更新时间: {list.update_time}</p>
                <p>{list.content}</p>
                <p><Link to={`/article/${list.article_id}`}>1234</Link></p>
             </div>
            )
            })
        } else {
            lists = <div><p>啥也没有</p></div>
        }
        
        return lists;
    }
    render () {
        return (
            <div>
                {this.show()}
            </div>
        )
    }
}

export default ArticleList