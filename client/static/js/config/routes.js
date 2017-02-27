
angular.module('tokenizer', ['ngRoute'])
    .config(['$httpProvider', '$routeProvider',
        function($httpProvider, $routeProvider) {
            $httpProvider.interceptors.push('authInterceptor');

            $routeProvider
                .when('/', {
                    controller: 'UsersController',
                    templateUrl: 'static/partials/_loginReg.html'
                })
                .when('/home', {
                    controller: 'HomeController',
                    templateUrl: 'static/partials/_home.html'
               })
               .when('/new_question', {
                   controller: 'QuestionController',
                   templateUrl: 'static/partials/_new_question.html'
              })
              .when('/question/:id/new_answer', {
                  controller: 'QuestionController',
                  templateUrl: 'static/partials/_new_answer.html'
             })
              .when('/question/:id', {
                  controller: 'QuestionController',
                  templateUrl: 'static/partials/_question.html'
             })
                .otherwise({
                    redirectTo: '/'
                });
                
            console.log('routes js loaded');
        }
    ]);


