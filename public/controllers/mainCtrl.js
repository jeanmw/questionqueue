/*
 * MAIN CONTROLLER
 */

'use strict';

angular.module('question-cookie')
	.controller('MainCtrl', ['$location', '$scope', '$rootScope', function ($location, $scope, $rootScope) {

	}])

  .controller('SplashCtrl', ['$location', '$scope', '$rootScope', function ($location, $scope, $rootScope) {
  	
  	// $scope.$on('socket:broadcast.total_clients_count', function (event, totalClientsCount) {
  	//   console.log(totalClientsCount)
  	//   $scope.$apply(function() {
  	//     $scope.totalClientsCount = totalClientsCount;
  	//   })
  	// });

  	$scope.roomName = ''
  	
  	$scope.enterRoom = function() {
  		console.log('blah')
  	  $location.path("/" + $scope.roomName);
  	}
  }])

