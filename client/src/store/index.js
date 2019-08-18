import Vue from 'vue'
import Vuex from 'vuex'
import mainModule from './modules/mainModule.js'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
      mainModule,
  }
});
