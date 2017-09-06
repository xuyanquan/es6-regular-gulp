require('babel-polyfill');

require('!style!css!../public/css/main.css');
require('./js/util/extension');

console.log(Component);
console.log(RGUI);
console.log(Regular);

const router = require('./routes');

const dom = require('./js/util/dom');

router.on('begin', function (evt) {
});

router.on('notfound', function () {
    console.log('not find');
    this.go('app');
});

router.start({
    html5: false,
    view: dom.find('#app')
});
