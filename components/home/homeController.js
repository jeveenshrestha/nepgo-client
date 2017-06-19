controllersModule.controller('homeController', ['$scope', 'userService', 'Session', 'ApplicationService', 'homeService', 'profileService', '$state',

    function($scope, userService, Session, ApplicationService, homeService, profileService, $state) {
        $scope.newsfeed = [];
        $scope.userProfile = {};
        $scope.$state = $state;
        var token = window.localStorage.userToken;

        function init() {
            homeService.getNewsfeed(token).then(function(newsfeed) {
                $scope.newsfeed = newsfeed;
                console.log($scope.newsfeed);
            }, function() {});
        }

        $scope.getProfile = function(id) {
            if (token) {
                profileService.getUserDetails(id, token).then(function(details) {
                    $scope.userProfile = details;
                    $state.go('home.profile');
                }, function() {});
            } else {
                $state.go('login');
            }

        };

        init();
    }
]);