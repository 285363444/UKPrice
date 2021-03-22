import React, { Component } from 'react';
import { Toast, Modal } from 'antd-mobile';
import { Icon } from 'antd';
import { queryProductList, addProduct } from '../../apis';
import utils from '../../utils/utils';
import 'antd/lib/icon/style/css';
import 'antd-mobile/lib/modal/style/css';
import './index.scss';

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      distList: [],//跃领计划列表
      studayPlay: [],//学科竞赛列表
      studayPlayChose: [],
      allPlay: [],//综合竞赛列表
      allPlayChose: [],
      studyUp: [],//学术提升
      studyUpChose: [],
      faceToFace: [],//g5面试题
      faceToFaceChose: [],
      Int: 0,
      daohangList: [
        { name: '学科竞赛', img: require('../../assets/images/back.jpg') },
        { name: '综合竞赛', img: require('../../assets/images/back.jpg') },
        { name: '学术提升', img: require('../../assets/images/back.jpg') },
        { name: 'G5笔面试', img: require('../../assets/images/back.jpg') }],
      choseOne: false,
      showList: [],
      daohangname: '',
      allNum: 0,
      listNum: 0,
      jianmian: 0,
      explain: false,
      showYouhui: false,
      showShareMark: false,
      showShare: false,
      imageUrl: '',
      backgImg: '',
      shareFoot: false,
    }
  }
  componentDidMount () {
    this.queryProductList()
    this.createImg()
  }
  async createImg () {
    var date = new Date();
    var YY = date.getFullYear() + '-';
    var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    var DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
    var time = YY + MM + DD
    var E2Email = sessionStorage.getItem('E2Email') || ''
    var createImg = document.createElement('canvas')
    createImg.width = 140
    createImg.height = 140
    var context = createImg.getContext('2d')
    context.font = '14px 宋体'
    context.fillStyle = 'rgba(150,150,150,0.5)'
    context.rotate(Math.PI / 6)
    // context.textAlign = 'center'
    context.fillText(E2Email, 50, 50)
    context.font = '16px 宋体'
    context.fillText(time, 50, 35)
    var shareContent = document.getElementById('shareContent')
    let backgImg = createImg.toDataURL('image/png')
    shareContent.style.backgroundImage = "url(" + backgImg + ")"
    this.setState({ backgImg })
  }

  queryProductList = async () => {
    let res = await queryProductList({ status: 0 })
    let { datas, message, status } = res
    if (datas && status === 0) {
      var a = datas[0].type
      datas.map((res, index) => {
        if (res.type === a) {

        }
      })
      var list = [];
      var studayPlay = [];
      var allPlay = [];
      var studyUp = [];
      var faceToFace = [];
      datas.map((res, index) => {
        if (res.type === '跃领计划') {
          list.push({ name: res.name, price: res.price ? Number(res.price.split('.')[0]) : 0 })
        } else if (res.type === '学科竞赛') {
          studayPlay.push({ name: res.name, price: res.price ? Number(res.price.split('.')[0]) : 0, imgShow: false, chosePrice: false })
        } else if (res.type === '综合竞赛') {
          allPlay.push({ name: res.name, price: res.price ? Number(res.price.split('.')[0]) : 0, imgShow: false, chosePrice: false })
        } else if (res.type === '学术提升') {
          studyUp.push({ name: res.name, price: res.price ? Number(res.price.split('.')[0]) : 0, imgShow: false, chosePrice: false })
        } else if (res.type === 'G5笔面试') {
          faceToFace.push({ name: res.name, price: res.price ? Number(res.price.split('.')[0]) : 0, imgShow: false, chosePrice: false })
        }
      })
      this.setState({ distList: list, studayPlay, allPlay, studyUp, faceToFace, showList: datas, listNum: Number(datas[0].price.split('.')[0]) }, () => {
        this.allNum()
      })
    } else {
      Toast.fail(message)
    }
  }
  add = async () => {
    let res = await addProduct({ type: '跃领计划', name: 'B计划', price: '59800', moduleType: 'base' })
  }
  //选择计划类型
  findjihua (res, int) {
    this.setState({ Int: int, listNum: this.state.distList[int].price }, () => {
      this.allNum()
    })
  }
  //选择底部的类型
  findstudyList (res) {
    let { studayPlay, allPlay, studyUp, faceToFace } = this.state
    if (res.name === '学科竞赛') {
      this.setState({ choseOne: true, showList: studayPlay, daohangname: res.name })
    } else if (res.name === '综合竞赛') {
      this.setState({ choseOne: true, showList: allPlay, daohangname: res.name })
    } else if (res.name === '学术提升') {
      this.setState({ choseOne: true, showList: studyUp, daohangname: res.name })
    } else if (res.name === 'G5笔面试') {
      this.setState({ choseOne: true, showList: faceToFace, daohangname: res.name })
    }

  }
  addjilu (int) {
    let { daohangname, studayPlay, allPlay, studyUp, faceToFace } = this.state
    if (daohangname === '学科竞赛') {
      studayPlay[int].imgShow = !studayPlay[int].imgShow
      this.setState({ studayPlay })
    } else if (daohangname === '综合竞赛') {
      allPlay[int].imgShow = !allPlay[int].imgShow
      this.setState({ allPlay })
    } else if (daohangname === '学术提升') {
      studyUp[int].imgShow = !studyUp[int].imgShow
      this.setState({ studyUp })
    } else if (daohangname === 'G5笔面试') {
      faceToFace[int].imgShow = !faceToFace[int].imgShow
      this.setState({ faceToFace })
    }
  }
  //关闭model框
  newsClose () {
    let { studayPlay, allPlay, studyUp, faceToFace } = this.state
    var studayPlays = []
    var allPlays = []
    var studyUps = []
    var faceToFaces = []
    studayPlay.map(res => {
      studayPlays.push({
        ...res,
        imgShow: false,
      })
    })
    allPlay.map(res => {
      allPlays.push({
        ...res,
        imgShow: false,
      })
    })
    studyUp.map(res => {
      studyUps.push({
        ...res,
        imgShow: false,
      })
    })
    faceToFace.map(res => {
      faceToFaces.push({
        ...res,
        imgShow: false,
      })
    })
    this.setState({ daohangname: '', choseOne: false, studayPlay: studayPlays, allPlay: allPlays, studyUp: studyUps, faceToFace: faceToFaces })
  }
  //确定model框
  newsYes () {
    let { daohangname, studayPlay, studayPlayChose, allPlay, allPlayChose, studyUp, studyUpChose, faceToFace, faceToFaceChose } = this.state
    if (daohangname === '学科竞赛') {
      var studayPlayChoses = []
      var studayPlays = []
      studayPlay.map((res, index) => {
        if (res.imgShow) {
          studayPlayChoses.push({ ...res })
        } else {
          studayPlays.push({ ...res })
        }
      })
      studayPlayChoses = studayPlayChoses.concat(studayPlayChose)
      this.setState({ choseOne: false, studayPlayChose: studayPlayChoses, studayPlay: studayPlays }, () => {
        this.allNum()
      })
    } else if (daohangname === '综合竞赛') {
      var allPlayChoses = []
      var allPlays = []
      allPlay.map((res, index) => {
        if (res.imgShow) {
          allPlayChoses.push({ ...res })
        } else {
          allPlays.push({ ...res })
        }
      })
      allPlayChoses = allPlayChoses.concat(allPlayChose)
      this.setState({ choseOne: false, allPlayChose: allPlayChoses, allPlay: allPlays }, () => {
        this.allNum()
      })
    } else if (daohangname === '学术提升') {
      var studyUpChoses = []
      var studyUps = []
      studyUp.map((res, index) => {
        if (res.imgShow) {
          studyUpChoses.push({ ...res })
        } else {
          studyUps.push({ ...res })
        }
      })
      studyUpChoses = studyUpChoses.concat(studyUpChose)
      this.setState({ choseOne: false, studyUpChose: studyUpChoses, studyUp: studyUps }, () => {
        this.allNum()
      })
    } else if (daohangname === 'G5笔面试') {
      var faceToFaceChoses = []
      var faceToFaces = []
      faceToFace.map((res, index) => {
        if (res.imgShow) {
          faceToFaceChoses.push({ ...res })
        } else {
          faceToFaces.push({ ...res })
        }
      })
      faceToFaceChoses = faceToFaceChoses.concat(faceToFaceChose)
      this.setState({ choseOne: false, faceToFaceChose: faceToFaceChoses, faceToFace: faceToFaces }, () => {
        this.allNum()
      })
    }

  }
  //清空展示列表数据
  closeChose (e) {
    let { studayPlay, studayPlayChose, allPlay, allPlayChose, studyUp, studyUpChose, faceToFace, faceToFaceChose } = this.state
    if (e === '学科竞赛') {
      var studayPlays = []
      studayPlayChose.map(res => {
        studayPlays.push({
          ...res,
          imgShow: false,
          chosePrice: false,
        })
      })
      studayPlays = studayPlays.concat(studayPlay)
      this.setState({ studayPlayChose: [], studayPlay: studayPlays }, () => {
        this.allNum()
      })
    } else if (e === '综合竞赛') {
      var allPlays = []
      allPlayChose.map(res => {
        allPlays.push({
          ...res,
          imgShow: false,
          chosePrice: false,
        })
      })
      allPlays = allPlays.concat(allPlay)
      this.setState({ allPlayChose: [], allPlay: allPlays }, () => {
        this.allNum()
      })
    } else if (e === '学术提升') {
      var studyUps = []
      studyUpChose.map(res => {
        studyUps.push({
          ...res,
          imgShow: false,
          chosePrice: false,
        })
      })
      studyUps = studyUps.concat(studyUp)
      this.setState({ studyUpChose: [], studyUp: studyUps }, () => {
        this.allNum()
      })
    } else if (e === 'G5笔面试') {
      var faceToFaces = []
      faceToFaceChose.map(res => {
        faceToFaces.push({
          ...res,
          imgShow: false,
          chosePrice: false,
        })
      })
      faceToFaces = faceToFaces.concat(faceToFace)
      this.setState({ faceToFaceChose: [], faceToFace: faceToFaces }, () => {
        this.allNum()
      })
    }
  }
  choseprice (e, int) {
    let { studayPlayChose, allPlayChose, studyUpChose, faceToFaceChose } = this.state
    switch (e) {
      case '学科竞赛':
        var a = studayPlayChose[int].chosePrice
        studayPlayChose[int].chosePrice = !a
        this.setState({ studayPlayChose }, () => {
          this.allNum()
        })
        break;
      case '综合竞赛':
        var a = allPlayChose[int].chosePrice
        allPlayChose[int].chosePrice = !a
        this.setState({ allPlayChose }, () => {
          this.allNum()
        })
        break;
      case '学术提升':
        var a = studyUpChose[int].chosePrice
        studyUpChose[int].chosePrice = !a
        this.setState({ studyUpChose }, () => {
          this.allNum()
        })
        break;
      case 'G5笔面试':
        var a = faceToFaceChose[int].chosePrice
        faceToFaceChose[int].chosePrice = !a
        this.setState({ faceToFaceChose }, () => {
          this.allNum()
        })
        break;
    }
  }
  allNum () {
    let { listNum, studayPlayChose, allPlayChose, studyUpChose, faceToFaceChose } = this.state
    var studayPlay = 0
    studayPlayChose.map(res => {
      studayPlay = studayPlay + (!res.chosePrice && res.price || 0)
    })
    allPlayChose.map(res => {
      studayPlay = studayPlay + (!res.chosePrice && res.price || 0)
    })
    studyUpChose.map(res => {
      studayPlay = studayPlay + (!res.chosePrice && res.price || 0)
    })
    faceToFaceChose.map(res => {
      studayPlay = studayPlay + (!res.chosePrice && res.price || 0)
    })
    var allNum = studayPlay + listNum
    if (50000 <= allNum && allNum < 80000) {
      allNum = allNum - 3000
      this.setState({ allNum: allNum, jianmian: 3000, showYouhui: false })
    } else if (80000 <= allNum && allNum < 100000) {
      allNum = allNum - 4000
      this.setState({ allNum, jianmian: 4000, showYouhui: false })
    } else if (100000 <= allNum && allNum < 150000) {
      allNum = allNum - 5000
      this.setState({ allNum, jianmian: 5000, showYouhui: false })
    } else if (150000 <= allNum && allNum < 180000) {
      allNum = allNum - 6000
      this.setState({ allNum, jianmian: 6000, showYouhui: false })
    } else if (180000 <= allNum) {
      allNum = allNum - 10000
      this.setState({ allNum, jianmian: 10000, showYouhui: false })
    } else {
      this.setState({ allNum, jianmian: 0, showYouhui: true })
    }
  }
  //说明开关
  explain (e) {
    this.setState({ explain: e })
  }
  //分享
  share () {
    this.setState({ showShare: true }, () => {
      this.handleCapture()
    })
  }


  handleClose (boolValue) {
    if (boolValue) {
      this.setState({ showShareMark: boolValue })
    } else {
      this.setState({ showShareMark: boolValue, showShare: false, shareFoot: false })
    }
    const shareContent = document.getElementById('shareContentImg')
    shareContent.style.backgroundImage = ''
    const insertCanvas = document.getElementById('insertCanvas')
    const removeCanvas = insertCanvas.getElementsByTagName('img')[0]
    if (removeCanvas) {
      insertCanvas.removeChild(removeCanvas)
    }
  }

  async handleCapture () {
    this.handleClose(true)
    await this.setState({ shareFoot: true })
    const shareContent = document.getElementById('shareContentImg')
    shareContent.style.backgroundImage = "url(" + this.state.backgImg + ")"
    const insertCanvas = document.getElementById('insertCanvas')
    const canvas = await window.html2canvas(shareContent, {
      allowTaint: true,
      scale: 1,
      useCORS: true, // 允许图片跨域
      taintTest: true, // 在渲染前测试图片
      timeout: 500, // 加载延时
      logging: true
    })
    const imageUrl = await canvas.toDataURL('image/png').replace("data:image/png;base64,", "")
    const imageUrls = canvas.toDataURL('image/jpeg', 1)
    const dataImg = new Image()
    dataImg.src = imageUrls
    insertCanvas.appendChild(dataImg)
    this.setState({ imageUrl, })
  }
  shareNav (num) {
    var that = this
    var imageUrl = this.state.imageUrl
    window.Cordova.exec(function () {
      that.handleClose(false)
      //成功回调
    }, function (error) {
      //失败回调
      that.handleClose(false)
    }, "XDFShare", "xdfShareImg", [imageUrl, num]);
  }
  saveImageToPhone () {
    const { imageUrl } = this.state
    const a = document.createElement('a')
    a.href = imageUrl
    a.download = '老客户分享'
    a.click()
    window.URL.revokeObjectURL(imageUrl)
  }





  render () {
    let { showShareMark, distList, Int, daohangList, choseOne, showList, studayPlayChose, allPlayChose, studyUpChose, faceToFaceChose, allNum,
      jianmian, explain, showYouhui, showShare, backgImg, shareFoot } = this.state
    return (
      <div className="home" id='shareContent'>
        <div className="home-top"></div>
        {!showShare ? <div className="home-head">
          <div className="home-headO">
            <img className="home-headO-img" src={require('../../assets/images/book.png')}></img>
            <p className="home-headO-p" onClick={this.add.bind(this)}>跃领计划</p>
          </div>
          <div className="home-headT">
            {distList.length !== 0 ? distList.map((res, index) => {
              return <div key={res.name}
                onClick={this.findjihua.bind(this, res, index)}
                className={Int === index ? 'home-headTO home-headTChose' : 'home-headTO'}>
                {res.name}
              </div>
            }) : null}
          </div>
        </div> : null}
        <div className={`share-layer ${showShareMark ? '' : 'share-hide'}`}>
          <Icon type="close-circle" className="share-layer-close" onClick={this.handleClose.bind(this, false)} />
          <div id="insertCanvas" className="insert-canvas" />
          {/* <div className="share-opt-hint">长按图片保存后分享</div> */}
        </div>
        {!showShare ? <div className="home-bodyO">
          {daohangList.length !== 0 ? daohangList.map((res, index) => {
            return <div className="home-bodyOList" key={res.name} onClick={this.findstudyList.bind(this, res)}>
              <div className='home-bodyOList-position'>{res.name}
                {/* <img className='bodyOList-position-img' src={require('../../assets/images/backHead.png')}></img> */}
                {/* <p className={res.name.length < 5 ? 'bodyOList-position-p' : ''}>{res.name}</p> */}
              </div>
              <img className="home-bodyOList-img" src={res.img}></img>
            </div>
          }) : null}
        </div> : null}
        <div>
          <div className="home-bodyOBon"></div>
          <div className="home-bodyT" style={{ top: showShare ? '25px' : '' }}>
            <div id='shareContentImg'>
              {shareFoot ? <div style={{ height: '20px', background: '#ececec' }}></div> : null}
              {studayPlayChose.length !== 0 ? <div className="home-bodyTZW">
                <div className="home-bodyT-head">
                  <img className="home-bodyT-head-img" src={require('../../assets/images/book.png')}></img>
                  <p className="home-bodyT-head-p">学科竞赛</p>
                  <div className="home-bodyT-head-btn" onClick={this.closeChose.bind(this, '学科竞赛')}>清空</div>
                </div>
                {studayPlayChose.map((res, index) => {
                  return <div key={res.name} className="home-bodyT-body">
                    <div className="home-bodyT-body-box">
                      <img className="home-bodyT-body-img" onClick={this.choseprice.bind(this, '学科竞赛', index)} src={require(res.chosePrice ? '../../assets/images/cemterNo.png' : '../../assets/images/cemter.png')}></img>
                      <div className="home-bodyT-body-p">{res.name}</div>
                    </div>
                    <div className="home-bodyT-body-price">￥{res.price}&nbsp;&nbsp;&nbsp;</div>
                  </div>
                })}
                <div className="home-bodyT-foot"></div>
              </div> : null}
              {allPlayChose.length !== 0 ? <div className="home-bodyTZW">
                <div className="home-bodyT-head">
                  <img className="home-bodyT-head-img" src={require('../../assets/images/book.png')}></img>
                  <p className="home-bodyT-head-p">综合竞赛</p>
                  <div className="home-bodyT-head-btn" onClick={this.closeChose.bind(this, '综合竞赛')}>清空</div>
                </div>
                {allPlayChose.map((res, index) => {
                  return <div key={res.name} className="home-bodyT-body">
                    <div className="home-bodyT-body-box">
                      <img className="home-bodyT-body-img" onClick={this.choseprice.bind(this, '综合竞赛', index)} src={require(res.chosePrice ? '../../assets/images/cemterNo.png' : '../../assets/images/cemter.png')}></img>
                      <div className="home-bodyT-body-p">{res.name}</div>
                    </div>
                    <div className="home-bodyT-body-price">￥{res.price}&nbsp;&nbsp;&nbsp;</div>
                  </div>
                })}
                <div className="home-bodyT-foot"></div>
              </div> : null}
              {studyUpChose.length !== 0 ? <div className="home-bodyTZW">
                <div className="home-bodyT-head">
                  <img className="home-bodyT-head-img" src={require('../../assets/images/book.png')}></img>
                  <p className="home-bodyT-head-p">学术提升</p>
                  <div className="home-bodyT-head-btn" onClick={this.closeChose.bind(this, '学术提升')}>清空</div>
                </div>
                {studyUpChose.map((res, index) => {
                  return <div key={res.name} className="home-bodyT-body">
                    <div className="home-bodyT-body-box">
                      <img className="home-bodyT-body-img" onClick={this.choseprice.bind(this, '学术提升', index)} src={require(res.chosePrice ? '../../assets/images/cemterNo.png' : '../../assets/images/cemter.png')}></img>
                      <div className="home-bodyT-body-p">{res.name}</div>
                    </div>
                    <div className="home-bodyT-body-price">￥{res.price}&nbsp;&nbsp;&nbsp;</div>
                  </div>
                })}
                <div className="home-bodyT-foot"></div>
              </div> : null}
              {faceToFaceChose.length !== 0 ? <div className="home-bodyTZW">
                <div className="home-bodyT-head">
                  <img className="home-bodyT-head-img" src={require('../../assets/images/book.png')}></img>
                  <p className="home-bodyT-head-p">G5笔面试</p>
                  <div className="home-bodyT-head-btn" onClick={this.closeChose.bind(this, 'G5笔面试')}>清空</div>
                </div>
                {faceToFaceChose.map((res, index) => {
                  return <div key={res.name} className="home-bodyT-body">
                    <div className="home-bodyT-body-box">
                      <img className="home-bodyT-body-img" onClick={this.choseprice.bind(this, 'G5笔面试', index)} src={require(res.chosePrice ? '../../assets/images/cemterNo.png' : '../../assets/images/cemter.png')}></img>
                      <div className="home-bodyT-body-p">{res.name}</div>
                    </div>
                    <div className="home-bodyT-body-price">￥{res.price}&nbsp;&nbsp;&nbsp;</div>
                  </div>
                })}
                <div className="home-bodyT-foot"></div>
              </div> : null}
              {shareFoot ? <div className="home-footPositionImg">
                <div className="home-footPosition-img">
                  <img className="home-footPosition-images" src={require('../../assets/images/cemter.png')}></img>
                </div>
                <div className="home-footPositionAllnum"><span style={{ fontSize: '0.12rem' }}>优惠后合计：</span>￥{allNum}</div>
                {!showYouhui ? <div className="home-footPositionsmoleNum">&nbsp;优惠：{jianmian}</div> : null}
              </div> : null}
            </div>
          </div>
        </div>
        <Modal
          popup
          visible={choseOne}
          animationType="slide-up"
          className='modal-bottom'>
          <div className='modal-bottom-head'>
            <p className='modal-bottom-head-p' onClick={this.newsClose.bind(this)}>取消</p>
            <p className='modal-bottom-head-p' onClick={this.newsYes.bind(this)} style={{ color: 'white', background: '#1abc9c' }}>确定</p>
          </div>
          <div className='modal-bottom-show'></div>
          <div>
            {showList.length !== 0 ? showList.map((res, index) => {
              return <div key={res.name} className='modal-bottom-body' onClick={this.addjilu.bind(this, index)}>
                <p className='modal-bottom-body-p'>&nbsp;&nbsp;{res.name}</p>
                <div className='modal-bottom-body-div'>
                  <p>￥{res.price}</p>
                  {res.imgShow ? <img className='modal-bottom-body-img' src={require("../../assets/images/right.png")}></img> : <span className='modal-bottom-body-img'></span>}
                </div>
              </div>
            }) : <div style={{ marginTop: '20px' }}>暂无可选产品</div>}
          </div>
        </Modal>
        <div className="home-footPosition">
          <div className="home-footPosition-img">
            <img className="home-footPosition-images" src={require('../../assets/images/cemter.png')}></img>
          </div>
          <div className="home-footPositionAllnum"><span style={{ fontSize: '0.12rem' }}>优惠后合计：</span>￥{allNum}</div>
          {!showYouhui ? <><div className="home-footPositionsmoleNum">&nbsp;优惠：{jianmian}</div>
            <div className="home-footPosition-ask" onClick={this.explain.bind(this, true)}>说明</div></> : null}
          <div className="home-footPosition-btn" onClick={this.share.bind(this)}>分享</div>
        </div>
        {shareFoot ? <div className="explain-footer">
          <div onClick={this.shareNav.bind(this, 1)} className="explain-footer-box">
            <img className="explain-footer-img" src={require('../../assets/images/weixin.png')}></img>
            <p>微信</p>
          </div>
          <div onClick={this.shareNav.bind(this, 2)} className="explain-footer-box">
            <img className="explain-footer-img" src={require('../../assets/images/findes.png')}></img>
            <p>朋友圈</p>
          </div>
        </div> : null}
        <Modal
          popup
          visible={explain}
          animationType="slide-up"
          className='explain-bottom'>
          <div className='explain-box'>
            <div className='explain-head' style={{ textAlign: "center" }}>
              <img onClick={this.explain.bind(this, false)} src={require('../../assets/images/down.png')}></img>
            </div>
            <div className='explain-headTw'>
              <p className='explain-headTw-p'></p>
              <p>优惠方案</p>
              <p className='explain-headTw-p'></p>
            </div>
            <div className='explain-headTw-div explain-headTw-divO'>【跃领计划于英本背景提升项目优惠说明】</div>
            <div className='explain-headTw-div' style={{ marginBottom: '10px' }}>任一跃领计划本科版服务与英本背景提升项目组合签约，可享金额优惠方案如下：</div>
            <div className='explain-headTw-div'>1、签约金额总计达50,000元及以上：跃领计划本科版合同优惠上限3,000元；</div>
            <div className='explain-headTw-div'>2、签约金额总计达80,000元及以上：跃领计划本科版合同优惠上限4,000元；</div>
            <div className='explain-headTw-div'>3、签约金额总计达100,000元及以上：跃领计划本科版合同优惠上限5,000元；</div>
            <div className='explain-headTw-div'>4、签约金额总计达150,000元及以上：跃领计划本科版合同优惠上限6,000元；</div>
            <div className='explain-headTw-div'>5、签约金额总计达180,000元及以上；跃领计划本科版合同优惠上限10,000元。</div>
            <div className='explain-headTw-div explain-headTw-divO'>【针对学校语培项目的特殊优惠说明】</div>
            <div className='explain-headTw-div' style={{ marginTop: '20px' }}>跃领计划本科版-B计划与英本精英计划、前途英本背景提升项目同时签约，跃领计划本科版B计划优惠上限20,000元。</div>
          </div>
        </Modal>
        {/* <div className="home-foot"></div> */}
      </div>
    )
  }
}
export default Home