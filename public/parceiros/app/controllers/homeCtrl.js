angular.module('dash')

  .controller('homeCtrl', function($scope,$http, graphMaker){

    graphMaker.make();
    var socket = io();

    socket.on('attgraph', function(){
      graphMaker.users();
    });


  });
