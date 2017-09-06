# 前端代码组件库

## 组件列表介绍
|组件名称|组件描述|组件用法|
| :------: | :------: | :------: |
|Check|复选组件||
|DropDown|下拉组件||
|LeftBar|左侧栏组件||
|Modal|弹窗组件||
|ModalConfirm|确认弹窗组件||
|Notify|提示组件||
|Pager|翻页组件||
|SearchBox|搜索栏组件||
|SideBar|侧栏组件||
|StripedList|列表组件||
|Tabs|Tab组件||
|TagSelect|下拉选择标签组件||
|Validator|校验器组件||

## 组件详解

#### Check
demo
``` html
<check checked={true} />
```

#### DropDown
demo
```javascript
xlist = [
    {id:1, value:'chose 1'},
    {id:2, value:'chose 2'},
    {id:3, value:'chose 3'},
    {id:4, value:'chose 4'}
]
showMode = false
```
```html
<dropdown xlist={xlist} showMode={showMode} />
```
method
* choseItem(item) 主动触发选项 
* getSelectValue(id) 根据ID获取值

#### Modal
继承自 RegularUI Modal
demo
``` javascript
let config = {
    title: '标题',
    contentTemplate: 模板,
    class: 增加类名
}
```
``` javascript
Modal
const modal = new Modal(config);
```
method
* close()

#### ModalConfirm
继承自 RegularUI Modal
method
* ModalConfirm.show(text, title)
* ModalConfirm.confirm(text, title)

#### Notify
继承自 RGUI Notify
demo
```javascript
Notify.show('显示提示', 'info', 2000);
Notify.info('显示提示', 2000);
Notify.info('显示提示');
Notify.error('危险提示');
```
method
* Notify.show(text,type,time)
* Notify.success(text,time)
* Notify.warning(text,time)
* Notify.info(text,time)
* Notify.error(text,time)
* Notify.close()
* Notify.closeAll()