angular.module('dash')

  .controller('homeCtrl', function($scope,$http, graphMaker){


    graphMaker.users();
    var socket = io();
    socket.on('attgraphdesc', function(){
      graphMaker.users();
    });


  });
