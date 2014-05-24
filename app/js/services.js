angular.module('myApp.services', [])
.constant('version', '0.0.1');
angular.module('googleServices', [])
.service('googleAPI', function($window, $document, $q, $rootscope) {
	// create a defer to encapsulate the loading of our Google API service.
	var d = $q.defer();
	// After the script loads in the browser, we going to call this function,
	
	$window.bootGoogleAPI = function(keys) {
		window.gapi.client.setApiKey(keys.apiKey);
		$rootscope.$apply(function() {
			d.resolve(keys);
		});
	};
	// Load client in the browser
	var scriptTag = $document[0].createElement('script');
	scriptTag.type = 'text/javascript';
	scriptTag.async = true;
	scriptTag.src='//apis.google.com/js/client:plusone.js?onload=onloadCallback';
	var s = $document[0].getElementsByTagName('body')[0];
	s.appendChild(scriptTag);
	
	// Return a singleton object that returns a promise
	return d.promise;
});