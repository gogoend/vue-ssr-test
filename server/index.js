// nodejs服务器
const express =require('express')
const fs = require('fs')
const app = express()

const {createBundleRenderer} = require('vue-server-renderer')

const serverBundle = require('../dist/server/vue-ssr-server-bundle.json');
const clientManifest = require('../dist/client/vue-ssr-client-manifest.json')
const renderer = createBundleRenderer(serverBundle,{
    runInNewContext: false,
    template: fs.readFileSync(__dirname+'\\..\\public\\index.temp.html','utf-8'),// 宿主模板
    clientManifest
})

app.use(express.static(__dirname+'\\..\\dist\\client',{
    index:false
}))

// '/' 改为 '*' 用于把路由交给SSR进行接管
app.get('*', async (req,res)=>{
    // 最好进行异常捕获
    try{
        const context = {
            url: req.url,
            title: 'ssr test'
        }
        // 用渲染器渲染page可以得到html内容
        const html = await renderer.renderToString(context)
        console.log(html)
        res.send(html)
    }catch(err){
        res.status(500).send("服务器内部错误")
    }
})

app.listen(3000,()=>{
    console.log('渲染服务器启动成功')
})