angular
    .module('drawinboxApp')
    .config(function($routeProvider) {
        $routeProvider
        .when("/employees", {
            templateUrl : "client/views/employees.html",
            controller : "employeeCtrl",
            resolve : {
                employees: ["EmployeeService", function (EmployeeService) {
                    return EmployeeService.getAllEmployees();
                }]
            }
        })
        .when("/resource-allocation", {
            templateUrl : "client/views/resourceAllocation.html",
            controller : "resourceAllocationCtrl"
        })
        .otherwise({
            redirectTo: '/employees'
        });
    });