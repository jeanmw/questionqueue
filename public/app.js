/*
 * ANGULAR APP.JS
 */

'use strict';

angular.module('question-cookie', ['ngResource', 
                         'ngRoute', 
                         'ngSanitize', 
                         'ngTouch', 
                         'btford.socket-io',
                         'ngCookies',
                         'angularMoment',
                         'question-cookie.services', 
                         'question-cookie.directives', 
                         'question-cookie.interceptors',
                         'question-cookie.filters'])

  // .constant('HOST', 'http://localhost:1337') //DEV
  .constant('HOST', 'http://www.questioncookie.com') //PRODUCTION

  // .run(function(amMoment) {
  //   amMoment.changeLocale('de');
  // })

  .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'templates/splash'
      , controller: 'SplashCtrl'
      })

      .when('/:roomName', {
        templateUrl: 'templates/post-index'
      , controller: 'PostIndexCtrl'
      })

      .otherwise({
        redirectTo: '/'
      });
    $locationProvider.html5Mode(true);
  }]);