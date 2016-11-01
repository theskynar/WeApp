angular.module('dash')
  .factory('graphMaker', function($http){

    var graph = {};

    graph.users = function(){
      $http.get('/manager/compras')
        .success(function(data){
          data.desconto.forEach(function(item, key, array){
            if(item === null) array[key] = '0';
          });
          data.total.forEach(function(item, key, array){
            if(item === null) array[key] = '0';
          });
          dataSales.series[1] = data.desconto;
          dataSales.series[1][12] = '0';
          dataSales.series[0] = data.total;
          dataSales.series[0][12] = '0';
          Chartist.Line('#chartHours', dataSales, optionsSales, responsiveSales);
        });
    }

    return graph;

  })


  var dataSales = {
    labels: ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'],
    series: []
  };

  var optionsSales = {
    lineSmooth: false,
    low: 0,
    showArea: true,
    height: "245px",
    axisX: {
      showGrid: false,
    },
    lineSmooth: Chartist.Interpolation.simple({
      divisor: 3
    }),
    showLine: true,
    showPoint: false,
  };

  var responsiveSales = [
    ['screen and (max-width: 640px)', {
      axisX: {
        labelInterpolationFnc: function (value) {
          return value[0];
        }
      }
    }]
  ];
