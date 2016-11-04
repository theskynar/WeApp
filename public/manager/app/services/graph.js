angular.module('dash')
  .factory('graphMaker', function($http, $filter){

    var graph = {};

    graph.getMonth = function(){
      return new Date().getMonth();
    }

    graph.make = function(){
      var self = this;
      $http.get('/manager/estatisticas/getCompras+getUsers')
        .success(function(data){
          self.descontos(data.getCompras);
          self.usuarios(data.getUsers);
        });
    }

    graph.descontos = function(data){
      var descontoDoMes =
        $filter('currency')(data.desconto[this.getMonth()]);
      $('#qDescontos').html(descontoDoMes);
      dataSales.series[1] = data.desconto;
      dataSales.series[0] = data.total;
      Chartist.Line('#chartHours', dataSales, optionsSales, responsiveSales);
    }

    graph.usuarios = function(users){
      $('#qUsers').html(users.total);
      data.series[0] = users.mes;
      Chartist.Line('#chartActivity', data, options, responsiveOptions);
    }

    return graph;

  })


// Descontos.

  var dataSales = {
    labels: ['Jan','Fev','Mar','Abr','Maio','Jun','Jul','Ago','Set','Out','Nov','Dez'],
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

  // Usuarios.

  var data = {
    labels: ['Jan','Fev','Mar','Abr','Maio','Jun','Jul','Ago','Set','Out','Nov','Dez'],
    series: []
  };

  var options = {
      seriesBarDistance: 10,
      axisX: {
          showGrid: false
      },
      height: "245px"
  };

  var responsiveOptions = [
    ['screen and (max-width: 640px)', {
      seriesBarDistance: 5,
      axisX: {
        labelInterpolationFnc: function (value) {
          return value[0];
        }
      }
    }]
  ];
