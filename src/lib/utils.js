export const loading = flag => {
  // console.log(document.querySelector('#global-loading'))
  const loadingDom = document.querySelector('#global-loading')
  if (!loadingDom) return
  flag ?
  (loadingDom.style.display = 'flex') :
  (loadingDom.style.display = 'none')
}

export const findImg = (e) =>{
  //e.target.src = require('../assets/images/default.jpg')//默认图
}
export const findImgs = (e) =>{
  //e.target.src = require('../assets/images/school_default_logo.jpg')//默认图
}