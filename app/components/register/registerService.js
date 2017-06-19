servicesModule.service('registerService', ['$http', function($http) {
    var registerService = {};

    registerService.register = function(user) {
        return $http
            .post('https://nepgo.herokuapp.com/user', user)
            .then(
                function(res) {

                },
                function(err) {
                    return err.data.err;
                });
    };

    return registerService;
}]);