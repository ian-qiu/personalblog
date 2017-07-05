import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory, Route, Link, IndexRoute, IndexRedirect} from 'react-router'

import ArticleList from '../page/article/articleList.jsx'

ReactDOM.render(
    (
    <Router history={browserHistory}>
               <Route path='/' getComponent={(location, cb) => {
				    require.ensure([], (require) => {
				      	cb(null, require('../page/home.jsx').default)
				    },'home')
				}}>
				<IndexRoute component={ArticleList} />
				<Route path='article/add' getComponent={(location, cb) => {
				    require.ensure([], (require) => {
				      	cb(null, require('../page/article/addArticle.jsx').default)
				    },'article')
                }} />
				<Route path='article/:article_id' getComponent={(location, cb) => {
				    require.ensure([], (require) => {
				      	cb(null, require('../page/article/article.jsx').default)
				    },'article')
                }} />
				

				</Route>
              
  	</Router>
    ),
    document.getElementById('app')
);
