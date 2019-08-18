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
    ...mapActions(['getLogin', 'getAllStudents']),
  },
  mounted() {
    this.getLogin();
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
#app {
  margin: 0px;
  width: 100%;
  height: 100%;
  background-image: linear-gradient(
    rgba(200,200,200,0),
    rgba(200, 200, 200, 0.1),
    rgba(200, 200, 200, 0.4)
    ), url(./assets/ISAOBackground.jpg);
  background-color: linear-gradient(
    rgba(213, 67, 37, 1),
    rgba(213, 67, 37, 0.1),
    rgba(213, 67, 37, 0.4),
  );
  background-repeat: no-repeat;
  background-size: cover;
  overflow: hidden;
  font-family: Helvetica;
}
</style>
