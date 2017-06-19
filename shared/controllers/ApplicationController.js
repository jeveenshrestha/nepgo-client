controllersModule.controller('ApplicationController', ['$scope', 'USER_ROLES', 'AuthService', 'Session', 'ApplicationService', '$state', 'profileService',
    function($scope, USER_ROLES, AuthService, Session, ApplicationService, $state, profileService) {
        $scope.currentUser = Session.currentUser;
        $scope.userRoles = null;
        $scope.isAuthorized = AuthService.isAuthorized;
        Session.loadUserCredentials();

        $scope.setCurrentUser = function(user) {
            $scope.currentUser = user;
        };



        $scope.logout = function() {
            Session.logout();
            $state.go('home');
        }


    }
]);