var jsbridge = {};
try {
	$(document).ready(function() {
		doSetupWebViewJsBridge();
	});
}catch(e){}


function setupWebViewJavascriptBridge(callback) {
	//if (window.WebViewJavascriptBridge) { return callback(WebViewJavascriptBridge); }
	if (window.WebViewJavascriptBridge) { 
		return callback(WebViewJavascriptBridge);
	} else {
		document.addEventListener(
			'IGOWebViewJavascriptBridgeReady', function() {
				callback(WebViewJavascriptBridge);
			},false);
	}
	if (window.WVJBCallbacks) { return window.WVJBCallbacks.push(callback); }
	window.WVJBCallbacks = [callback];
	var WVJBIframe = document.createElement('iframe');
	WVJBIframe.style.display = 'none';
	WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
	document.documentElement.appendChild(WVJBIframe);
	setTimeout(function() { document.documentElement.removeChild(WVJBIframe) }, 0)
}

var doSetupWebViewJsBridge = function () {
	setupWebViewJavascriptBridge(function(bridge) {
		jsbridge = bridge;
		if (typeof initHandler == 'function') { initHandler(); }
	})
}

var statInputNum = function(textArea, numItem, maxItem) {  
	var max = maxItem.text(), curLength;

	textArea[0].setAttribute("maxlength", max);
	curLength = textArea.val().length;
	numItem.text(curLength);

	textArea.on('input propertychange', function () {
		numItem.text($(this).val().length);
	});
};

var isVehicleNumber = function(licenseNo) {
	//var reg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Za-z]{1}[A-Za-z]{1}[A-Za-z0-9]{4,5}[A-Za-z0-9挂学警港澳]{1}$/;
	var reg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Za-z0-9挂学警港澳]{3,9}$/;
	if(reg.test(licenseNo)) {
		return true;
	} else {
		return false;
	}
}