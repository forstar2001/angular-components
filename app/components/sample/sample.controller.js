angular
	.module('sampleApp')
	.controller('EventCtrl', function($rootScope, $scope, $http, $mdSidenav) {
		$scope.eventData = {
			"program": ["program1","program2","program3"],
			"location": ["location1","location2","location3"]
		};
		$scope.applyFilters = function (event){
			$http.get('/app/components/sample/sample.json').then(function (fieldList) {
				$rootScope.fieldList = fieldList.data;
			});
			$mdSidenav('right').toggle();
		}
	})
	.controller('SampleCtrl', function($scope, $mdSidenav) {
		$scope.openRightSide = function () {
			$mdSidenav('right').toggle();
			// alert("ok");
		};
	})
	.controller('LoginCtrl', function($scope, $mdDialog) {
		$scope.closeDialog = function() {
			$mdDialog.hide();
		}
	})
	.controller('EditCtrl', function($scope, $mdDialog) {
		$scope.closeDialog = function() {
			$mdDialog.hide();
		}
		$scope.displayPrevious = function(accordion, number) {
			$mdDialog.hide();
		}
	})
	.controller('SampleGridCtrl', function($http, $mdDialog, $mdEditDialog, $q, $timeout,$scope) {
		$scope.options = {
			rowSelection: true,
			multiSelect: true,
			autoSelect: true,
			decapitate: false,
			largeEditDialog: false,
			boundaryLinks: false,
			limitSelect: true,
			pageSelect: true
		};

		$scope.selected = [];
		$scope.limitOptions = [5, 10, 15, {
			label: 'All',
			value: function () {
				return $scope.formFields ? $scope.formFields.length : 0;
			}
		}];

		$scope.query = {
			order: 'name',
			limit: 5,
			page: 1
		};


		$scope.showEditDialog = function (event, sampleSelected, number) {
			$mdDialog.show({
				clickOutsideToClose: true,
				scope: $scope,        // use parent scope in template
				preserveScope: true,
				local: sampleSelected,
				contentElement: '#myEditDialog',
			});
		};

		$scope.toggleLimitOptions = function () {
			$scope.limitOptions = $scope.limitOptions ? undefined : [5, 10, 15];
		};
		$scope.onPaginate = function(page, limit) {
			console.log('Scope Page: ' + $scope.query.page + ' Scope Limit: ' + $scope.query.limit);
			console.log('Page: ' + page + ' Limit: ' + limit);

			$scope.promise = $timeout(function () {

			}, 2000);
		};
		$scope.logItem = function (item) {
			console.log(item.name, 'was selected');
		};

		$scope.loadStuff = function () {
			$scope.promise = $timeout(function () {

			}, 2000);
		};

		$scope.logOrder = function(order) {

			console.log('Scope Order: ' + $scope.query.order);
			console.log('Order: ' + order);

			$scope.promise = $timeout(function () {
				$http.get('/app/components/sample/sample.json').then(function (fieldList) {
					$scope.fieldList = fieldList.data;
				});
			}, 2000);
		};
		$http.get('/app/components/sample/sample.json').then(function (fieldList) {
			$scope.fieldList = fieldList.data;
		});
		$scope.showDeleteConfirmationDialog = function(event, parent){
			$mdDialog.show({
				clickOutsideToClose: true,
				scope: $scope,        // use parent scope in template
				preserveScope: true,
				contentElement: '#myDeleteDialog',
			});
		};


	});