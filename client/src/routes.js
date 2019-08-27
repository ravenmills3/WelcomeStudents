const routes = [
    {
      path: '/login',
      name: 'login',
      component(resolve) {
        require(['./views/Login.vue'], resolve);
      },
    }, {
      path: '/welcome',
      name: 'welcome',
      component(resolve) {
        require(['./views/Welcome.vue'], resolve);
      },
    }, {
      path: '/',
      name: 'home',
      component(resolve) {
        require(['./views/Login.vue'], resolve);
      },
    }, {
      path: '/check',
      name: 'check',
      component(resolve) {
        require(['./views/CheckIn.vue'], resolve);
      },
    },
  ];
  export default routes;
  