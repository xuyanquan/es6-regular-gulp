/**
 * 标签选择组件
 */


/**
 * 支持事件：
 * @select：用户选中某项
 * @cancel：用户取消选中某项
 */
const dom = require('../../util/dom');


const html = require('./tagselect.html');
module.exports = Regular.extend({
    template: html,

    name: 'tagselect',

    // 配置参数
    data: {
        // 选项列表数据
        // xlist: [
        //     {
        //         value: '组织一',
        //         id: 'aaaa',
        //     },
        //     {
        //         value: '组织二',
        //         id: 'bbbb',
        //     }
        // ]
        xlist: [],

        // 已选标签
        tags: [],

        // 未选标签时的默认提示文本
        placeholder: '请选择',

        // 是否展示模式
        isShowMode: false
    },

    config: function () {
        this.data.xlistStates = {};
        // 将列表转为id索引的object方便查找单项
        this.data.xlist.forEach((item)=> {
            this.data.xlistStates[item.id] = item;
        });

        this.data.tags = this.data.tags.filter((item)=> {
            if (this.data.xlistStates[item.id || item]) {
                return this.data.xlistStates[item.id || item].__selected = true;
            }
        })
    },

    init(){
        if (!this._hideHandler) this._hideHandler = (e) => {
            this.data.isOptionsOpen = dom.contains(e.target, this.$refs.element);
            this.$update();
        };
        Regular.dom.on(document, 'click', this._hideHandler);
    },

    _toggleIpt(e){
        // e && e.event.stopPropagation();
        this.$emit('click');
        this.data.isOptionsOpen = !this.data.isOptionsOpen;
    },

    _onSelect(e, item){
        e && e.event.stopPropagation();
        var disable = this.data.xlistStates[item.id].__disabled;
        if (disable != true) {
            var status = this.data.xlistStates[item.id].__selected;
            this.data.xlistStates[item.id].__selected = !status;
            if (!status) {
                this.data.tags.push(item);
                this.$emit('select', {data: item, selectedTags: this._copy(this.data.tags)});
            } else {
                this.data.tags = this.data.tags.filter((tag)=> {
                    return tag.id !== item.id
                })
                this.$emit('cancel', {data: item, selectedTags: this._copy(this.data.tags)});
            }
        }
    },

    _copy(data){
        if (typeof data === 'object')
            return JSON.parse(JSON.stringify(data));
    },

    /* 公开方法 */
    /**
     * 主动触发选择某项,用于初始化数据。
     * @param items
     */
    $select(items){
        if (!Array.isArray(items)) {
            items = [items];
        }
        items.forEach((item)=> {
            this._onSelect(null, item);
        });
        this.$update();
    },
    /**
     * 根据id使对应项不可选
     * @id  {Object|Array|String}
     */
    $disable(items){
        if (!Array.isArray(items)) {
            items = [items];
        }
        items.forEach((item)=> {
            this.data.xlistStates[item.id || item].__disabled = true;
        });
        this.$update();
    },

    /**
     * 根据id使对应项可选
     * @id  {Object|Array|String}
     */
    $active(items){
        if (!Array.isArray(items)) {
            items = [items];
        }
        items.forEach((item)=> {
            this.data.xlistStates[item.id || item].__disabled = false;
        });
        this.$update();
    },

    /**
     * 获取当前选中的标签列表
     */
    $getSelectedTags(){
        return this._copy(this.data.tags);
    },

    destroy(){
        this._hideHandler && Regular.dom.off(document, 'click', this._hideHandler);
        this.supr();
    }
});
