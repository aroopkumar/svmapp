/**
 * Organization : RABS Professionals
 * Project Name : Chandrawat
 * Module       : Web
 * Decription   : Custom js to handle user message request
 * Create On    : 2 May 2017
 * Updated On   : 26 June 2017
 * Updated By   : Aroop Kumar (aroopkumar792@gmail.com)
 */
var Rabs = function() {
	this.inheritFrom = Common;
	this.inheritFrom();
}

var globalUser;

$(function() {
	oRabs = new Rabs();
	oRabs.doInit();
});

Rabs.prototype.doInit = function() {
	alert('hello');
}

