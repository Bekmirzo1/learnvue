import { createRouter, createWebHistory } from "vue-router"
import HelloWorld from "@/pages/HelloWorld.vue"
import VueFor from "@/pages/VueFor.vue"
import VueForComp from "@/pages/VueForComp.vue"
import MainPage from "@/pages/MainPage.vue"
import pageStore from "@/pages/PageWithStore.vue"
import UserPage from "@/pages/UserPage.vue"
const routes = [
  {
    path: "/",
    component: MainPage,
    alias: "/home", // По ссылке /home, тоже можно заходить
  },
  {
    path: "/hello",
    component: HelloWorld,
  },
  {
    path: "/vuefor",
    component: VueFor,
  },
  {
    path: "/vueforcomp",
    component: VueForComp,
  },
  {
    path: "/pagestore",
    component: pageStore,
  },
  {
    // path: '/users/:id',
    path: "/users/:id",
    component: UserPage,
    alias: "/:id",
  },
]
/*
    {
        path: '/vueforcomp',
        component: ,
    }
*/

const router = createRouter({
  routes,
  history: createWebHistory(),
  linkActiveClass: "active-link",
  linkExactActiveClass: "exact-active",
})
export default router
