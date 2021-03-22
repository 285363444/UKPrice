import React, { Component } from 'react';
import { getToken, urlParse } from '../../apis';
import { Toast } from 'antd-mobile';
import config from '../../config';
import './login.scss';

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }
  togoE2 () {
    window.location.href = config.E2url
  }
  getToken = async (E2Email) => {
    sessionStorage.setItem("E2Email", E2Email)
    const outken = {
      username: E2Email + '@xdf.cn',
      password: E2Email + '@xdf.cn',
      grant_type: 'password',
      scope: 'read',
      client_id: 'rajithapp',
      client_secret: 'secret',
    }
    const oauthtoken = await getToken(outken)
    let value = oauthtoken.value
    if (value) {
      sessionStorage.setItem('token', value);
      this.props.history.push('/home')
    } else {
      // 清除浏览器所有Cookie
      sessionStorage.clear();
      var date = new Date();
      date.setTime(date.getTime() - 10000);
      var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
      if (keys) {
        for (var i = keys.length; i--;)
          document.cookie = keys[i] + "=0; expire=" + date.toGMTString() + "; path=/";
      }
      Toast.fail('对不起！用户没有权限，请联系管理员，或者重新登陆！', 3)
      this.togoE2()
    }
  }
  componentDidMount () {
    var reg = new RegExp("U2NickName");
    console.log(reg.test(document.cookie), urlParse(document.cookie).userName)
    if (reg.test(document.cookie) && urlParse(document.cookie).userName) {
      this.getToken(urlParse(document.cookie).userName)
    } else {
      this.togoE2()
    }
  }

  render () {
    return (
      <div className="welcome">

      </div>
    )
  }
}

export default Login
