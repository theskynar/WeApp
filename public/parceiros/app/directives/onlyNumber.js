angular.module('dash')
  .directive("numberFormater", function ($filter) {
    return {
      require: "ngModel",
      link: function (scope, element, attrs, ctrl) {
          var _formatNumber = function(number){
            if(!number) return number;
            var number = number.replace(/[^0-9]+/g, "");

            return parseInt(number.substr(0,1));
          }

          element.bind("keyup", function () {
            ctrl.$setViewValue(_formatNumber(ctrl.$viewValue));
            ctrl.$render();
          });
        },

      }
  });
