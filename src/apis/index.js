import axios from './_axios'
import { stringify } from 'qs'
import axioses from 'axios'
import config from '../config'

const postRequest = (api, params = {}, options = {}) => axios.post(api, stringify(params), {
  ...options
})
const postRequestes = (api, params = {}, options = {}) => axioses.post(api, params, {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
  ...options
})
const postRequestWithAuths = (api, params = {}, options = {}) => axios.post(api, stringify(params), {
  headers: {

    Authorization: `Bearer ${sessionStorage.getItem('token')}`,
    // ...options.headers
  },
  ...options
})
//  截取cookie str = str.replace(/\s*/g,"")
function urlToJson (str) {
  let arr = [], json = {}, att = [], avv = '';
  arr = str.split(';');
  for (var i = 0; i < arr.length; i++) {
    att.push(arr[i].replace(/\s*/g, ""))
    avv = att.join()
    //.split('=')[i].split(';')
  }
  for (var v = 0; v < att.length; v++) {
    json[att[v].split('=')[0]] = decodeURIComponent(att[v].split('=')[1]);   //// 解码 decodeURIComponent(att[0])
  }

  return json;
}

export const urlParse = function (url) {
  // let url = window.location.href;
  let target = url.indexOf("?");
  // let payUrl = url.substring(0, target);
  let payParams = url.substring(target + 1, url.length);
  // let payParams = window.location.search;
  return urlToJson(payParams);
};
export const getToken = params => postRequest('/oauth/token', params)
export const queryProductList = params => postRequestWithAuths('/product/queryProductList', params)
export const addProduct = params => postRequestWithAuths('/product/addProduct', params)