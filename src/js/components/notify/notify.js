/**
 * API
 * Notify.show(info,type,time);
 * info: string
 * type: success, warning,info,error
 * time: ms
 *
 * demo
 * Notify.show('显示提示', 'info', 2000);
 * Notify.info('显示提示', 2000);
 * Notify.info('显示提示');
 * Notify.error('危险提示');
 *
 */

// 更改模板
const tpl = require('./notify.html');

let Notify = RGUI.Notify.extend({
    template: tpl
});

let notify = new Notify();

Notify.notify = notify;

const METHODS = ['show', 'close', 'closeAll', 'success', 'warning', 'info', 'error'];

METHODS.forEach(function(method) {
    Notify[method] = notify[method].bind(notify);
});

module.exports = Notify;

