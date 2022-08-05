<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes';
import Element from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import { mapActions } from 'vuex';

Vue.use(VueRouter);
Vue.use(Element);

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default {
  name: 'app',
  router,
  components: {
  },
  data() {
    return {
      
    }
  },
  methods :{
    ...mapActions(['getAllStudents']),
  },
  mounted() {
    this.getAllStudents();
    this.$router.push('login');
  },
}
</script>

<style lang="scss">
html {
  width: 100%;
  height: 100%;
}

body {
  height: 100%;
  width: 100%;
  margin: 0px;
}
@font-face {
  font-family: unbFont;
  src: url('./assets/ProximaNova-Regular.ttf');
}

#app {
  margin: 0px;
  width: 100%;
  height: 100%;
  font-family: unbFont;
}
</style>
