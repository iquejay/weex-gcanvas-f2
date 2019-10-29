# 介绍
> 本工程使用`weex-toolkit`创建   

weex-toolkit版本信息如下：
2.0.0-beta.31 (Core 2.0.0-beta.31)
- @weex-cli/generator : v2.0.0-beta.16
- @weex-cli/debug : v2.0.0-beta.31
- @weex-cli/compile : v2.0.0-beta.27
- @weex-cli/run : v2.0.0-beta.21
- @weex-cli/device : v2.0.0-beta.2

weex-sdk & gcanvs 版本情况
```
compile 'com.taobao.android:weex_sdk:0.18.0'
compile "com.taobao.gcanvas:corelib:1.0.4"
compile "com.taobao.gcanvas.adapters:img:1.0.0"
compile "com.taobao.gcanvas.bridges:spec:1.0.1"
compile "com.taobao.gcanvas.bridges:weex:1.0.2"
compile "com.taobao.gcanvas.adapters:img_fresco:1.0.1"
```

# 运行
安装依赖
```
npm install
```

# 真机调试
```
npm run andorid
npm run serve
```
# 问题现象
最初为折线图偶现，后来发现线条设置为`smooth`的时候异常现象特别明显且更容易复现   
具体现象见 `screenshots` 目录

![三星](https://github.com/iquejay/weex-gcanvas-f2/blob/master/screenshots/%E4%B8%89%E6%98%9F_SM-G9200_android6.0.1.png)
