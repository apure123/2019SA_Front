## 2019SA 前端说明文档

 ** 一些说明：**
 
 高级搜索的表单还没写，先用注册框代替
 接口订好了的话可以帮忙改改专家页和文章页
 启动之后不用登录，直接在url后面加/systerm进入系统页
 点击“专家门户”就能看到专家页(输url访问也行)
 ![enter description here](./images/f45f4fb3c511c90bbd1f0de6fc7c05a.png)
 
 文章页：链接是/systerm/article
 
![c064ea18fa32e080e8e98e5171f3ac7](./images/c064ea18fa32e080e8e98e5171f3ac7.png)


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
 ![enter description here](./images/redux工具删除.png)
 

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
 