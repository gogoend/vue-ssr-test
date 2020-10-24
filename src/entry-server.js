// 渲染首屏幕

import createApp from './app'

// context 包含用户请求的地址？？
export default context => {
    return new Promise((resolve,reject)=>{
        const {app,router} = createApp();
        // 进入首屏
        router.push(context.url)
        router.onReady(()=>{
            resolve(app)
        },reject)
    })
}