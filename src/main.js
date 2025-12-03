import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 1. 引入Element UI
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.config.productionTip = false
// 2. 全局注册Element UI
Vue.use(ElementUI)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
