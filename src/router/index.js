import Vue from 'vue'
import VueRouter from 'vue-router'
import AddBook from '../views/AddBook.vue'
import App from '../App.vue'
import Index from '../views/Index.vue'
import UpdateBook from "../views/UpdateBook";
import Login from "../views/Login";
import Home from "../views/Home";
import Chart from "../views/Chart";
import Chart2 from "../views/Chart2";
import Chart3 from "../views/Chart3";
import UpdatePrice from "../views/UpdatePrice";
import FindBook from "../views/FindBook";
import BackBook from "../views/BackBook";
import Register from "../views/Register";
import UserInfo from "../views/UserInfo";

Vue.use(VueRouter);

const routes = [
  {
    path:'/',
    show:false,
    redirect:"/login",
    component: App
  },
  {
    path:'/login',
    name: "登录",
    show:false,
    component: Login
  },
  {
    path:'/register',
    name: "注册",
    show:false,
    component: Register
  },
  {
    path: '/home',
    name: '图书管理',
    meta:{
      requireAuth:true
    },
    component: Home,
    redirect:"/book",
    show:true,
    children:[
      {
        path: '/book',
        name: '图书列表',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/Book.vue')
      },
      {
        path:'/findBook',
        name: "查询图书",
        component: FindBook
      },
      {
        path:'/addBook',
        name: "添加图书",
        component: AddBook
      },
      {
        path:'/back',
        name: "归还图书",
        component: BackBook
      },
      {
        path:'/chart3',
        name: "数据分析",
        component: Chart3
      },
      {
        path:'/userInfo',
        name: "用户信息",
        component: UserInfo
      },

    ]
  },{
    path:'/update',
    name: "修改图书",
    meta:{
      requireAuth:true
    },
    show:false,
    component: UpdateBook
  },{
    path:'/updatePrice',
    name: "修改价格",
    meta:{
      requireAuth:true
    },
    show:false,
    component: UpdatePrice
  }

];

const router = new VueRouter({
  routes
});

export default router
