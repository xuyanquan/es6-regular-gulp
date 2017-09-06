const tpl = require('./modal_confirm.html');

// 事件：
// resolve：确认
// reject：拒绝

let ModalConfirm = RGUI.Modal.extend({
    data: {
        title: '确认',
        contentTemplate: tpl,
        hightLightText: false,
        showCancelBtn: true,
        className:''
    },
    onReject(){
        this.$emit('reject');
        this.close();
    },
    onResolve(){
        this.$emit('resolve');
        this.close();
    },

});

// 展示模式
ModalConfirm.show = function (text,title) {
    return new ModalConfirm({
        data: {
            title:title,
            text: text,
            hightLightText: true,
            showCancelBtn: false,
            className:'m-modal-confirm-show'
        }
    });
};
// 二次确认模式
ModalConfirm.confirm = function (text,title) {
    return new ModalConfirm({
        data: {
            title:title,
            text: text,
            className:'m-modal-confirm-show'

        }
    });
};

module.exports = ModalConfirm;
