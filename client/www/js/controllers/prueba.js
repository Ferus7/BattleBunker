/**
 * Created by Txapel on 02/12/2016.
 */
app.controller('PruebaCtrl', function ($scope, $mdDialog, MyUser, $filter, $state) {

  $scope.login = function () {
    //spinner
    $mdDialog.show({
      template: '<md-dialog style="background-color:transparent;box-shadow:none">' +
      '<div layout="row" layout-sm="column" layout-align="center center" aria-label="wait">' +
      '<md-progress-circular md-mode="indeterminate" ></md-progress-circular>' +
      '</div>' +
      '</md-dialog>',
      parent: angular.element(document.body),
      clickOutsideToClose: false,
      fullscreen: false
    });
    $scope.spining = true;
    $scope.error = false;

    $scope.loginResult = MyUser.login({rememberMe: $scope.rememberMe}, $scope.credentials,
      function (user) {
        $state.go();
        console.log("todo bien");
        $mdDialog.cancel();
      }, function (err) {
        console.log("error");
        $scope.error = true;
        $mdDialog.cancel();
      });
  };

  $scope.addUser = function () {
    MyUser.create($scope.newUser, function (user) {
      $scope.message = $filter('translate')('USER_CREATED')
    }, function (err) {
      if (err && err.status == 422) {
        var error = err.data.error.details.codes;
        $scope.arrayerror = [];
        for (var attributename in error) {
          if ((error[attributename] + "").includes(",")) {
            var n = (error[attributename] + "").split(",");
            for (var attributename2 in n) {
              $scope.arrayerror.push({'parameter': attributename.toUpperCase(), 'value': n[attributename2] + ""});
            }
          } else {
            $scope.arrayerror.push({'parameter': attributename.toUpperCase(), 'value': error[attributename] + ""});
          }
        }
        console.log($scope.arrayerror)
      }
    });
  };
});
