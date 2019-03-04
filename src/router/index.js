import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Home from '@/components/Home'
import TruckMana from '@/components/truck/TruckMana'
import TruckTeam from '@/components/truck/TruckTeam'
import Drivers from '@/components/drivers/Drivers'
import DriverSearch from '@/components/search/DriverSearch'
import History from '@/components/search/History'
import Scheduling from '@/components/scheduling/Scheduling'
import ReceiveOrder from '@/components/task/ReceiveOrder'
import WriteOrder from '@/components/task/WriteOrder'
import Cost from '@/components/cost/Cost'
import Coststatistic from '@/components/cost/Coststatistic'
import Log from '@/components/sys/Log'
import Sys from '@/components/sys/Sys'
import User from '@/components/sys/User'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      hidden: true,
      component: Login
    }, {
      path: '/home',
      name: 'Home',
      hidden: true,
      component: Home
    }, {
      path: '/home',
      name: '车辆管理',
      component: Home,
      meta: {
        role:['运输管理员']
      },
      children: [
        {
          path: '/truckmana',
          name: '车辆管理',
          component: TruckMana
        },{
          path: '/truckteam',
          name: '车队管理',
          component: TruckTeam
        }
      ]
    }, {
      path: '/home',
      name: '驾驶员管理',
      component: Home,
      meta: {
        role:['运输管理员']
      },
      children: [
        {
          path: '/drivers',
          name: '驾驶员管理',
          component: Drivers
        }
      ]
    }, {
      path: '/home',
      name: '运力查询',
      component: Home,
      meta: {
        role:['调度员']
      },
      children: [
        {
          path: '/driversearch',
          name: '运力查询',
          component: DriverSearch
        },{
          path: '/history',
          name: '历史承运查询',
          component: History
        }
      ]
    }, {
      path: '/home',
      name: '调度任务',
      component: Home,
      meta: {
        role:['调度员']
      },
      children: [
        {
          path: '/scheduling',
          name: '调度承运任务',
          component: Scheduling
        }
      ]
    }, {
      path: '/home',
      name: '承运任务管理',
      component: Home,
      meta: {
        role:['承运业务员']
      },
      children: [
        {
          path: '/writeorder',
          name: '承运单开出',
          component: WriteOrder
        },{
          path: '/receiveorder',
          name: '承运单接收',
          component: ReceiveOrder
        }
      ]
    }, {
      path: '/home',
      name: '运输成本核算',
      component: Home,
      meta: {
        role:['财务人员']
      },
      children: [
        {
          path: '/cost',
          name: '运输成本维护',
          component: Cost
        },{
          path: '/coststatistic',
          name: '运输成本核算',
          component: Coststatistic
        }
      ]
    }, {
      path: '/home',
      name: '系统维护',
      component: Home,
      meta: {
        role:['系统管理员']
      },
      children: [
        {
          path: '/user',
          name: '用户管理',
          component: User
        },{
          path: '/log',
          name: '日志管理',
          component: Log
        },{
          path: '/sys',
          name: '系统管理',
          component: Sys
        }
      ]
    }
    ]
})
