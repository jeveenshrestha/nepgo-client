controllersModule.controller('profileController', ['$scope', '$state', '$stateParams', 'Session', 'userService', 'profileService', function($scope, $state, $stateParams, Session, userService, profileService) {
    $scope.userProfile = {};
    $scope.profile = {}
    $scope.editorEnabled = false;
    $scope.successfulEdited = false;
    var token = window.localStorage.userToken;
    var userId = $stateParams.userId;
    $scope.getProfile = function(id) {
        if (token) {
            profileService.getUserDetails(id, token).then(function(details) {
                $scope.userProfile = details[0];
                $scope.profile = {
                    educations: details[0].educations,
                    skills: details[0].skills,
                    extra_info: details[0].extra_info,
                    experiences: details[0].experiences
                }
                $state.go('home.userProfile');
            }, function() {});
        } else {
            $state.go('login');
        }
    };
    $scope.edit = function() {
        $scope.editorEnabled = true;
    }
    $scope.save = function() {
        $scope.editorEnabled = false;
        profileService.saveProfile(userId, token, $scope.profile).then(function(res) {
            if (typeof res == 'object') {
                $scope.successfulEdited = true;
                $scope.getProfile(userId);
            }
        })
    }
    $scope.getProfile(userId);

}]);