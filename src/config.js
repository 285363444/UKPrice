const baseConfig = {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
  },
  timeout: 1 * 60 * 1000,
  // baseURL: 'http://qtmbzhb.xdf.cn/qtukprice',  //正式
  baseURL: 'https://qtfwjc.staff.xdf.cn/qtukprice',  //测试
}

const development = {
  ...baseConfig,
  timeout: 5 * 60 * 1000,
  // baseURL: 'http://10.149.0.208:8087',
  baseURL: 'https://qtfwjc.staff.xdf.cn/qtukprice',  //测试
}

const production = {
  ...baseConfig,
}

export default {
  //正式
  // E2url: 'https://passport.xdf.cn/e2/index.aspx?client_id=9860&response_type=code&redirect_uri=http://qtmbzhb.xdf.cn/qtukprice/sys/login/callback?sourceSys=YBG&state=1&scope=login',
  // outE2url: 'https://passport.xdf.cn/e2/logout.aspx?client_id=9860&ReturnUrl=http://qtmbzhb.xdf.cn/qtukpriceYBG',

  //测试
  E2url: 'https://testu2.staff.xdf.cn/e2/index.aspx?client_id=22212&response_type=code&redirect_uri=https://qtfwjc.staff.xdf.cn/qtukprice/sys/login/callback?sourceSys=YBG&state=1&scope=login',
  outE2url: 'https://testu2.staff.xdf.cn/e2/logout.aspx?client_id=22212&ReturnUrl=https://qtfwjc.staff.xdf.cn/qtukpriceYBG',
  development,
  production,
}