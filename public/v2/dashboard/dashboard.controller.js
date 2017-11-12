/**
 * Created by sirius on 9/13/17.
 */
let app = angular.module("gates", ['angularPaho']);
app.controller('gateCtrl', 'MqttClient', function($scope, $http) {
    $scope.gateCtrl = function (data) {
        $http.post('/gate/open/'+data)
            .success(function(data){
                $scope.formData = {}; // clear the form so our user is ready to enter another
                $scope.product = data;
                console.log(data);
            })
            .error(function(data){
                console.log('Error in $http.post("/gate/open' + data + '"');
            })
    };
    $scope.lightCtrl = function (data) {
        $http.post('/light/entrance/'+data)
            .success(function(data){
                $scope.formData = {}; // clear the form so our user is ready to enter another
                $scope.product = data;
                console.log(data);
            })
            .error(function(data){
                console.log('Error in $http.post("/light/open' + data + '"');
            })
    };
});