servicesModule.service('homeService', ['$http', '$state', 'Session', function($http, $state, Session) {
    var homeService = {};
    homeService.currentUser = Session.currentUser;

    homeService.getNewsfeed = function(token) {
        if (token) {
            return $http
                .get('https://api-nepgo.herokuapp.com/post?token=' + token)
                .then(function(res) {
                    return res.data;
                });
        } else {
            return $http
                .get('https://api-nepgo.herokuapp.com/post')
                .then(function(res) {
                    return res.data;
                });
        }

    };

    homeService.likePost = function(token, id) {
        if (token) {
            return $http
                .put('https://api-nepgo.herokuapp.com/post/' + id + '/like?token=' + token)
                .then(function(res) {
                    return res.data;
                })
        } else {
            $state.go('login');
        }
    }

    homeService.postComment = function(token, id, commentObj) {
        if (token) {
            return $http
                .post('https://api-nepgo.herokuapp.com/post/' + id + '/comment?token=' + token, commentObj)
                .then(function(res) {
                    return res.data;
                })
        } else {
            $state.go('login');
        }
    }
    homeService.postStatus = function(token, status) {
        if (token) {
            return $http
                .post('https://api-nepgo.herokuapp.com/post?token=' + token, status)
                .then(function(res) {
                    return res.data;
                }, function(err) {
                    return err.data.err;
                })
        } else {
            $state.go('login');
        }
    }
    homeService.deletePost = function(token, id) {
        if (token) {
            return $http
                .delete('https://api-nepgo.herokuapp.com/post/' + id + '?token=' + token)
                .then(function(res) {
                    return res.data;
                }, function(err) {

                })
        } else {
            $state.go('login');
        }
    }

    homeService.deleteComment = function(token, postId, commentId) {
        if (token) {
            return $http
                .delete('https://api-nepgo.herokuapp.com/post/' + postId + '/comment/' + commentId + '?token=' + token)
                .then(function(res) {
                    return res.data;
                }, function(err) {

                })
        } else {
            $state.go('login');
        }
    }

    return homeService;
}]);