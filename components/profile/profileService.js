servicesModule.service('profileService', ['$http', function($http) {
    var profileService = {};

    profileService.getUserDetails = function(id, token) {
        return $http
            .get('https://nepgo.herokuapp.com/user/' + id + '?token=' + token)
            .then(function(res) {
                console.log(res.data);
                return res.data;
            });
    };

    return profileService;
}]);