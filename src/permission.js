import router from "./router";
import store from "./store";
//路由判断登录 根据路由配置文件参数

router.beforeEach((to,from,next) => {
    if (to.matched.some(record => record.meta.requireAuth)){
        const name = store.state.user.username;
        if (name){
            console.log("permission--hhh")
            if(to.path === '/login'){

            }else{
                next()
            }
        }else{
            console.log("permission--xxx")
            next({
                path:'/login'
            })
        }
    }else{
        console.log("permission--zzz")
        next()
    }
})