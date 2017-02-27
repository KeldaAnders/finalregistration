angular.module('tokenizer')
    .controller("AnswerController", ["$scope", "$routeParams", "$location", "$route", 'userFactory', 'AuthService', function($scope, $routeParams, $location, $route, userFactory, auth) {
      
        console.log(' ***** home Controller loaded ***** ');
        if (!auth.isAuthed()) {
            return $location.url('/');
        }

        $scope.users = []

        // // When this controller is loaded, fetch the user list
      
            userFactory.getUsers(function(response) {
                $scope.users = response.users;
                console.log('users ran');
            });
  

        //When this controller is loaded, fetch this User
  
            auth.showUser(function(userData) {
                $scope.thisUser = userData;
                console.log($scope.thisUser, '*********** scopeUser ***********');

            });

      ///Delegate deleting user to the factory
        $scope.delete = function(user, idx) {
            // console.log('start', topic,'= TOPIC ----- ', idx,'= index ----- ');
            var userIndex = idx;
            userFactory.delete(user, function(response) {
                $scope.users.splice(userIndex, 1);
                console.log('response.data.success from Users', response);
            });
        };
        
        $scope.logout = function() {
            auth.logout();
            $location.url('/');
        };


    }]);