import jwt_decode from "jwt-decode"
import { User } from "../utils/api"

//设置时间
const initDate = (oldDate,full) => {
  let odate = new Date(oldDate);
  let year =  odate.getFullYear();
  let month = odate.getMonth() < 9 ? '0' + (odate.getMonth()+1) : odate.getMonth()+1;
  let date = odate.getDate() < 10 ? '0' + odate.getDate() : odate.getDate();
  let hours = odate.getHours() < 10 ? '0' + odate.getHours() : odate.getHours();
  let minutes = odate.getMinutes() < 10 ? '0' + odate.getMinutes() : odate.getMinutes();
  let seconds = odate.getSeconds() < 10 ? '0' + odate.getSeconds() : odate.getSeconds();
  
  if(full == 'all'){
    return year+'-'+month+'-'+date+" "+hours+":"+minutes+":"+seconds;
  }else if(full == 'year'){
    return year
  }else if(full == 'month'){
    return odate.getMonth()+1
  }else if(full == 'date'){
    return date
  }else if(full == 'ymd'){
    return year+'-'+month+'-'+date;
  }
}
// 添加登录用户token
const addUserToken = async (token, addUser) => {
  localStorage.setItem('jdtoken',token)
  const decode = jwt_decode(token)
  let result = await User.getUserInfo({getBy:decode.userInfo.email})
  addUser(result.data.data.userInfo)
}

export {
  initDate,      //设置时间
  addUserToken
}
