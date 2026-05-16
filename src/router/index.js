import { route } from 'quasar/wrappers'
import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory
} from 'vue-router'

import routes from './routes'
import { useAuthStore } from 'src/stores/authStore'

export default route(function () {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === 'history'
      ? createWebHistory
      : createWebHashHistory

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,
    history: createHistory(process.env.VUE_ROUTER_BASE)
  })

  Router.beforeEach((to) => {
    const authStore = useAuthStore()

    const publicRoutes = ['login', 'register']

    const securityRoutes = ['security-word']

    const contractRoutes = ['contract-acceptance', 'contract-blocked']

    if (publicRoutes.includes(to.name)) {
      return true
    }

    if (securityRoutes.includes(to.name)) {
      if (!authStore.needsSecurityVerification) {
        return { name: 'login' }
      }

      return true
    }

    if (!authStore.isAuthenticated) {
      return { name: 'login' }
    }

    const needsContract = !authStore.hasAcceptedContract

    if (needsContract && !contractRoutes.includes(to.name)) {
      return { name: 'contract-acceptance' }
    }

    if (!needsContract && to.name === 'contract-acceptance') {
      return { name: 'dashboard' }
    }

    return true
  })

  return Router
})
