import Vue from 'vue'
import Router from 'vue-router'
import NaverMap from '../components/NaverMap'
import SensorRegist from '../components/SensorRegist'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'NaverMap',
      component: NaverMap
    },
    {
      path: '/sensorRegist',
      name: 'sensorRegist',
      component: SensorRegist
    },
    {
      path: '/sensorStatus',
      name: 'sensorStatus',
      component: NaverMap
    },
  ]
})
