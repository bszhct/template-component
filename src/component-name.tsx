import * as React from 'react'

const icon = require('./images/icon.svg')

interface IComponentName {
  name?: string
}


export default class ComponentName extends React.Component<IComponentName> {
  render() {
    const {name} = this.props

    
    return (
      <div className="component-name-wrap">
        <div className="name">
          <img src={icon} alt="测试" />
          {name}
        </div>
        <div className="time">
          时间：
          {new Date().getFullYear()}
        </div>
      </div>
    )
  }
}
