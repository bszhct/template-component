import * as React from 'react'
import * as ReactDOM from 'react-dom'

import {ComponentName} from '../src'
import '../src/index.styl'

// 如果想要测试编译之后的代码, 执行 `npm run build` 之后, 在 demo 中引入
// import ComponentName2 from '..'

import './index.styl'


class Example extends React.Component {
  render() {
    return (
      <div className="example-component-name">
        <ComponentName name="bszhct" />
        {/* <ComponentName2 name="bszhct@骆驼" /> */}
      </div>
    )
  }
}

ReactDOM.render(<Example />, document.getElementById('root'))
