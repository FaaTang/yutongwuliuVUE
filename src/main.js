// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import {getRequest} from "./utils/api";
import {postRequest} from "./utils/api";
import {putRequest} from "./utils/api";
import {deleteRequest} from "./utils/api";
import {postKeyValueRequest} from "./utils/api";

Vue.config.productionTip = false
Vue.prototype.getRequest=getRequest;
Vue.prototype.postRequest=postRequest;
Vue.prototype.putRequest=putRequest;
Vue.prototype.deleteRequest=deleteRequest;
Vue.prototype.postKeyValueRequest=postKeyValueRequest;
Vue.use(ElementUI);
router.beforeEach((to,from,next)=>{
  if (to.path=='/'||window.sessionStorage.getItem("user")){
    next();
  } else {
    next('/');
  }

})
/* eslint-disable no-new */
//添加一行注释111
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
