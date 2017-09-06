var dom = Regular.dom;
var _ = Regular.util;

var dom = _.extend({}, dom);

// relative to window.
dom.offsets = function(elem) {

    var win = window,
        doc = (elem.ownDocument || document),
        docElem = doc.documentElement,
        body = doc.body,
        box = elem.getBoundingClientRect(),
        clientTop = docElem.clientTop || body.clientTop || 0,
        clientLeft = docElem.clientLeft || body.clientLeft || 0,
        scrollTop = win.pageYOffset || docElem.scrollTop,
        scrollLeft = win.pageXOffset || docElem.scrollLeft,
        isFixed = dom.getComputedStyle(elem, 'position') === 'fixed';

    return {
        top: parseInt(box.top, 10) + scrollTop - clientTop,
        left: parseInt(box.left, 10) + scrollLeft - clientLeft
    };
}

// relative to body
dom.scrolls = function(elem) {
    elem = elem.parentNode;
    var coord = {
        left: 0,
        top: 0
    };
    while (elem && !dom.isBody(elem)) {
        coord.left += elem.scrollLeft
        coord.top += elem.scrollTop
        elem = elem.parentNode;
    }
    return coord;
}

dom.isOffsetParent = function(elem) {
    var position = dom.getComputedStyle(elem, 'position')
}

dom.size = function(elem) {
    if (dom.isBody(elem)) {

        var html = getCompatDoc(elem);
        return {
            width: html.clientWidth,
            height: html.clientHeight
        }
    }
    return {
        width: elem.offsetWidth,
        height: elem.offsetHeight
    }
}

dom.position = function(elem, relative) {

    var scroll = dom.scrolls(elem);
    var offset = dom.offsets(elem);
    var position = {
        left: offset.left + scroll.left,
        top: offset.top + scroll.top
    }

    if (relative) {
        var relativePostion = dom.position(relative);
        position.left -= relativePostion.left + parseInt(dom.getComputedStyle(relative, 'border-left-width'), 10);
        position.top -= relativePostion.top + parseInt(dom.getComputedStyle(relative, 'border-top-width'), 10);
    }

    if (dom.isBody(elem) && dom.isOffset(elem)) {
        position.left -= parseInt(dom.getComputedStyle(elem, 'border-left-width'), 10);
        position.top -= parseInt(dom.getComputedStyle(elem, 'border-top-width'), 10);
    }


    return position;
}

dom.isOffset = function(elem) {
    return dom.getComputedStyle(elem, 'position') === 'static';
}

dom.getComputedStyle = function(elem, prop) {
    if (typeof window.getComputedStyle !== 'undefined') {
        return getComputedStyle(elem, null).getPropertyValue(prop);
    } else {
        return elem.currentStyle[prop];
    }
}



dom.isBody = function(elem) {
    return (/^(?:body|html)$/i).test(elem.tagName);
}

dom.getCompatDoc = function(elem) {
    var doc = elem ? elem.ownDocument : document;
    return doc.compatMode === 'CSS1Compat' ? doc.documentElement : doc.body;
}

dom.contains = function(elem, container) {
    if (!container) container = document.body;

    if (container.contains) {
        return container.contains(elem)
    }

    if (container.compareDocumentPosition) {
        return container === elem || !!(container.compareDocumentPosition(elem) & 16);
    }

    while ((elem = elem.parentNode)) {
        if (elem === container) return true;
    }

    return false;
}


module.exports = dom;
