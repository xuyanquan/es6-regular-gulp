
## 样式说明

#### 注意
+ 引入了 `mass` 库,可以使用mass中的所有函数语法。
+ 每个样式文件都应该以下划线开头 `_` ,这样不会生成文件。
+ 增加新文件,需要再`main.mcss`中注册引入文件,才能打包至运行代码中。
+ 最后生成一个main.css文件在public/css目录下, src/index.js将其打包入js。

#### 目录结构
1. _config.mcss 所有全局变量的配置文件
2. _base.mcss 全局样式文件
3. variables.mcss 字体文件变量content
4. ./components/_*.mcss 所有组件样式文件
5. ./module/_*.mcss 所有页面样式文件


#### 页面样式写法
1. 字体图标以 u-icon-XXX 样式开头
2. 组件样式以 m-XXX 样式开头
3. 页面样式以 m-页面名称-XXX 样式开头
4. 覆盖组件样式,需要在每个页面样式文件底部进行覆盖样式,比较利于查找代码。推荐组件外包一个特属类名进行覆盖,并写上注释`implement or override component style`。可参照_app.mcss底部代码。
5. 页面样式应该在页面样式下,不进行全局污染,除非提取公用样式,向上级移动,并考虑合适的类名更换。