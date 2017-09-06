/**
 * Demo
 *
 * let v = new Validator({
 *      rules: [
 *          {need:()=>{return true;}, warn: 'error one'},
 *          {need:()=>{return true;}, warn: 'error two'},
 *          {need:()=>{return true;}, warn: 'error thr'}
 *      ]
 * });
 * v.validate().success
 * v.validate().warn
 *
 */
let Validator = Regular.extend({
    config() {
        this.supr();
        Regular.util.extend(this, {
            success: true,
            warn: '',
            rules: []
        });
    },
    validate() {
        let i = this._check();
        this.reset();
        if(i < this.rules.length) {
            this.success = false;
            this.warn =  this.rules[i].warn;
        }
        return this;
    },
    reset() {
        this.success = true;
        this.warn = '';
    },
    _check() {
        let i = 0;
        while(i < this.rules.length && this.rules[i].need()) {
            i++;
        }
        return i;
    }
});

Regular.util.extend(Validator, {
    isEmail(p) {
        return /^\w+([-+.]\w+)*@\w+([-.]\\w+)*\.\w+([-.]\w+)*$/.test(p);
    },
    isNull(p) {
        return null == p;
    },
    isUrl(p) {
        return /^http:\/\/[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\’:+!]*([^<>\"\"])*$/.test(p);
    },
    isPhone(p) {
        return /^((\d{3})|(\d{3}\-))?(0\d{2,3}|0\d{2,3}-)?[1-9]\d{6,7}$/.test(p);
    },
    isEnglish(p) {
        return /^[A-Za-z]+$/.test(p);
    },
    isChinese(p) {
        return /^[\Α-\￥]+$/.test(p);
    }
});

module.exports = Validator;