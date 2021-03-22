import React, { Component } from 'react';
import { routes } from '../routes';
import { HashRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { ConfigProvider } from 'antd'
import 'antd-mobile/dist/antd-mobile.less';
import zhCN from 'antd/es/locale/zh_CN';
class App extends Component {
  render () {
    return (
      <ConfigProvider locale={zhCN}>
        <HashRouter>
          {renderRoutes(routes)}
        </HashRouter>
      </ConfigProvider>
    )
  }
}

export default App