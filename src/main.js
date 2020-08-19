// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import { Pagination,Button,Row,Col,Upload,Message,Radio,Collapse,CollapseItem, Dialog } from "element-ui"
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/globalStyle.css'

import App from './App'
import router from './router'
import store from './store'

Vue.config.productionTip = false
Vue.use(Pagination).use(Button).use(Row).use(Col).use(Upload)
.use(Radio).use(Collapse).use(CollapseItem).use(Dialog)

Vue.prototype.$message = Message

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app")
