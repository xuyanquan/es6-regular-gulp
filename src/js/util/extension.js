// 做一些全局的shim，以及Regular本身的扩展

var dom = Regular.dom;
var supportTouch = 'ontouchstart' in document && !('onmousedown' in document);


var keys = Object.keys || function (obj) {
        var ret = [];
        for (var i in obj) {
            ret.push(i)
        }
        return ret;
    }



let filters = (function () {
    // dateformat util
    const fmap = {
        'yyyy': function (date) {
            return date.getFullYear()
        },
        'MM': function (date) {
            return fix(date.getMonth() + 1);
        },
        'dd': function (date) {
            return fix(date.getDate())
        },
        'HH': function (date) {
            return fix(date.getHours())
        },
        'mm': function (date) {
            return fix(date.getMinutes())
        },
        'ss': function (date) {
            return fix(date.getSeconds())
        }

    }
    const trunk = new RegExp(keys(fmap).join('|'), 'g');

    function fix(str) {
        str = '' + (str || '');
        return str.length <= 1 ? '0' + str : str;
    }

    return {
        // fomat date
        // ------------------
        // example:
        // {1449737531544|format: 'yyyy年MM月dd日'}
        format (value, format){

            format = format || 'yyyy-MM-dd HH:mm';
            if (!value) return;
            value = new Date(value);

            return format.replace(trunk, (cap) => fmap[cap] ? fmap[cap](value) : '');
        },
        accountIdAlias (accountId, num){
            var len = num || 12;
            var i = accountId.indexOf('@');
            var prefix = accountId.substring(0, i);
            var suffix = accountId.substring(i);
            if (prefix.length > len) {
                var str1 = prefix.substring(0, 4);
                var str2 = prefix.substring(prefix.length - 4);
                return str1 + '****' + str2 + suffix;
            } else {
                return accountId;
            }
        }
    }
})();


Regular
    .filter(filters)
    .event({
        'enter': function (elem, fire) {
            function update(ev) {
                if (ev.which === 13) {
                    ev.preventDefault();
                    fire(ev);
                }
            }

            dom.on(elem, 'keypress', update);
        },

        'clickouter': (function () {

            // handles for hold global register

            var callbacks = [];
            var onClickOuter = function (event) {

                if (callbacks.length) {
                    // event.stopImmediatePropagation();
                    callbacks.forEach(function (cb) {
                        if (typeof cb === 'function') cb(event)
                    })
                }
            }
            var getExceptMe = function (elem) {
                return function (target) {
                    return target !== elem && !elem.contains(target)
                }
            }
            return function clickouter(elem, fire) {
                var except = getExceptMe(elem);
                var preLen = callbacks.length;

                function onClickOuterOfSelf(event) {
                    // console.log('click outer')
                    if (except(event.target)) fire(event);
                }

                callbacks.push(onClickOuterOfSelf);

                if (!preLen) {
                    setTimeout(function () {
                        // console.log('binder outer')
                        dom.on(document, !supportTouch ? 'mousedown' : 'touchstart', onClickOuter)
                    }, 10)

                }

                return function destroy() {
                    // console.log('destroy')
                    var index = callbacks.indexOf(onClickOuterOfSelf);
                    if (~index) callbacks.splice(index, 1)
                    if (!callbacks.length) {
                        dom.off(document, !supportTouch ? 'mousedown' : 'touchstart', onClickOuter)
                    }
                }
            }
        })()


    }).directive({
    'mr-route': function (elem, expression) {
        let value = '';
        this.$watch(expression, function (newValue) {
            value = newValue;
        });
        dom.on(elem, 'click', ()=> {
            this.$parent.$state.emit('begin', {path: value});
        })
    }
});
