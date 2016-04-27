"use strict";

window.tools = window.tools || {};
window.tools.createNS = window.tools.createNS || 
function(str){
    var arr = str.split(".");
    var parentNs = window;
    for(var i in arr){
        parentNs[arr[i]] = parentNs[arr[i]] || {};
        parentNs = parentNs[arr[i]];
    }
    return parentNs;   
};
    