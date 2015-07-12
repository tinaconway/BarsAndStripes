(function() {
  'use strict';
  angular.module('profile')
    .controller('ProfileController', function($scope, $auth, $alert, Account, $rootScope) {

      /**
       * Get user's profile information.
       */
        Account.getProfile()
          .success(function(data) {
            console.log(data.displayName);
            $rootScope.user = data;
            $rootScope.username = data.displayName
          })
          .error(function(error) {
            $alert({
              content: error.message,
              animation: 'fadeZoomFadeDown',
              type: 'material',
              duration: 3
            });
          });


      /**
       * Update user's profile information.
       */
      $scope.updateProfile = function() {
        Account.updateProfile({
          displayName: $scope.user.displayName,
          email: $scope.user.email
        }).then(function() {
          $alert({
            content: 'Profile has been updated',
            animation: 'fadeZoomFadeDown',
            type: 'material',
            duration: 3
          });
        });
      };

      /**
       * Link third-party provider.
       */
      $scope.link = function(provider) {
        $auth.link(provider)
          .then(function() {
            $alert({
              content: 'You have successfully linked ' + provider + ' account',
              animation: 'fadeZoomFadeDown',
              type: 'material',
              duration: 3
            });
          })
          .then(function() {
            $scope.getProfile();
          })
          .catch(function(response) {
            $alert({
              content: response.data.message,
              animation: 'fadeZoomFadeDown',
              type: 'material',
              duration: 3
            });
          });
      };

      /**
       * Unlink third-party provider.
       */
      $scope.unlink = function(provider) {
        $auth.unlink(provider)
          .then(function() {
            $alert({
              content: 'You have successfully unlinked ' + provider + ' account',
              animation: 'fadeZoomFadeDown',
              type: 'material',
              duration: 3
            });
          })
          .then(function() {
            $scope.getProfile();
          })
          .catch(function(response) {
            $alert({
              content: response.data ? response.data.message : 'Could not unlink ' + provider + ' account',
              animation: 'fadeZoomFadeDown',
              type: 'material',
              duration: 3
            });
          });
      };

    });
}());
