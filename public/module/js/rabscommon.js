/**
 * Organization : Yamaha Motor Solution (India)
 * Project Name : Flex (IM)
 * Module       : FlexCommon
 * Decription   : Common functions used throughout web application
 * Create On    : 19 Apr 2017
 * Updated On   : 29 Apr 2017, 31 May 2017, 12 June 2017
 * Updated By   : Sachin Avinaw (savinaw@yamaha-motor-india.com)
 */
"use strict";

var Common = function () {

    this.ajax = new AjaxUtils();

    /***** Serializing form data to json string *****/
    this.serializetojson = function (serializer) {
        var _string = '{';
        for (var ix in serializer) {
            var row = serializer[ix];
            _string += '"' + row.name + '":"' + row.value + '",';
        }
        var end = _string.length - 1;
        _string = _string.substr(0, end);
        _string = _string + '}';
        return _string;
    };

    /** Function to reset Forms */
    this.resetform = function (forms) {
        /*** Reset Forms ***/
        if (forms != null) {
            var form = forms.split(",");
            form.forEach(function (formObj) {
                $("#" + formObj).trigger("reset");
            });

        }
    };

    /***** Validate form fields *****/
    this.validateform = function (formid) {
        $('#' + formid).validate({
            errorClass: 'e-error',
            rules: {},
            messages: {},

			/* onsubmit: false,
            submitHandler: function(form){
               if ($(form).valid()){
                     form.submit(); 
                 }
                 return false;
            } */
            submitHandler: function () {
                return false;
            }
        });
        /**
         * IP Address format validation
         */
        $.validator.addMethod('IP4Checker', function (value) {
            //Regex for IP Address format validation 
            var ipaddress = "^([01]?\\d\\d?|2[0-4]\\d|25[0-5])\\." +
                "([01]?\\d\\d?|2[0-4]\\d|25[0-5])\\." +
                "([01]?\\d\\d?|2[0-4]\\d|25[0-5])\\." +
                "([01]?\\d\\d?|2[0-4]\\d|25[0-5])$";
            return value.match(ipaddress);
        });
        /**
         * Email format validation
         */
        $.validator.addMethod('emailFormat', function (value) {
            //Regex for email format validation 
            var email = /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,4}$/;
            return value.match(email);
        });
        /**
         * Machine Serial Number Format validation
         * @Desc: No blank space is allowed in Machine Serial Number
         */
        $.validator.addMethod("noSpace", function (value) {
            //Regex for blank space Validation 
            return value.indexOf(" ") < 0 && value != "";
        });
    };
    /** close modal window */
    this.closemodal = function () {
        $('.modal').modal('hide');
    }
    /** Handle Screen redirect */
    this.screenredirect = function (queryStr) {
        window.location.href = queryStr;
    };

    /***** Function to enable components*****/
    this.enableComponent = function (elements) {
        this.componentStatus(elements, false);
    }

    /***** Function to disable components*****/
    this.disableComponent = function (elements) {
        this.componentStatus(elements, true);
    }

    /***** Function to to set component status*****/
    this.componentStatus = function (element, state) {
        if (element != null || element != "") {
            var elements = element.split(",");
            elements.forEach(function (elementObj) {
                $("#" + elementObj).prop('disabled', state);
            });
        }
    }

    this.notify = function (message, type) {
        $.growl({
            message: message
        }, {
                type: type,
                allow_dismiss: 1,
                label: "Cancel",
                className: "btn-xs btn-inverse",
                placement: {
                    from: "bottom",
                    align: "right"
                },
                offset: {
                    x: 20,
                    y: 85
                },
                spacing: 10,
                z_index: 1031,
                delay: 3000,
                timer: 1000,
                url_target: '_blank',
                mouse_over: false,
                animate: {
                    enter: 'animated fadeInRight',
                    exit: 'animated fadeOutLeft'
                },

            });
    }

    this.formatdate = function (dateString) {
        var date = new Date(dateString);
        var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        var datetime=(date.getDate() +' '+months[date.getMonth()] + ' ' +  date.getFullYear());
        return datetime;
    }
}


/************* Get Browser Language from session storage *************/
function setClientLocale() {
    var lang = '';
    var key = localStorage.getItem('lang');
    if (key == null || key == undefined) {
        lang = 'en';
    }
    else {
        lang = localStorage.getItem('lang');
    }
    $('#' + lang).removeClass('lang-list');
    $('#' + lang).addClass('lang-list-disabled');
    return lang;
};

/************* Init i18n ***********************/
function init_i18n(lang) {
    $.i18n.properties({
        // name: 'flexMessageResource',
        // path: 'locales/',
        // mode: 'both',
        // language: lang,
        // async: true,
        // callback: function () {

        // }
    });
}

/****** Set locale ******/
var selectLang = function () {
    $('.lang-list').click(function (e) {
        e.stopPropagation()
        $('#dropdownMenu1').prop('disabled', true);
        //Use localStorage to set language for i18n client.
        localStorage.clear();
        localStorage.setItem('lang', this.id);
        //Close dropdown list
        $('ul[class=hi-menu]>li').removeClass('open');
        //initialize i18n client.
        init_i18n(localStorage.getItem('lang'));
        //Get URL of current page.
        var data = window.location.toString().split("/");
        var page = data[data.length - 1].split("?")[0]

        var pagetype=$('#page').val();

        if(page==='add' && pagetype==='edit'){
            var machineserial=data[data.length - 1].split("?")[1];
            window.location.href='/setlocale?page=' + page + '&lang=' + this.id+'&machineserial='+machineserial.split('=')[1];
        }else{
            //redirect to setLocale for server.
            window.location.href = '/setlocale?page=' + page + '&lang=' + this.id;
        }
    });
};

/** Load JSON file */
var multilingual = function () {
    $.i18n().load({
        en: 'locales/en.json',
        ja: 'i18n/ja.json',
    });
}

var language = function (language) {
    $.i18n().locale = language;
}

/** ready function */
$(document).ready(function () {
    //initialize i18n based on session storage language key 
    // init_i18n(setClientLocale());
    // selectLang();
});