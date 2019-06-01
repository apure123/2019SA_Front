## 2019SA 前端说明文档

  **一些说明：**
 
6.1发布，应该跟最终版本差不多了，目前由于测试数据原因，有一个地方前端加上了但是没数据可测：**在个人中心页，对已收到的消息进行回复的操作**


----------


* 运行环境依赖（装好nodejs和yarn的可以跳过）

1. 安装nodejs：点击[安装教程](https://www.runoob.com/nodejs/nodejs-install-setup.html)去安装nodejs

2. 安装yarn：执行指令即可

``` shell
npm install -g yarn
```

----------


* 项目启动方式：

 
 1.首先在demo1目录下，执行**yarn install** 安装依赖
 
 2.事先在本地启动后端的server
 
 3.在FrontEnd\demo1\src\redux\store\store.js 文件中删除这一行代码：()



``` javascript
export const store=createStore(rootReducer,
    compose(
        applyMiddleware(...[thunk]), // 需要使用的中间件数组
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    ))

```
把这里从注释前的逗号开始删除，改成下面这样：

``` javascript
export const store=createStore(rootReducer,
    compose(
        applyMiddleware(...[thunk]) // 需要使用的中间件数组
    ))
```

 
 
 4.执行 **yarn start** 或者 **npm start** 启动项目


----------
 