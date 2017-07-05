import React from 'react'
import { Layout, Menu, Breadcrumb, Button } from 'antd';
import request from '../common/request.jsx';
import {Link} from 'react-router'
import ArticleList from './article/articleList.jsx'

const { Header, Content, Footer } = Layout;

class Home extends React.Component {
    constructor(props){
        super(props)
        let self = this
        self.state = {
            articleList:[]
        }
    }
 
    render(){
        return (
            <div>
            <Layout>
            <Header>
                  <Menu
            theme="dark"
        mode="horizontal"
        defaultSelectedKeys={['2']}
        style={{ lineHeight: '64px' }}
      >
        <Menu.Item key="1"><Link to='/'>home</Link></Menu.Item>
        <Menu.Item key="2">article</Menu.Item>
        <Menu.Item key="3">about</Menu.Item>
        <Menu.Item key="4"><Link to='/article/add'>add</Link></Menu.Item>
      </Menu>
            </Header>
            <Content style={{padding:'0 50px'}}>
    <Breadcrumb style={{ margin: '12px 0' }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>List</Breadcrumb.Item>
        <Breadcrumb.Item>App</Breadcrumb.Item>
        <Breadcrumb.Item>login</Breadcrumb.Item>
        <Breadcrumb.Item>register</Breadcrumb.Item>
      </Breadcrumb>

       <div>
        {this.props.children}
       </div>

            </Content>
            <Footer>Footer</Footer>
            </Layout>
            </div>

        )
    }
}

export default Home