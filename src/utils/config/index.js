// 当前环境模式
let mode = 'prod'
// API地址
const API_URL = mode === 'dev' ? 'https://localhost/' : 'https://anotherbug.cn/'
// 上传文件地址，有可能拆开
const UP_URL = mode === 'dev' ? 'https://localhost/' : 'https://anotherbug.cn/'

export {
  API_URL,
  UP_URL,
}
