
var Progress = require('../components/progress.js');
require('es6-promise').polyfill();
var fetchBase = require('isomorphic-fetch');
var _ = require('./helper')

const Notify = Component.Notify;


var progress;

/**
 * 建议所有的产品都为xhr设置一个统一入口， 方便加上统一逻辑.
 */
function fetch(url, opt){

  opt = opt || {};
  if(!progress) progress = new Progress;

  opt.method = opt.method || 'GET';
  opt.credentials = 'same-origin';


  // 1. 根据规范， 我们fix一些参数
  var queryString;
  if(opt.data) {
    if(/GET|HEAD/.test(opt.method)){
      url = `${url}?${_.obj2query(opt.data)}`;
    }else{

      opt.headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
      opt.body = JSON.stringify( opt.data );

    }
  }


  var indicator;

  if(opt.needProgress) {
    indicator = progress;
    indicator.start();
  }

  return fetchBase(url, opt).then(function( ret ){

    indicator && indicator.end();
    // return !opt.raw ? ret.json(): ret;
    let pro = !opt.raw ? ret.json(): ret;

    return pro.then( res => {
        if (res.code!= 200) {
            Notify['error'](res.msg);
        }else{
            switch (opt.method.toUpperCase()) {
                case 'POST':
                    Notify['success']('创建成功');
                    break;
                case 'PATCH':
                    Notify['success']('更新成功');
                    break;
                case 'DELETE':
                    Notify['success']('删除成功');
                    break;
            }
        }
        return res;

    })

  }).catch(function( err ){

    indicator && indicator.end(true);
    Notify['error'](err.msg);
    throw err

  })


}


module.exports = fetch
