servicesModule.service('homeService', ['$http', function($http) {
    var homeService = {};

    homeService.getNewsfeed = function(token) {
        if (token) {
            return $http
                .get('https://nepgo.herokuapp.com/search?type=newsfeed&token=' + token)
                .then(function(res) {
                    return res.data;
                });
        } else {
            return $http
                .get('https://nepgo.herokuapp.com/search?type=newsfeed')
                .then(function(res) {
                    return res.data;
                });
        }

    };

    return homeService;
}]);