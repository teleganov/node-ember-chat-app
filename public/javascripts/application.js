var App = angular.module('chat', [
  'ngRoute',
  'luegg.directives',
  'ngAnimate',
  'ngCookies'
]);

App.factory('socket', ['$rootScope', function ($rootScope) {
  var socket = io();

  return {
    on: function (eventName, callback) {
      function wrapper() {
        var args = arguments;
        $rootScope.$apply(function () {
          callback.apply(socket, args);
        });
      }

      socket.on(eventName, wrapper);

      return function () {
        socket.removeListener(eventName, wrapper);
      };
    },

    emit: function (eventName, data, callback) {
      socket.emit(eventName, data, function () {
        var args = arguments;
        $rootScope.$apply(function () {
          if(callback) {
            callback.apply(socket, args);
          }
        });
      });
    },

    io: socket
  };
}]);

App.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: "javascripts/templates/main.html",
      controller: "MainController"
    });
});