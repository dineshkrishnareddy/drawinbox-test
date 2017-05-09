angular.module('drawinboxApp')
    .factory('ResourceAllocationService', [
        'MainFactory',
        function(MainFactory) {

            return {

                getResources : function(data) {

                    return MainFactory.httpService({
                        method: 'POST',
                        url: '/api/resources',
                        data: data
                    });
                }
            }
        }
    ]);