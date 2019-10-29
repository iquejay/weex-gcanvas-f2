/* global Vue */
import Router from 'vue-router'
import chart from '@/pages/chart'

Vue.use(Router)

export const router = new Router({
  routes: [
    {
      path: '/',
      name: 'chart',
      component: chart
    }
  ]
})
