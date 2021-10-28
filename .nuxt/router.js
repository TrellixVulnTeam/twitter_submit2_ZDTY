import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _2079b5d5 = () => interopDefault(import('../pages/comment.vue' /* webpackChunkName: "pages/comment" */))
const _7565a15f = () => interopDefault(import('../pages/login.vue' /* webpackChunkName: "pages/login" */))
const _f740d9f8 = () => interopDefault(import('../pages/logout.vue' /* webpackChunkName: "pages/logout" */))
const _261d1196 = () => interopDefault(import('../pages/mypage.vue' /* webpackChunkName: "pages/mypage" */))
const _5c27071d = () => interopDefault(import('../pages/register.vue' /* webpackChunkName: "pages/register" */))
const _a8840370 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/comment",
    component: _2079b5d5,
    name: "comment"
  }, {
    path: "/login",
    component: _7565a15f,
    name: "login"
  }, {
    path: "/logout",
    component: _f740d9f8,
    name: "logout"
  }, {
    path: "/mypage",
    component: _261d1196,
    name: "mypage"
  }, {
    path: "/register",
    component: _5c27071d,
    name: "register"
  }, {
    path: "/",
    component: _a8840370,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
