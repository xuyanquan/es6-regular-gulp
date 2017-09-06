const tpl = require('./dropdown.html');
const dom = require('../../util/dom');
/*
 @param xlist [Array{value:'',id:xxx}]
 @param selectId [Number]
 @event select
 */
module.exports = Regular.extend({

    name: 'dropdown',

    template: tpl,

    data: {
        xlist: [],

        // 未选时的默认提示文本
        placeholder: '请选择',
    },

    config() {
        this.data.show = false;
    },

    init(data) {
        if (!data.showMode) {
            this.handleClose = (e) => {
                let element = this.$refs.element;
                let element2 = e.target;
                this.data.show = dom.contains(element2, element);
                this.$update();
            };
            RGUI._.dom.on(document, 'click', this.handleClose);
        }
    },

    open(e) {
        // e && e.stopPropagation();
        if (!this.data.showMode) {
            this.$emit('click');
            this.data.show = true;
        }
    },

    itemClick(e, item) {
        // e && e.stopPropagation();
        this.$emit('select', {data: item});
        this.data.selectId = item.id;
        this.data.show = false;
    },

    choseItem(item) {
        this.itemClick(null, item);
    },

    getSelectValue(id){
        var item = this.data.xlist.find((item)=> {
            return parseInt(item.id) === parseInt(id)
        });
        if (item)return item.value;
    },

    destroy(){
        if (this.handleClose) {
            RGUI._.dom.off(document, 'click', this.handleClose);
        }
        this.supr();
    },

});

