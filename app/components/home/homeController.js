controllersModule.controller('homeController', ['$scope', 'userService', 'Session', 'ApplicationService', 'homeService', 'profileService', '$state', 'sectorService',

    function($scope, userService, Session, ApplicationService, homeService, profileService, $state, sectorService) {

        $scope.newsfeed = [];
        $scope.userProfile = {};
        $scope.newsfeedBySector = [];
        $scope.postAssignment = false;
        $scope.sectors;
        $scope.selectedSector;
        $scope.roles;
        $scope.selectedRole;
        $scope.$state = $state;
        $scope.assignmentPosted = false;
        var token = window.localStorage.userToken;

        $scope.file = [];
        $scope.status = {
            title: "",
            description: "",
            sector: $scope.selectedSector,
            role: $scope.selectedRole
        }

        $scope.commentObj = {
            text: ""
        }

        $scope.selectedDate = {
            starts_at: "",
            ends_at: ""
        }

        $scope.assignSector = function(sector) {
            $scope.status.sector = sector;
        }

        $scope.assignRole = function(role) {
            $scope.status.role = role;
        }

        function init() {
            homeService.getNewsfeed(token).then(function(newsfeed) {
                $scope.newsfeed = newsfeed;
                console.log($scope.newsfeed);
            }, function() {});
            //getSectors();
        }

        /*var getSectors = function() {
            ApplicationService.getSectors()
                .then(function(sectors) {
                    $scope.sectors = sectors;
                })
        };*/

        Session.loadUserCredentials(function(user) {
            init();
            $scope.sectors = Session.currentUser.sectors;
            $scope.selectedSector = Session.currentUser.sectors[0];
            $scope.roles = Session.currentUser.roles;
            $scope.selectedRole = Session.currentUser.roles[0];
        });

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

        $scope.likePost = function(id, index) {
            homeService.likePost(token, id).then(function() {
                init();
            });

        }

        $scope.assignRoleForComment = function(role) {
            $scope.comment.role = role;
        }

        $scope.comment = {
            text: "",
            role: $scope.selectedRole
        }

        $scope.postComment = function(id) {
            var commentText = document.getElementById("commentText").value;
            var commentObject = {
                text: commentText,
                role: $scope.selectedRole
            }
            homeService.postComment(token, id, commentObject).then(function() {
                init();
                $scope.comment.text = "";
            })
        }

        $scope.postStatus = function(status) {

            homeService.postStatus(token, status).then(function(resp) {
                if (typeof resp == 'object') {
                    $scope.assignmentPosted = true;
                    init();
                } else {
                    console.log(resp);
                }

            });
            $scope.status = {
                title: "",
                description: "",
                sector: "",
                role: ""
            };
            $scope.postAssignment = false;
        }
        $scope.deletePost = function(id) {
            homeService.deletePost(token, id).then(function(resp) {
                init();
            })
        }

        $scope.deleteComment = function(postId, commentId) {
            homeService.deleteComment(token, postId, commentId).then(function(resp) {
                init();
            })
        }

        $scope.uploadToS3 = function(event) {
            const files = document.getElementById("file-input").files;
            const file = files[0];
            if (file == null) {
                return alert('No file selected.');
            }
            getSignedRequest(file);
        }

        function getSignedRequest(file) {
            const xhr = new XMLHttpRequest();
            xhr.open('GET', `https://api-nepgo.herokuapp.com/sign-s3?token=${token}&file-type=${file.type}`);
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        const response = JSON.parse(xhr.responseText);
                        uploadFile(file, response.signedRequest, response.url);
                    } else {
                        alert('Could not get signed URL.');
                    }
                }
            };
            xhr.send();
        }

        function uploadFile(file, signedRequest, url) {
            const xhr = new XMLHttpRequest();
            xhr.open('PUT', signedRequest);
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        //document.getElementById('preview').src = url;
                        //document.getElementById('avatar-url').value = url;
                        var img = $('<img id="dynamic">'); //Equivalent: $(document.createElement('img'))
                        img.attr('src', data.url);
                        img.appendTo('.images');
                    } else {
                        alert('Could not upload file.');
                    }
                }
            };
            xhr.send(file);
        }

        //init();

    }
]);