/**
 * 斑马纹列表组件
 */


const html = require('./stripedlist.html');
require('../searchbox/searchbox');

module.exports = Regular.extend({
    template: html,

    name: 'stripedlist',

    // 配置参数
    data: {
        // 列表过滤函数
        filter: function (xlist) {
            return xlist;
        },
        // 列表数据
        xlist: [],
        // 表头数据，例如：
        // headers: [
        //     {
        //         name: '名称',
        //         key: 'name',
        //         valueType: 'name',
        //         searchable: true,
        //         useClickEvent: true //点击时是否发出事件
        //     },
        //     {
        //         name: '平台',
        //         key: 'platform',
        //         searchable: true
        //     }
        // ]
        headers: [],
        // 行尾操作数据，例如：
        // listActions:[
        //     {
        //         name: '编辑',
        //         key: 'create',
        //         useClickEvent: true, //点击时是否发出事件
        //         getValue:function(header,item,itemState){return 'value'}, //列数据处理函数
        //         getTitle:function(header,item,itemState){return 'title'}, //列数据title处理函数
        //     },
        //     {
        //         name: '删除',
        //         key: 'delete',
        //         useClickEvent: true
        //     }
        // ]
        listActions: [
            {
                name: '编辑',
                key: 'edit',
                class: '',
                useClickEvent: true
            },
            {
                name: '删除',
                key: 'delete',
                class: '',
                useClickEvent: true,
                highlight: false
            }
        ],
        // 是否需要【搜索框】
        search: true,
        // 【搜索框】内提示文本
        searchText: '搜索',
        // 是否需要【批量删除按钮】
        batDelete: false,
        // 【批量删除按钮】文案
        batDeleteText: '批量删除',
        // 是否展示为编辑历史样式
        isHistoryMode: false,
        // 没有数据时的提示文案
        noItemTip: '暂无数据',
    },

    config: function (data) {

        if (data.xlist.length > 0) {
            this._initXlistStates();
        }
        this.$watch('xlist', function () {
            this._initXlistStates();
            this.data.xlist = this.data.filter(this.data.xlist, this.data.xlistStates);
        });

        this.data.selectedAll = false;
        this.data.selectedNum = 0;
    },

    // xlistStates 对象保存数据的状态, 比如 __hidden、__search_hit、__disabled、__selected
    _initXlistStates: function () {
        this.data.xlistStates = {};
        this.data.xlist.forEach(function (item) {
            // 默认设置好 id, 方便某些情况下取元素 id
            this.data.xlistStates[item.id] = {
                id: item.id,
                __disabled: item.type
            };
        }, this)
    },

    // 计算header的class类名
    _updateHeaderClass: function () {
        this.data.headers.forEach(function (item) {
            // 只计算一次
            item.class = item.class || ' col-' + item.key.replace(/[A-Z._]/g, function ($0) {
                    if ($0 === '_') {
                        return '';
                    }
                    return '-' + ($0 === '.' ? '' : $0.toLowerCase());
                });
        }, this);
    },

    // 全选的复选框
    toggleAll: function () {
        this.data.selectedAll = !this.data.selectedAll;
        this.data.xlist.forEach(function (item) {
            var itemState = this.data.xlistStates[item.id];
            if (!itemState.__disabled && !itemState.__hidden) {
                itemState.__selected = this.data.selectedAll;
            }
        }, this);
        this.updateSelectedNum();
    },

    // 切换行的选中状态
    toggleRow: function (evt, itemState, clickCheckbox) {
        var xlistToHandle = this.data.xlist;
        // 点击行上的复选框
        if (clickCheckbox) {
            // 切换自身的选中状态
            evt.stop();
            itemState.__selected = !itemState.__selected;
            this.updateSelectedNum();
        } else {
            // 点击
            if (this.data.selectedNum > 1) {
                // 如果点击的时候有其他选中的项, 则选中点击的项
                itemState.__selected = true;
            } else {
                // 否则切换自身的选中状态
                itemState.__selected = !itemState.__selected;
            }
            // 将其他项取消选中
            xlistToHandle.forEach(function (itm) {
                if (itm.id !== itemState.id) {
                    this.data.xlistStates[itm.id].__selected = false;
                }
            }, this);
            this.updateSelectedNum();
        }
    },

    // 更新选中的数量
    updateSelectedNum: function () {
        this.data.selectedNum = 0;
        var disabledNum = 0;
        var selectedIds = [];
        var len = this.data.xlist.length;
        this.data.xlist.forEach(function (itm) {
            // 不可用项, 隐藏项, 搜索没匹配上的项, 删除的项, 在计算选中项的数量时都要排除
            var itemState = this.data.xlistStates[itm.id];
            if (itemState.__disabled || itemState.__hidden || itemState.__search_hit === false || itemState.__invisible) {
                disabledNum++;
            } else if (itemState.__selected) {
                this.data.selectedNum++;
                selectedIds.push(itm.id);
            }
        }, this);
        this.data.selectedAll = this.data.selectedNum !== 0 && this.data.selectedNum === len - disabledNum;
        this.data.selectedIds = selectedIds;
    },

    // 搜索功能, 对其他地方没有依赖
    search: function (evt) {
        // 搜索并高亮搜索关键词
        var value = evt.event.target.value.trim();
        var headers = this.data.headers;
        var isEmpty = value === '';
        var hiddenXList = {};
        var hit = false;
        var headerHit = false;
        var headerHitName = '';
        this.data.xlist.forEach(function (item) {
            hit = false;
            var itemState = this.data.xlistStates[item.id];
            headers.forEach(function (header) {
                headerHit = false;
                if (!header.name || !header.searchable) return;
                headerHitName = '__ui_' + header.key + '_hit';
                // 清空搜索框时重置列表
                if (isEmpty) {
                    this.data.onSearch = !1;
                    delete itemState[headerHitName];
                    hit = true;
                    return;
                }
                this.data.onSearch = !0;
                var itemV = header.getValue && header.getValue(Object.assign({}, header, {valueType: 'noescape'}), item, itemState) ||
                    item[header.key] + '';
                var hitIndex = itemV.toString().toLowerCase().indexOf(value.toLowerCase());
                var a, b, c;
                if (hitIndex > -1) {
                    a = itemV.substr(0, hitIndex);
                    b = itemV.substr(hitIndex, value.length);
                    c = itemV.substr(hitIndex + value.length, itemV.length - 1);
                    // 此处拼接不能直接使用 value 值, 因为有大小写的问题
                    itemState[headerHitName] = a + '<b class="hl">' + b + '</b>' + c;
                    headerHit = true;
                    hit = true;
                }
                if (!headerHit) {
                    delete itemState[headerHitName];
                }
            }, this);
            itemState.__search_hit = hit;
        }, this);
        this.data.hiddenXList = hiddenXList;
    },

    // 计算 row 的 class
    getRowClass: function (item) {
        var state = this.data.xlistStates[item.id];
        var config = {
            'list-row': true,
            'row-item': true,
            'js-selected': !state.__disabled && state.__selected,
            'js-disabled': state.__disabled,
            'show-content': state.__showContent
        };
        // 自定义 class
        if (state.__class) {
            config[state.__class] = true
        }
        return this._classNames(config);
    },

    _dispatch: function (e, name, data) {
        e.preventDefault();
        this.$emit(name, data);
        console.log(name, data);
    },

    /**
     * 根据对象计算 css class 名
     * @param  {Object} config - 配置对象
     * @return {String} - 类名
     */
    _classNames: function (config) {
        if (typeof config === 'string') {
            return config;
        } else {
            var classStr = '';
            Object.keys(config).forEach(function (key, index) {
                if (config[key]) {
                    if (index !== 0) {
                        classStr += ' ' + key;
                    } else {
                        classStr += key;
                    }
                }
            });
            return classStr;
        }
    },
    /* 公开方法 */
    /**
     * 隐藏项
     * @param  {Object|Array|String} items - 需要隐藏的项
     * 格式: 1. xxxx(id)
     *      2. {id: xxxx}
     *      3. 以上两种的数组格式
     */
    $hideItems: function (items) {
        if (!Array.isArray(items)) {
            items = [items];
        }
        items.forEach(function (item) {
            this.data.xlistStates[item.id || item].__hidden = true;
        }, this);
        this.$update();
    },
    /**
     * 显示项
     * @param  {Object|Array|String} items - 需要显示的项
     * 格式: 1. xxxx(id)
     *      2. {id: xxxx}
     *      3. 以上两种的数组格式
     */
    $showItems: function (items) {
        if (!Array.isArray(items)) {
            items = [items];
        }
        items.forEach(function (item) {
            this.data.xlistStates[item.id || item].__hidden = false;
        }, this);
        this.$update();
    },
    /**
     * 设置某项数据的状态
     * @param  {Object|String} item - 需要设置的项
     * @param  {Object} state - 需要设置的状态数据
     */
    $setItemState: function (item, state) {
        var itemState = this.data.xlistStates[item.id || item];
        Object.assign(itemState, state);
        this.$update();
    },
    /**
     * 获取列表的状态对象
     */
    $getListStates: function () {
        return this.data.xlistStates;
    }

});
