angular
    .module('drawinboxApp')
    .controller('resourceAllocationCtrl', ['$scope', "ResourceAllocationService", function ($scope, ResourceAllocationService) {

        $scope.requirement = {};
        $scope.showResources = false;

        $scope.getEmployees = function(){
            ResourceAllocationService.getResources($scope.requirement).then(function(data){

                $scope.showResources = true;
                $scope.juniorEmployees = data.juniorEmployees;
                $scope.seniorEmployees = data.seniorEmployees;
            }, errorCallback);
        };

        function errorCallback(err) {

            console.log(err);
        }
    }]);