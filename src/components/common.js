const $ = (ele) => {
  return document.querySelector(ele)
}
const getUrlParams = () => {
  let search = window.location.href.split('?')[1]
  let params = {}
  if (search) {
    search = search.replace(/#.+$/, '')
    if (search.length > 1) {
      let querys = search.split('&')
      let len = querys.length
      let i = 0
      while (i < len) {
        let query = querys[i].split('=')
        let key = query[0].replace(/\[\]$/, '')
        let val = decodeURIComponent(query[1])
        params[key] = val
        i++
      }
    }
  }
  return params
}

const addClass = (ele, cls) => {
  if (!hasClass(ele, cls)) {
    ele.className = ele.className == '' ? cls : ele.className + ' ' + cls;
  }
}

const hasClass = (elem, cls) => {
  cls = cls || '';
  if (cls.replace(/\s/g, '').length == 0) return false; //当cls没有参数时，返回false
  return new RegExp(' ' + cls + ' ').test(' ' + elem.className + ' ');
}
export {
  $,
  getUrlParams,
  addClass,
  hasClass
}