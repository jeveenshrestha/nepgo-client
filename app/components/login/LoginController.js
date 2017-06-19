controllersModule.controller('LoginController', ['$scope', '$rootScope', 'AUTH_EVENTS', 'AuthService', '$state',
    function($scope, $rootScope, AUTH_EVENTS, AuthService, $state) {
        $scope.$state = $state;

        $scope.authErr = {
            error: false,
            text: ''
        };

        $scope.credentials = {
            email: '',
            password: ''
        };

        $scope.login = function(credentials) {
            AuthService.login(credentials)
                .then(function(resp) {
                    if (typeof resp == 'object') {
                        $scope.setCurrentUser(resp);
                        $state.go('home');
                    } else {
                        console.log(resp)
                        $scope.authErr = { error: true, text: resp };
                    }

                })
        };
    }
]);