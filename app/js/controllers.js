angular.module('myApp.controllers', [])
	.controller('FrameController', ['$scope', function($scope){
		$scope.today = new Date(); //Today's date
		$scope.name = "Tresa Horney";
}])
	.controller('DashboardController', ['$scope', function ($scope) {
		// body...
	}]);
