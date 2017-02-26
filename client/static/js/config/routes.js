
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
                    controller: 'UsersController',
                    templateUrl: 'static/partials/_home.html'
               })
                .otherwise({
                    redirectTo: '/'
                });
                
            console.log('routes js loaded');
        }
    ]);


