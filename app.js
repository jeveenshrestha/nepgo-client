var nepgoApp = angular.module('nepgoApp', ['ui.router', 'nepgoApp.controllers', 'nepgoApp.services', 'nepgoApp.directives']);

nepgoApp.
constant('AUTH_EVENTS', {
        registerSuccess: 'auth-register-success',
        registerFailed: 'auth-register-failed',
        loginSuccess: 'auth-login-success',
        loginFailed: 'auth-login-failed',
        logoutSuccess: 'auth-logout-success',
        sessionTimeout: 'auth-session-timeout',
        notAuthenticated: 'auth-not-authenticated',
        notAuthorized: 'auth-not-authorized'
    })
    .constant('USER_ROLES', {
        user: 'user',
        guest: 'guest'
    })
    .config(function($stateProvider, $urlRouterProvider, USER_ROLES, $httpProvider) {

        // $httpProvider.interceptors.push([
        //     '$injector',
        //     function(injector) {
        //         return $injector.get('AuthInterceptor');
        //     }
        // ]);

        $urlRouterProvider
            .otherwise('/home');

        $stateProvider
            .state('protected-route', {
                url: '/protected',
                resolve: {
                    auth: function resolveAuthentication(AuthResolver) {
                        return AuthResolver.resolve();
                    }
                }
            })
            .state('login', {
                url: '/login',
                templateUrl: 'app/components/login/login.html',
                controller: 'LoginController',
                data: {
                    authenticationRequired: false
                }
            })
            .state('register', {
                url: '/register',
                templateUrl: 'app/components/register/register.html',
                controller: 'registerController',
                data: {
                    authenticationRequired: false
                }
            })
            .state('home', {
                url: '/home',
                templateUrl: 'app/components/home/home.html',
                controller: 'homeController',
                data: {
                    authenticationRequired: true
                }
            })
            .state('timeline', {
                url: '/timeline',
                templateUrl: 'app/components/timeline/timeline.html',
                controller: 'timelineController',
                data: {
                    authenticationRequired: true
                }
            })
            .state('home.profile', {
                parent: 'home',
                url: '/profile',
                templateUrl: 'app/components/profile/profile.html',
                controller: 'profileController',
                data: {
                    authenticationRequired: true
                }
            })
            .state('userProfile', {
                url: '/userProfile',
                templateUrl: 'app/shared/userProfile.html',
                controller: 'ApplicationController',
                data: {
                    authenticationRequired: true
                }
            });
    })
    .factory('AuthInterceptor', function($rootScope, $q, AUTH_EVENTS) {
        return {
            responseError: function(response) {
                $rootScope.$broadcast({
                    401: AUTH_EVENTS.notAuthenticated,
                    403: AUTH_EVENTS.notAuthorized,
                    419: AUTH_EVENTS.sessionTimeout,
                    440: AUTH_EVENTS.sessionTimeout
                }[response.status], response);
                return $q.reject(response);
            }
        };
    })
    .run(function($rootScope, AUTH_EVENTS, AuthService) {
        $rootScope.$on('$stateChangeStart', function(event, toState) {
            if (!AuthService.isAuthorized()) {
                if (!toState.data.authenticationRequired) {
                    event.preventDefault();
                }
            }
        })
    });

var controllersModule = angular.module('nepgoApp.controllers', []);
var servicesModule = angular.module('nepgoApp.services', []);
var directivesModule = angular.module('nepgoApp.directives', []);