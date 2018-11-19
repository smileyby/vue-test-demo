## 项目拥戴less

```
npm install less less-loader axios vuex
```

base目录 页面的基础组件

components目录  页面级组件

api目录 存放所有的接口

mock目录 模拟数据放server的

## 热门图书功能

- 先写服务端，确保数据正常返回
- 增肌aapi方法，实现调取数据的功能
- 在那个组件中应用这个api，如果是一个基础组件需要用这些数据，在使用这个组件的父级中调用这个方法，将数据传递给基础组件

- node fs文件读写模块 在写文件的时候，会先把文件清空然后再重写

- restful 接口风格

/detail/:bid  路径参数 产生一个对象{bid:xxx}

## 路由元信息 控制分页面缓存

[https://router.vuejs.org/zh/guide/advanced/meta.html](https://router.vuejs.org/zh/guide/advanced/meta.html)

keep-alive 保存的是距离它最新的元素

## 下拉加载

- 默认每次5条，前端告诉后台现在要从第几条开始给
- /page?offset=5
- hasMore

## vue 优化问题 代码分割 coding split
