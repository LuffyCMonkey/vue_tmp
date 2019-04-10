import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'
import BlockImage from '../views/BlockImage.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',

  routes: [

    // loads Home component
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/blockImage',
      name: 'blockImage',
      component: BlockImage
    },
    {
      path: '/page/:sectionSlug',
      name: 'dynamicContent',
      // route level code-splitting
      // this generates a separate chunk (dynamicContent.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: function () {
        import(/* webpackChunkName: "dynamicContent" */ '../views/DynamicContent.vue')
      }
    }

  ]
})
