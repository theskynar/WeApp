(function() {
'use strict';

    angular.module('app').controller('financesHome', function($http, $scope) {
        $scope.moneyCart = 500.75;
        $scope.receiveMoney = 200.05;
        $scope.payMoney = 489.09;
    });
})();