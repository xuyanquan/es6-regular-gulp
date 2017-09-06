const tpl = require('./sidebar.html');


module.exports = Regular.extend({

    name: 'sidebar',

    template: tpl,

    data: {
        // 菜单数据列表
        menus: [],
        // 判断是否高亮是需要检测的参数，未传入则不检测参数：['insId,'id']
        carefulParams: []
    },

    config(){
        this.$watch('path', ()=> {
            this._checkIcon();
        })
    },

    _checkIcon(){
        this.data.needIconTrangle = false;
        ['/app/system/version', '/app/material/event/detail', '/app/material/organization'].forEach((url)=> {
            if (!!this._isPathCurrent(url))return this.data.needIconTrangle = true;
        });
    },

    _isPathCurrent(url){
        var path = this.data.path;
        if (path && url) {
            if (path.substr(-1) !== '/')path += '/';
            return (path.indexOf(url.split('?')[0]) === 0) &&
                (this.data.carefulParams.length > 0 && this._isParamRurrent(url) || true);

        }
    },

    _isParamRurrent(url){
        return this.data.carefulParams.every((item)=> {
            return this.data.path.split(item + '=')[1].split('&')[0] === url.split(item + '=')[1].split('&')[0];
        })
    }

});


