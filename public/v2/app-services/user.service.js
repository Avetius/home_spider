(function () {
    'use strict';

    angular
        .module('app')
        .factory('UserService', UserService);

    UserService.$inject = ['$http'];
    function UserService($http) {
        let service = {};

        service.GetAll = GetAll;
        service.GetById = GetById;
        service.GetByEmail = GetByEmail;
        service.Create = Create;
        service.Update = Update;
        service.Delete = Delete;

        return service;

        function GetAll() {
            return $http.get('/api/user/all').then(handleSuccess, handleError('Error getting all users'));
        }

        function GetById(id) {
            return $http.get('/api/user/id/' + id).then(handleSuccess, handleError('Error getting user by id'));
        }

        function GetByEmail(email) {
            return $http.get('/api/user/email/' + email).then(handleSuccess, handleError('Error getting user by email'));
        }

        function Create(user) {
            return $http.post('/api/user/signup', user)
                .then(
                    user,
                    handleSuccess,
                    handleError('Error creating user')
                )
                .catch( err => {
                    handleError(err);
                })
        }

        function Update(user) {
            return $http.put('/api/user/' + user.id, user).then(handleSuccess, handleError('Error updating user'));
        }

        function Delete(id) {
            return $http.delete('/api/user/' + id).then(handleSuccess, handleError('Error deleting user'));
        }

        // private functions

        function handleSuccess(res) {
            console.log('handleSuccess res-> ',res);
            if(res.status===400){
                return "Registration failed";
            }else{
                return "Registered";
            }

        }

        function handleError(error) {
            return function () {
                return { success: false, message: error };
            };
        }
    }

})();
