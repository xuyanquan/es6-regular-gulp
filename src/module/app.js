const tpl = require('./app.html');
module.exports = Regular.extend({

    template: tpl,

    data: {
        xlist: [
            { id: 1, value: '选项1' },
            { id: 2, value: '选项2' },
            { id: 3, value: '选项3' },
            { id: 4, value: '选项4' },
            { id: 5, value: '选项5' }
        ],
        headers: [
            {
                name: '名称',
                key: 'name',
                valueType: 'name',
                searchable: true,
                useClickEvent: true //点击时是否发出事件
            },
            {
                name: '平台',
                key: 'platform',
                searchable: true
            },
            {
                name: '平台',
                key: 'aaa',
                searchable: true
            },
            {
                name: '平台',
                key: 'bbb',
                searchable: true
            }
        ],
        list: [
            { id:1, name: 'llllaaa', platform: 'aaaaa', aaa: 1233, bbb: 234 },
            { id:2, name: 'llllaaa', platform: 'aaaaa', aaa: 1233, bbb: 234 },
            { id:3, name: 'llllaaa', platform: 'aaaaa', aaa: 1233, bbb: 234 },
            { id:4, name: 'llllaaa', platform: 'aaaaa', aaa: 1233, bbb: 234 },
            { id:5, name: 'llllaaa', platform: 'aaaaa', aaa: 1233, bbb: 234 }
        ],
        code: `
            let v = new Validator({
                 rules: [
                     {need()=>{return true;}, warn: 'error one'},
                     {need()=>{return true;}, warn: 'error two'},
                     {need()=>{return true;}, warn: 'error thr'}
                 ]
             });
             v.validate().success
             v.validate().warn
        `
    },

    mount(data) {
    },

    enter() {
    },

    showModal() {
        new Component.Modal({
            data: {
                title: 'this is demo'
            }
        });
    },

    showModalConfirm() {
        new Component.ModalConfirm({
            data: {
                title: 'this is demo',
                text: 'this is description'
            }
        });
    },

    showNotify(p) {
        switch (p) {
            case 's': Component.Notify.success('message show');break;
            case 'e': Component.Notify.error('message show');break;
            case 'w': Component.Notify.warning('message show');break;
            case 'i': Component.Notify.info('message show');break;
        }
    },

    testAjax() {
        Service.getItem('testjson', {id: 234}).then((res)=>{
            if(res && res.code == 200) {
                Component.Notify.info(res.result.join(''));
            }
        });
    }

})


