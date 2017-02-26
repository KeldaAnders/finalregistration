angular.module('tokenizer')
    .controller("HomeController", ["$scope", "$routeParams", "$location", "$route", 'userFactory', 'AuthService', function($scope, $routeParams, $location, $route, userFactory, auth) {
      
        console.log(' ***** home Controller loaded ***** ');
        if (!auth.isAuthed()) {
            return $location.url('/');
        }

        $scope.users = []

        // // When this controller is loaded, fetch the user list
        $scope.getUsers = function() {
            userFactory.getUsers(function(response) {
                $scope.users = response.users;
                console.log('users ran');
            });
        };

        //When this controller is loaded, fetch this User
        $scope.showUser = function() {
            auth.showUser(function(userData) {
                $scope.thisUser = userData;
                console.log($scope.thisUser, '*********** scopeUser ***********');

            });

        };
        $scope.logout = function() {
            auth.logout();
            $location.url('/');
        };


    }]);