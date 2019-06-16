const Koa = require('koa')
const Router = require('koa-router')
const next = require('next')
const session = require("koa-session")
const dev = process.env.NODE_ENV !== 'production'
const Redis = require("ioredis")
const auth = require("./server/auth")


const app = next({dev})
const handle = app.getRequestHandler()
const RedisSessionStore = require("./server/session-store")
const redis = new Redis()
app.prepare().then(()=>{
    const server = new Koa()
    const router = new Router()
    server.keys =["maosangzan"]
    const SESSION_CONFIG = {
        key:"jiid",
        // maxAge:60*1000,
        store:new RedisSessionStore(redis)
    }
    server.use(session(SESSION_CONFIG,server))
   //配置处理oauth登录
    auth(server)

    server.use(async (ctx,next)=>{
        // console.log(ctx.cookies.get("id"))
        // ctx.session = ctx.session || {}
        // ctx.session.user = {
        //     username:"KOL",
        //     age:15
        // }
        // if(!ctx.session.user){
        //     ctx.session.user = {
        //         username:"KOL",
        //         age:15
        //     }
        // }else{
        //     console.log("session is",ctx.session)
        // }
        await next()
        })
    router.get('/a/:id',async (ctx)=>{
        const id= ctx.params.id
        await handle(ctx.req,ctx.res,{
            pathname:"/a",
            query:{id}
        })
        ctx.respond = false
    })
    router.get('/set/user',async (ctx)=>{
        ctx.session.user = {
                    username:"KOL",
                    age:15
                }
                ctx.body = "set session success"
    })
    router.get('/delete/user',async (ctx)=>{
        ctx.session = null
        ctx.body = "set session success"
    })
    server.use(router.routes())
    server.use(async (ctx,next)=>{
        await handle(ctx.req,ctx.res)
        ctx.respond = false
    })
    server.listen(4000,()=>{
        console.log("listen to port 40000");
    })
})


