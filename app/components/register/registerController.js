controllersModule.controller('registerController', ['$scope', 'registerService', '$rootScope', 'AUTH_EVENTS', '$state', 'ApplicationService', function($scope, registerService, $rootScope, AUTH_EVENTS, $state, ApplicationService) {

    $scope.user = {
        email: "",
        name: "",
        password: "",
        confirmPassword: "",
        role: "academia",
        /*country: "NP",
            city: "kathmandu",
            address: "",
            sectors: [],
            experiences: [],
            educations: [],
            skills: [],
            profession: "",
            locale: "en",
        
            extra_info: ""*/
    };
    $scope.text = 'me@example.com';
    $scope.error = {
        error: false,
        text: ''
    }
    $scope.emailFormat = '/^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/';
    $scope.sectors = [];
    $scope.roles = [];
    $scope.selectedRole = $scope.roles[0];
    $scope.countries = [];
    $scope.cities = [];


    $scope.register = function(user) {
        registerService.register(user).then(function(resp) {
            if (resp) {
                $scope.error = {
                    error: true,
                    text: resp
                };
            } else {
                $state.go('login');
            }
        });
    };

    $scope.selectRole = function() {
        $scope.role = "";
    }

    $scope.toggleCheck = function(sector) {
        if ($scope.user.sectors.indexOf(sector._id) === -1) {
            $scope.user.sectors.push(sector._id);
        } else {
            $scope.user.sectors.splice($scope.user.sectors.indexOf(sector._id), 1);
        };
    }

    var getSectors = function() {
        ApplicationService.getSectors()
            .then(function(sectors) {
                $scope.sectors = sectors;
                $scope.user.sectors.push(sectors[0]._id);
            })
    };

    var getRoles = function() {
        ApplicationService.getRoles()
            .then(function(roles) {
                $scope.roles = roles;
            })
    };

    var getCountries = function() {
        ApplicationService.getCountries()
            .then(function(countries) {
                $scope.countries = countries;
                $scope.cities = countries[0].cities;
            })
    };




    getRoles();
    /*getSectors();
    getCountries();*/

}]);