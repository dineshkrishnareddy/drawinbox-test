angular.module('drawinboxApp')
    .factory('EmployeeService', [
        'MainFactory',
        function(MainFactory) {

            return {

                getAllEmployees: function () {

                    return MainFactory.httpService({
                        method: 'GET',
                        url: '/api/employees'
                    });
                },
                
                add : function(employees) {

                    return MainFactory.httpService({
                        method: 'POST',
                        url: '/api/employees',
                        data: employees
                    });
                },
    
                update : function(id, employees) {
    
                    return MainFactory.httpService({
                        method: 'PUT',
                        url: '/api/employees/'+ id,
                        data: employees
                    });
                },
    
                remove : function(id) {
    
                    return MainFactory.httpService({
                        method: 'DELETE',
                        url: '/api/employees/' + id
                    });
                }
            }
        }
    ]);