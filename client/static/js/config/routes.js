////  inject the ngRoute dependency in the module.
angular.module('tokenizer', ['ngRoute'])
    .config(['$httpProvider', '$routeProvider',
        function($httpProvider, $routeProvider) {
            $httpProvider.interceptors.push('authInterceptor');

            $routeProvider
                .when('/', {
                    controller: 'UsersController',
                    templateUrl: 'static/partials/_loginReg.html'
                })
                .when('/dashboard', {
                    controller: 'TopicController',
                    templateUrl: 'static/partials/_dashboard.html'
                })
                .when('/user/:id', {
                    controller: 'TopicController',
                    templateUrl: 'static/partials/_userWall.html'
                })
                .when('/topic/:id', {
                    controller: 'TopicController',
                    templateUrl: 'static/partials/_topicWall.html'
                })
                .otherwise({
                    redirectTo: '/'
                });
                
            console.log('routes js loaded');
        }
    ]);


