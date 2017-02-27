angular.module('tokenizer')
    .controller("HomeController", ["$scope", "$routeParams", "$location", "$route", 'userFactory', 'questionFactory', 'AuthService', function($scope, $routeParams, $location, $route, userFactory, questionFactory, auth) {

        console.log(' ***** home Controller loaded ***** ');
        if (!auth.isAuthed()) {
            return $location.url('/');
        }

        $scope.users = [];
        $scope.questions = [];

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

        /////////////////////// Get Questions /////////////////////////////
        questionFactory.getQuestions(function(response, callback) {
            $scope.questions = response.question;
            console.log(response, '-----response-----');

        });
        
        $scope.logout = function() {
            auth.logout();
            $location.url('/');
        };


    }]);