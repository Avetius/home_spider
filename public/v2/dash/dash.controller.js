/**
 * Created by sirius on 9/22/17.
 */
(function () {
    'use strict';

    angular
        .module('app')
        .controller('DashController', DashController);

    DashController.$inject = ['UserService', '$rootScope'];
    function DashController(UserService, $rootScope) {
        let vm = this;

        vm.user = null;
        vm.allUsers = [];
        vm.deleteUser = deleteUser;

        initController();

        function initController() {
            loadCurrentUser();
            loadAllUsers();
        }

        function loadCurrentUser() {
            UserService.GetByEmail($rootScope.globals.currentUser.username)
                .then(function (user) {
                    vm.user = user;
                });
        }

        function loadAllUsers() {
            UserService.GetAll()
                .then(function (users) {
                    vm.allUsers = users;
                });
        }

        function deleteUser(id) {
            UserService.Delete(id)
                .then(function () {
                    loadAllUsers();
                });
        }
        /*-----------------------------------------*/

        let app = angular.module("gates", ['ws'])
            .config(function (wsProvider) {
                wsProvider.setUrl('ws://localhost:8088');
            })
            .controller('gateCtrl', function($scope, $http, ws, $log) {
                $scope.gateCtrl = function (data) {
                    /*
                     $http.post('/gate/open/'+data)
                     .success(function(data){
                     $scope.formData = {}; // clear the form so our user is ready to enter another
                     $scope.product = data;
                     console.log(data);
                     })
                     .error(function(data){
                     console.log('Error in $http.post("/gate/open' + data + '"');
                     })
                     */
                    ws.send('/gate/open'+data);
                };
                ws.on('message', (event) => {
                    $log.info('New message', event.data);
                });
                $scope.lightCtrl = function (data) {
                    /*
                     $http.post('/light/entrance/'+data)
                     .success(function(data){
                     $scope.formData = {}; // clear the form so our user is ready to enter another
                     $scope.product = data;
                     console.log(data);
                     })
                     .error(function(data){
                     console.log('Error in $http.post("/light/open' + data + '"');
                     })
                     */
                    let wsObj = {

                    };
                    ws.send('/light/entrance/'+data);

                };
            });
        /*-----------------------------------------*/
    }

})();