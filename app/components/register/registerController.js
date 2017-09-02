controllersModule.controller('registerController', ['$scope', 'registerService', '$rootScope', 'AUTH_EVENTS', '$state', 'ApplicationService', function($scope, registerService, $rootScope, AUTH_EVENTS, $state, ApplicationService) {

    $scope.user = {
        email: "",
        name: "",
        password: "",
        confirm_password: "",
        sectors: [],
        roles: []
            /*role: "academia",
            country: "NP",
                city: "kathmandu",
                address: "",
                
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
    $scope.selectedSector = $scope.sectors[0];
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

    /*$scope.selectRole = function() {
        $scope.role = "";
    }*/

    $scope.toggleCheckSector = function(sector) {
        if ($scope.user.sectors.indexOf(sector) === -1) {
            $scope.user.sectors.push(sector);
        } else {
            $scope.user.sectors.splice($scope.user.sectors.indexOf(), 1);
        };
    }

    $scope.toggleCheckRole = function(role) {
        if ($scope.user.roles.indexOf(role) === -1) {
            $scope.user.roles.push(role);
        } else {
            $scope.user.roles.splice($scope.user.role.indexOf(), 1);
        };
    }

    var getSectors = function() {
        ApplicationService.getSectors()
            .then(function(sectors) {
                $scope.sectors = sectors;
                $scope.user.sectors.push(sectors[0]);
            })
    };

    var getRoles = function() {
        ApplicationService.getRoles()
            .then(function(roles) {
                $scope.roles = roles;
                $scope.user.roles.push(roles[0]);
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
    getSectors();
    /*getCountries();*/

}]);