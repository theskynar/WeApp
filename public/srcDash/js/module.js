var app = angular.module('app', [])
  .config(function($httpProvider){

    $httpProvider.interceptors.push('interceptor');
  });
