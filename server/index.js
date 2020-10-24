// nodejs服务器
const express =require('express')
const Vue = require('vue')

const app = express()

const renderer = require('vue-server-renderer').createRenderer()

const page = new Vue({
    template: '<h1>Hello</h1>'
})

app.get('/', async (req,res)=>{
    // 最好进行异常捕获
    try{
        // 用渲染器渲染page可以得到html内容
        const html = await renderer.renderToString(page)
        console.log(html)
        res.send(html)
    }catch(err){
        res.status(500).send("服务器内部错误")
    }
})

app.listen(3000,()=>{
    console.log('渲染服务器启动成功')
})