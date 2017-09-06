const tpl = require('./index.html');

module.exports = Regular.extend({

    template: tpl,

    init() {
        this.supr();
    }

});