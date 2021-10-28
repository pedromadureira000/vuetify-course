import Vue from 'vue'
import VueRouter from 'vue-router'
import Todo from '../views/Todo.vue'
import goTo from 'vuetify/lib/services/goto'
//vuetify/features/Programmatic scrolling

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Todo',
    component: Todo
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  routes
})
// once you add the 'beforeEach' method, you need to trigger the 'next' method in order to actually load the root that we trying 
// to go to in the app.
router.beforeEach((to, from, next) => {
  console.log(to)
  document.title = `${process.env.VUE_APP_TITLE} - ${ to.name }`
  next()
})

router.afterEach((to, from) => {
  goTo(0, { duration: 0 })
})

export default router
