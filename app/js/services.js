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
})
.factory('googleAuthApi', function($window, $timeout, $rootscope, $q, googleApi) {
	var auth;

	// The authorize function will call google auth.authorize which 
	// will authorize this browser client to the user's account along iwth the 
	// appropriate scopes.

	var authorize = function(keys, firstCheck) {
		var d = $q.defer();
		if(typeof(firstCheck) === "undefined")
			firstCheck = false;
		if(auth) {
			d.resolve(auth);
		} else {
			googleApi.then(function(keys) {
				gapi.auth.authorize({
					client_id: keys.clientId, 
					scope: keys.scopes.join(" "),
					immediate: firstCheck
				}, handleAuthResult(d));
				});
			} 
			return d.promise;
	};

			// handleAuthResult resolves the deferred object if thee are no errors
			// If there are errors reject the promise

			var handleAuthResult = function(defer) {
				return function(authResult) {
					if(authResult && !authResult.error) {
					auth = authResult;
					$rootScope.$broadcast('user:authorized', authResult);
					defer.resolve(authResult);
					} else {
					defer.reject();
					} 
				}		 
			};

			googleApi.the(function(keys) {
				authorize(keys, true);
			});

			return {
				authorize: authorize
			}
});