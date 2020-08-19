export default {
  changeHasLogin(state, num) { state.hasLogin = num },
  addUser(state, user) { state.userInfo = user },
  changeMusicId(state, id) { state.musicId = id },
  changeIsShowNav(state, val) { state.isShowNav = val },
  changeCanSend(state, val) { state.canSend = val },
  setSiteInfo(state, val) {state.siteInfo = val}
}