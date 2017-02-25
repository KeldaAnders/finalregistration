angular.module('tokenizer')
    .controller("UsersController", ["$scope", "$routeParams", "$location", "$route", 'userFactory', 'AuthService', function($scope, $routeParams, $location, $route, userFactory, auth) {
        console.log(' ***** UsersController loaded ***** ');
        $scope.users = []


        // When this controller is loaded, fetch the user list
        $scope.register = function() {
            console.log('register controller');
            userFactory.register($scope.registration, function(response) {
                if (response.data.success ) {
                    console.log("create success end", response);
                    $location.url('/dashboard');
                } else {
                    $scope.errors = response.data.error.errors;
                    console.log(response.data.error.errors);

                }
            });

        };


        $scope.login = function() {
            console.log('login controller');
            userFactory.login(
                $scope.userLogin,
                function(response) {
                    if (response.data.success ){
                        $scope.user = response.data.token;
                        console.log(response.data.token, '=====Token');
                        $location.url('/dashboard');
                    } else {
                        $scope.errors = response.data.errors;
                        console.log(response.data);

                    }
                });

        };




    }]);