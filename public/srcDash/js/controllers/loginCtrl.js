app.controller("loginCtrl", function($scope, $http){
  $scope.getSession = function session(){
    $http.get('/dashboard/session').success(function(data){
      console.log(data);
    });
  };
  $scope.login = function(user, invalid){
    if(!invalid){
      $http.post('/login',user).success(function(data){
        if(data == 'logado') console.log('logou');
        else console.log(data);
      });
    }else {
      console.log("invalid");
    }
  }
});
