// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import VueLazyload from 'vue-lazyload'

Vue.config.productionTip = false;

Vue.use(VueAwesomeSwiper, /* { default global options } */);

Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: 'http://img0.imgtn.bdimg.com/it/u=2296543723,3333876123&fm=26&gp=0.jpg',
  loading: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1536755825607&di=40af5fa1faa77ce9b92d166c76cfcf8a&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01aa2a5715ffc932f8758c9b594176.gif',
  attempt: 1
});

router.beforeEach(function(to, ){})



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
