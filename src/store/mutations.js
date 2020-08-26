export default {
  changeHasLogin(state, num) { state.hasLogin = num },
  addUser(state, user) { state.userInfo = user },
  changeSongListInfo(state, object) { state.songListInfo = object },
  changeIsShowNav(state, val) { state.isShowNav = val },
  changeCanSend(state, val) { state.canSend = val },
  setSiteInfo(state, val) {state.siteInfo = val}
}