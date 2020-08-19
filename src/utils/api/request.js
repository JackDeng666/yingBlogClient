import axios from 'axios'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import {API_URL} from '../config'

NProgress.configure({     
  easing: 'ease',  // 动画方式    
  speed: 400,  // 递增进度条的速度    
  showSpinner: false, // 是否显示加载ico    
  trickleSpeed: 400, // 自动递增间隔    
  minimum: 0.3 // 初始化时的最小百分比
})

const instance = axios.create({
  baseURL: API_URL
})

const request = async json => {
  let {method,url,data,params} = json
  NProgress.start()
  let result
  if(method === 'get'){
    result = await instance({method, url, params, headers: {
        authorization: localStorage.getItem('jdtoken')
      }
    })
  } else {
    result = await instance({method, url, data, headers: {
        authorization: localStorage.getItem('jdtoken')
      }
    })
  }
  NProgress.done()
  return result
}

export default request
