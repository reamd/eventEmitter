"use strict";
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD
        define('eventEmitter', ['jquery', 'uuid'], function ($, uuid) {
            return factory;
        });
    } else if (typeof exports === 'object') {
        // Node.js
        module.exports.eventEmitter = factory;

    } else {
        // Browser globals
        root.eventEmitter = factory;
    }
}(typeof window !== "undefined" ? window : this, function () {
    var eventList = {},
        _exeEmitter = function(temp) {
        temp.forEach(function(item) {
            if(Object.prototype.toString.call(item) === '[object Function]') {
                setTimeout(item, 0);
            }else if(Object.prototype.toString.call(item) === '[object Object]') {
                if(item['flag']) {
                    return;
                }else {
                    //后期可以考虑改为事件移除
                    item['flag'] = true;
                    setTimeout(item['fun'], 0);
                }
            }
        });
    },
        _rmArrEle = function(array, predicate) {
        var result = [],
            indexes = [];
        if (!(array && array.length)) {
            return result;
        }
        array.forEach(function(item, idx) {
            if(item === predicate) {
                indexes.push(idx);
            }
        });
        indexes.forEach(function(item, idx) {
            array.splice(item - idx, 1);
        });
        return array;
    };

    this.once = function(eve, fun) {
        if(!eve || !fun) {
            return;
        }

        if(eventList && eventList[eve]) {
            eventList[eve].push({
                flag: false,
                fun: fun
            });
        }else {
            eventList[eve] = new Array();
            eventList[eve].push({
                flag: false,
                fun: fun
            });
        }
    };
    this.on = function(eve, fun){
        if(!eve || !fun) {
            return;
        }

        if(eventList && eventList[eve]) {
            eventList[eve].push(fun);
        }else {
            eventList[eve] = new Array();
            eventList[eve].push(fun);
        }
    };

    //不传eve参数默认得到所有绑定事件
    this.get = function(eve) {
        var temp = null;
        if(!eve) {
            //得到所有绑定事件
            temp = eventList;
        }else {
            temp = eventList[eve];
        }
        if (Object.prototype.toString.call(temp) === '[object Array]') {
            return temp;
        }else if(Object.prototype.toString.call(temp) === '[object Object]'){
            var tempArray = [];
            for(var obj in temp) {
                tempArray = tempArray.concat(temp[obj]);
            }
            return tempArray;
        }else {
            return null;
        }
    };

    //不传eve参数默认触发所有绑定事件
    this.trigger = function(eve) {
        var temp = null;
        if(!eve) {
            //触发所有绑定事件
            temp = eventList;
        }else {
            temp = eventList[eve];
        }
        if(Object.prototype.toString.call(temp) === '[object Array]'){
            _exeEmitter(temp);
        }else if(Object.prototype.toString.call(temp) === '[object Object]'){
            for(var obj in temp) {
                _exeEmitter(temp[obj]);
            }
        }else {
            return;
        }
    };

    //不传eve移出所有绑定事件，
    this.off = function(eve, fun) {
        if(!eve) {
            //移除所有绑定事件
            eventList = {};
        }else {
            if(!fun) {
                //移除eve所有绑定的所有事件
                delete eventList[eve];
            }else {
                //移除eve绑定的fun事件
                _rmArrEle(eventList[eve], fun);
            }
        }
    };

}));
