(function () {
    'use strict';

    angular
        .module('app')
        .factory('AuthenticationService', AuthenticationService);

    AuthenticationService.$inject = ['$http', '$cookies', '$rootScope', 'UserService'];
    function AuthenticationService($http, $cookies, $rootScope, UserService) {
        let service = {};

        service.Login = Login;
        service.SetCredentials = SetCredentials;
        service.ClearCredentials = ClearCredentials;

        return service;

        function Login(email, password, callback) {
            /* Use this for real authentication
             ----------------------------------------------*/
            $http.post('/api/user/login', { email: email, password: password })
                .then(response => {
                    SetCredentials(response);
                    callback(response);
                })
                .catch(err => {
                    console.log("login error -> ", err);
                });
        }

        function SetCredentials(user) {
            $rootScope.globals = {
                currentUser: {
                    email: user.email,
                    token: user.token
                }
            };
            // set default auth header for http requests
            $http.defaults.headers.common['Authorization'] = 'access' + user.token;
            // store user details in globals cookie that keeps user logged in for 1 week (or until they logout)
            let cookieExp = new Date();
            cookieExp.setDate(cookieExp.getDate() + 7);
            $cookies.putObject('globals', $rootScope.globals, { expires: cookieExp });
        }

        function ClearCredentials() {
            $rootScope.globals = {};
            $cookies.remove('globals');
            $http.defaults.headers.common.Authorization = 'access';
        }
    }
})();