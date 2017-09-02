servicesModule.service('sectorService', ['$http', function($http) {
    var sectorService = {};
    sectorService.newsfeed = [];

    sectorService.getNewsfeedBySector = function(token, sector) {
        if (token) {
            return $http
                .get('https://api-nepgo.herokuapp.com/post?sector' + sector + '&token=' + token)
                .then(function(res) {
                    for (var i = 0; i < res.data.length; i++) {
                        if (res.data[i].sector == sector) {
                            sectorService.newsfeed.push(res.data[i]);
                        }
                    }
                    return sectorService.newsfeed;
                });
        }

    };

    return sectorService;
}]);