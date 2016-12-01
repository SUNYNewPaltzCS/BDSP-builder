angular.module('app')
	.controller('indexController', function( $window, $scope, $http) {
		
		$scope.submit = function() {
			console.log("CLICK RECEIVED");
			$http.post('/build', $scope.table)
				.success(function(data) {
					$window.location.href = "http://sunyfusion.me:8080/#/submit";
				})
				.error(function() {
					console.log("An error occurred :/");	
				});
			
		}
		$scope.auth = function() {
			$http.get('/fusiontable')
				.success(function(data) {
					$window.location.href = data;
				});
		}
		$scope.moveDown = function(ind) {
			var columnsArr = $scope.table.items[$scope.selectIndex].columns;
			if(ind < columnsArr.length-1) {
				var temp = columnsArr[ind+1];
				columnsArr[ind+1] = columnsArr[ind];
				columnsArr[ind] = temp;
			}
		}
		$scope.moveUp = function(ind) {
			var columnsArr = $scope.table.items[$scope.selectIndex].columns;
			if(ind > 0) {
				var temp = columnsArr[ind-1];
				columnsArr[ind-1] = columnsArr[ind];
				columnsArr[ind] = temp;
			}
		}
		$scope.table = {};
		$scope.selectIndex = "";
		
		$http.get('/fusiontable/table')
			.success(function(data) {
				$scope.table = data;
				console.log($scope.table);
				if($scope.table === 'NOT LOGGED IN') {
					$scope.auth();
				}
			});
	});	
