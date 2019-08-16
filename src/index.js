import React from 'react'
import ReactDom from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Redirect,Switch } from 'react-router-dom'

import Login from './container/login/login'
import Register from './container/register/register'
import BossInfo from './container/bossinfo/bossinfo'
import GeniusInfo from './container/geniusinfo/geniusinfo'
import Dashboard from './component/dashboard/dashboard'
import AuthRoute from './component/authroute/authroute'
import Chat from './component/chat/chat'
import reducers from './reducer'
import './config'
import './index.css'
// 创建store,把reducer传给store
const store = createStore(reducers, compose(
	applyMiddleware(thunk),
	// 使用redux devTools 扩展工具
	window.devToolsExtension?window.devToolsExtension():f=>f
))
// boss genius me msg 4个页面
ReactDom.render(
	// Provider 都有能力获取store里的内容
	(<Provider store={store}>
		<BrowserRouter>
			<div>
				<AuthRoute></AuthRoute>
				<Switch>
					<Route path='/bossinfo' component={BossInfo}></Route>
					<Route path='/geniusinfo' component={GeniusInfo}></Route>
					<Route path='/login' component={Login}></Route>
					<Route path='/register' component={Register}></Route>
					<Route path='/chat/:user' component={Chat}></Route>
					{/* 没有任何路由命中 */}
					<Route component={Dashboard}></Route>
				</Switch>
			</div>
		</BrowserRouter>
	</Provider>),
	document.getElementById('root')
)
