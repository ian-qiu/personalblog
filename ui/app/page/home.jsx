import React from 'react'
import { Layout, Menu, Breadcrumb, Button} from 'antd';
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
                    <Menu id="home-nav"
                        theme="dark"
                        mode="horizontal"
                        style={{ lineHeight: '64px'}}>
                        <Menu.Item key="1"><Link to='/'>home</Link></Menu.Item>
                        <Menu.Item key="2">article</Menu.Item>
                        <Menu.Item key="3">about</Menu.Item>
                        <Menu.Item key="4"><Link to='/article/add'>add</Link></Menu.Item>
                    </Menu>
                    </Header>

                    <Content style={{padding:'0 50px'}}>
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