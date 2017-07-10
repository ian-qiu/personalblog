import React from 'react'
import request from '../../common/request.jsx';
import {Link} from 'react-router'
import {Pagination, Row, Col} from 'antd'

class ArticleList extends React.Component {
    constructor (props) {
        super(props)
        let self = this
        self.state = {
            articleList:[],
            num: 0,
            pageNumber: 1
        }

        request({
            type:'get',
            url:'/article/get_article_list',
            skip:true,
            data:{
                index: self.state.pageNumber
            },
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
                        articleList : data.list,
                        num: data.num
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

    //跳转分页
    changePage = (pageNumber) =>  {
        const self = this
        request({
            type:'get',
            url:'/article/get_article_list',
            skip:true,
            data:{
                'index': pageNumber
            },
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
                        articleList : data.list,
                        num: data.num
                    })
                }
            }
        });
    }
    render () {
        return (
            <div>
                {this.show()}

                <div style={{minHeight: 100, marginTop:30}}>
                    <Row type='flex' justify='center'>
                        <Pagination defaultCurrent={this.state.pageNumber} pageSize={5} total={this.state.num} onChange={this.changePage}/>               
                    </Row>
                </div>

            </div>
        )
    }
}

export default ArticleList