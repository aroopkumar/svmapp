"use strict";

/** Protyping common function */
var Rabs = function () {
    this.inheritFrom = Common;
    this.inheritFrom();
    /** Form objects */
}

$(document).ready(function () {
    var oRabs = new Flex();
    oRabs.doInit();
});

Rabs.prototype.doInit=function(){
  alert("welcome"); 
}