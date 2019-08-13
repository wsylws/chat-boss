import React from 'react'
import { Grid,List } from 'antd-mobile';
import PropTypes from 'prop-types'

class AvatarSelector extends React.Component{
    // 属性检测
    static propTypes = {
        selectAvatar: PropTypes.func.isRequired
    }
    constructor(props) {
        super(props)
        this.state={}
    }
    render() {
        const avatarList = 'boy,girl,man,woman,bull,chick,crab,hedgehog,koala,lemur,pig,hippopotamus,tiger,whale,zebra'
                            .split(',')
                            .map(v=>({
                                icon: require(`../img/${v}.png`),
                                text:v
                            }))
        const gridHeader = this.state.text ? (<div>
                                                <span>已选择头像</span>
                                                <img style={{width:20}} src={this.state.icon}/>
                                              </div>) : <div>请选择头像</div>
        return (
            <div>
                <List renderHeader={()=>gridHeader}>
                    <Grid 
                        data={avatarList} 
                        columnNum={5}
                        onClick={ele=>{
                            this.setState(ele)
                            this.props.selectAvatar(ele.text)
                        }}
                    />
                </List>
            </div>

        )
    }
}

export default AvatarSelector