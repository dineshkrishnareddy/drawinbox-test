angular
    .module('drawinboxApp')
    .controller('employeeCtrl', ['$scope', "EmployeeService", "$route", function ($scope, EmployeeService, $route) {
        $scope.employees = $route.current.locals.employees;

        $scope.add = function() {

            EmployeeService.add($scope.employee).then(function(data){

                $scope.employees.push(data);
            }, errorCallback);
            $scope.employee = undefined;
        };

        $scope.edit = function(index) {

            $scope.employee = angular.copy($scope.employees[index]);
            $scope.editIndex = index;
        };

        $scope.update = function(id){

            EmployeeService.update(id, $scope.employee).then(function(data){

                $scope.employees[$scope.editIndex] = data;
                $scope.editIndex = undefined;
            }, errorCallback);
            $scope.employee = undefined;
        };

        $scope.delete = function(id, index) {

            EmployeeService.remove(id).then(function(data){

                $scope.employees.splice(index, 1);
            }, errorCallback);
        };

        function refreshData() {

            EmployeeService.getAllEmployees().then(function(data){

                $scope.employees = data;
            }, errorCallback);
        }

        function errorCallback(err) {

            console.log(err);
        }
    }]);