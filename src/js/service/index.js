let fetch = require('../util/fetch');

// 获取列表
function getList(type, data) {
    return _getRequest(type, data, 'GET');
}

// 获取单条数据
function getItem(type, data) {
    return _getRequest(type, data,'GET');
}
// 新增单条数据
function addItem(type, data) {
    return _getRequest(type, data,'POST');
}

// 更新单条数据
function updateItem(type, data) {
    return _getRequest(type, data,'PATCH');
}

// 删除单条数据
function deleteItem(type, data) {
    return _getRequest(type, data,'DELETE');
}

// 构造请求
function _getRequest(type, data, method) {
    // 计算请求url
    var url = '/api/' + type;

    if (data && typeof data.id !== 'undefined') {
        url += '/' + data.id;
        delete data.id
    }

    return fetch(url, {
        method: method,
        data: data
    })

}

module.exports = {
    _getRequest,
    getList,
    getItem,
    addItem,
    updateItem,
    deleteItem
};