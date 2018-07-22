/**
 * Created by Txapel on 01/12/2016.
 */
app.controller('LoginCtrl',['$scope', '$mdDialog', 'MyUser', '$filter', '$state','propiedades','$http', function ($scope, $mdDialog, MyUser, $filter, $state, propiedades, $http) {

  $scope.login = function () {
    $http.post(propiedades.SERVER + propiedades.PORT+'/user/login', $scope.credentials)
      .success(function(res){
        console.log(res);
        $state.go("base")
      }).error(function(res, status){

    })
  };

  $scope.addUser = function () {
    $http.post(propiedades.SERVER + propiedades.PORT+'/user', $scope.newUser)
      .success(function(res){
        $scope.registering = false;
        $scope.newUser=null;
        $scope.message="El usuario se ha dado de alta correctamente";
      }).error(function(res, status){
        alert("error");
    })
  };
}]);
