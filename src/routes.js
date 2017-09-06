const restate = require('regular-state');

const Application = require('./module/app');
const PageA = require('./module/pagea/index');
const PageB = require('./module/pageb/index');


// 所有路由配置

function getRoutes(){
    return {
        'app': {
            url: '/app',
            view: Application
        },
        'app.pagea': {
            url: '/pagea',
            view: PageA
        },
        'app.pageb': {
            url: '/pageb',
            view: PageB
        }
    };
}


module.exports = restate({
    routes: getRoutes()

});
