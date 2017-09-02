controllersModule.controller('ApplicationController', ['$scope', 'USER_ROLES', 'AuthService', 'Session', 'ApplicationService', '$state', 'profileService', 'sectorService',
    function($scope, USER_ROLES, AuthService, Session, ApplicationService, $state, profileService, sectorService) {
        $scope.currentUser = Session.currentUser;
        $scope.newsfeed = [];
        $scope.userProfile = {};
        $scope.userRoles = null;
        $scope.sectors = [];
        $scope.isAuthorized = AuthService.isAuthorized;
        Session.loadUserCredentials();
        var token = window.localStorage.userToken;

        $scope.setCurrentUser = function(user) {
            $scope.currentUser = user;
        };

        $scope.searchPost = "";

        $scope.getNewsfeedBySector = function(sector) {
            if (token) {
                sectorService.getNewsfeedBySector(token, sector).then(function(newsfeed) {
                    sectorService.newsfeed = newsfeed;
                    //$state.go('home.sector');
                }, function() {});
            } else {
                $state.go('login');
            }
        }

        var getSectors = function() {
            ApplicationService.getSectors()
                .then(function(sectors) {
                    $scope.sectors = sectors;
                })
        }
        $scope.logout = function() {
            Session.logout(function() {
                $scope.currentUser = undefined;
                $state.go('login');
            });
        }
        getSectors;


    }
]);