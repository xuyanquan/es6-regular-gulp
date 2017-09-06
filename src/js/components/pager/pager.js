// 分页器组件继承自RGUI.Pager

// demo:
// new Pager({
//     total: this.data.pagerNum,
//     current: this.data.queryData.offset,
// }).$inject(this.$refs.pager).$on('select', this.onPageChange);

const html = require('./pager.html');

module.exports = RGUI.Pager.extend({
    template: html
});