import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Dashboard from '../views/Dashboard.vue'
import Register from '../views/Register.vue'
import SurveyView from '../views/SurveyView.vue'
import Surveys from '../views/Surveys.vue'
import DefoultLayout from '../components/DefaultLayout.vue'
import AuthLayout from '../components/AuthLayout.vue'
import store from "@/store/index.js";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect:'/dashboard',
      name: 'Dashboard',
      component: DefoultLayout,
        meta:{requiresAuth:true},
        children:[
            {
                path:'/dashboard',
                name:'Dashboard',
                component:Dashboard,
            },
            {
                path:'/surveys',
                name:'Surveys',
                component:Surveys,
            },
            {
                path:'/surveys/create',
                name:'SurveyCreate',
                component:SurveyView,
            },
            {
                path:'/surveys/:id',
                name:'SurveyView',
                component:SurveyView,
            }
        ]
    },
      {
          path:'/auth',
          redirect:'/login',
          name:'Auth',
          component:AuthLayout,
          meta:{isGuest:true},
          children:[
              {
                  path: '/login',
                  name: 'Login',
                  component: Login
              },
              {
                  path: '/register',
                  name: 'Register',
                  component: Register
              },
          ]
      }
  ]
})
router.beforeEach((to,from,next)=>{
        if(to.meta.requiresAuth && !store.state.user.token)
        {
            next({name:'Login'});
        }else if(store.state.user.token && to.meta.isGuest)
          {
            next({name:'Dashboard'});
         }
        else {
            next();
        }
})

export default router
