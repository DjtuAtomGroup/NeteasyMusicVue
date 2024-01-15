import { createRouter, createWebHistory } from 'vue-router'
import HomePage from "@/views/Home/HomePage.vue";
import FirstPage from "@/views/HomePage/FirstPage.vue";
import SecondPage from "@/views/SecondPage/SecondPage.vue";
import ThirdPage from "@/views/ThirdPage/ThirdPage.vue";
import FourthPage from "@/views/FourthPage/FourthPage.vue";
import MusicianPage from "@/views/Musician/MusicianPage.vue";
import CloudPage from "@/views/CloudPage/CloudPage.vue";
import LoginPage from "@/views/Login/LoginPage.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
      children: [
        {
          path: '',
          name: 'firstpage',
          component: FirstPage
        },
        {
          path: '/music',
          name: 'mymusic',
          component: SecondPage
        },
        {
          path: '/follow',
          name: 'myfollow',
          component: ThirdPage
        },
        {
          path: '/shop',
          name: 'shop',
          component: FourthPage
        },
        {
          path: '/musician',
          name: 'musician',
          component: MusicianPage
        },
        {
          path: '/cloud',
          name: 'cloud',
          component: CloudPage
        },
        {
          path: '/login',
          name: 'login',
          component: LoginPage
        }
      ]
    },
  ]
})
//路由拦截
router.beforeEach((to,from,next) => {
  const token = localStorage.getItem('user')
  if (token || to.path === '/login'){
    next();
  }else {
    next('/login')
  }
})
export default router
