const tpl = require('./leftbar.html');


module.exports = Regular.extend({

    name: 'leftbar',

    template: tpl,

    data: {},

    init(data){
    },

    _isPathCurrent(url){
        var path = this.data.path;
        if (path && url) {
            if (path.substr(-1) !== '/')path += '/';
            return path.indexOf(url) === 0;

        }
    },
});


