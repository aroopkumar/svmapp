function AjaxUtils(){
    
}

AjaxUtils.prototype.doRetrieve = function(url, data, doneFunction, type, failFunction, objContext){
	console.log(data);
	$.ajax({
			url: url,
            data: data,
            type: type,
            contentType: 'application/json',
			// beforeSend: function (xhr) {
			// 	//doEnableLoader();
			// }
		}).done(function(data, textStatus, xhr, options) {
		if (typeof(doneFunction) === "function") {
			//------------------------------------------
			// CALLBACK
			//------------------------------------------
			doneFunction(data, textStatus ,objContext);
		}

	}).fail(function(xhr, textStatus, errorThrown) {

		
		if (typeof(failFunction) === "function") {
			failFunction(xhr, textStatus, errorThrown, objContext);
		}
		
		
	}).always(function(xhr, textStatus) {
		// loading indicator
        //$("body").waitMe("hide");
	});
}


AjaxUtils.prototype.doUpdate = function(parameterData, urlStr, doneFun, methodType , failFun){
	
	function readParameterData() {
		return JSON.parse(parameterData);
	}
	
	$.ajax({
		contentType: 'application/json',
		method: methodType||'post',
		data: parameterData,
		url: urlStr,
		dataType: 'json',
		beforeSend: function (xhr) {
			var token = $("meta[name='_transaction_token']").attr('content');
			if (token) {
				xhr.setRequestHeader('X-Transaction-Token', token);
			}
			xhr.setRequestHeader('X-Action-Type', 'U');

		}
	}).done(function(data, textStatus, xhr, options) {
		if (typeof(doneFun) === "function") {
			doneFun(data, textStatus, xhr, options);
		}
		
//			notyutil.showSuccessMessage(data);
		
		if (xhr.responseJSON.nextTransactionToken) {
			$("meta[name='_transaction_token']").attr('content', xhr.responseJSON.nextTransactionToken);
		}
	}).fail(function(xhr, textStatus, errorThrown) {
		var parameterJson = readParameterData();
		
		if (typeof(failFun) === "function") {
			failFun(xhr, textStatus, errorThrown);
		}
		
//			notyutil.showErrorMessage(xhr, parameterJson)
	}).always(function(xhr, textStatus) {

	});
}


AjaxUtils.prototype.doUpload = function(url, data, doneFunction, type, failFunction, objContext){
	$.ajax({
			url: url,
            data: data,
            type: type,
            enctype: 'multipart/form-data',
            processData: false,
            contentType: false,
            cache: false,
			// beforeSend: function (xhr) {
			// 	//doEnableLoader();
			// }
		}).done(function(data, textStatus, xhr, options) {
		if (typeof(doneFunction) === "function") {
			//------------------------------------------
			// CALLBACK
			//------------------------------------------
			doneFunction(data, textStatus ,objContext);
		}

	}).fail(function(xhr, textStatus, errorThrown) {

		
		if (typeof(failFunction) === "function") {
			failFunction(xhr, textStatus, errorThrown, objContext);
		}
		
		
	}).always(function(xhr, textStatus) {
		// loading indicator
        //$("body").waitMe("hide");
	});
}