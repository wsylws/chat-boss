import React from 'react'
import { connect } from 'react-redux'
import { Result, List, WhiteSpace,Button, Modal } from 'antd-mobile'
import browserCookie from 'browser-cookies'
import {logoutSubmit} from '../../redux/user.redux'
import {Redirect} from 'react-router-dom'

@connect(
    state=>state.user,
    {logoutSubmit}
)

class User extends React.Component {
    constructor(props){
		super(props)
		this.logout = this.logout.bind(this)
	}
    logout() {
        const alert = Modal.alert
        alert('注销', '确认退出登录吗???', [
            { text: '取消', onPress: () => console.log('cancel') },
            { text: '确认', onPress: () => {
                // 删除cookie
                browserCookie.erase('userid')
                this.props.logoutSubmit()
            }}
          ])
        
    }
    render() {
        const props = this.props
        const Item = List.Item
        const Brief = Item.Brief
        return props.user ? (
            <div>
                <Result 
                    img={<img src={require(`../img/${props.avatar}.png`)} style={{width:50}} />}
                    title={props.user}
                    message={props.type == 'boss' ? props.company:null}
                />

                <List renderHeader={()=>'简介'}>
                    <Item
                        multipleLine
                    >
                        {props.title}
                        {this.props.desc.split('\n').map(v=><Brief key={v}>{v}</Brief>)}
                        {props.money?<Brief>薪资：{props.money}</Brief>:null}
                    </Item>
                </List>
                <WhiteSpace></WhiteSpace>
                <List>
                    <Item onClick={this.logout}>退出登录</Item>
                </List>
            </div>
        ):<Redirect to={props.redirectTo}></Redirect>
        
    }
}

export default User