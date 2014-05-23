angular.module('myApp.controllers', [])
	.controller('FrameController', ['$scope', function($scope){
		$scope.today = new Date(); //Today's date
		$scope.name = "Tresa Horney";
	}])
	.controller('DashboardController', ['$scope',function ($scope) {
		var date = new Date();
		$scope.dateFilters = {
			'all': 'all',
			'next week': new Date(date.setDate(date.getDate() +7)),
			'tomorrow': chrono.parseDate('tomorrow at 11:59pm'),
			'today': chrono.parseDate('today at 11:59pm')
			}
		$scope.excludeByDate = function(input) {
			if($scope.keepDate === 'all') {
				return true;
			} else {
				return new Date(input.start.dateTime).getTime() < 
					$scope.keepDate.getTime();
			}
		}
	}]);

