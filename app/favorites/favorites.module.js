(function () {
  'use strict';
  angular
    .module('favorites', [
      'ngRoute'
    ])
    .config(function ($routeProvider) {
      $routeProvider
      .when('/favorites/:_id', {
        templateUrl: 'favorites/Views/detail.html',
        controller: 'FavoritesController'
      })
      .when('/favorites', {
        templateUrl: 'favorites/Views/list.html',
        controller: 'FavoritesController'
      });
    });
})();
