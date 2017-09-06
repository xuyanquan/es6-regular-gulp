/**
 * UseAge
 * <check name="多选按钮" on-check={this.callback($event)} />
 */

const tpl = require('./check.html');

module.exports = Regular.extend({

    name: 'check',

    template: tpl,

    config() {
        this.data.checked = false;
    },

    init() {},

    click(e) {
        this.data.checked = !this.data.checked;
        this.$emit('check', this.data.checked);
        e && e.stopPropagation();
    }

});