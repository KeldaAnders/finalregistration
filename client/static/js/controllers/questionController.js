angular.module('tokenizer')
    .controller("QuestionController", ["$scope", "$routeParams", "$location", "$route", 'userFactory', 'questionFactory', 'AuthService', function($scope, $routeParams, $location, $route, userFactory, questionFactory, auth) {

        console.log(' ***** home Controller loaded ***** ');
        if (!auth.isAuthed()) {
            return $location.url('/');
        }

        $scope.users = []
        $scope.thisQuestion = []
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



        $scope.logout = function() {
            auth.logout();
            $location.url('/');
        };
        //////////////////////////  New Question  //////////////////////////////
        $scope.createQuestion = function() {
            $scope.question.createdBy = $scope.thisUser;
            console.log('Make a question', $scope.question);
            questionFactory.createQuestion($scope.question, function(response) {
                if (response) {
                    userFactory.updateUserquestion(response.question, function(response) {
                        console.log(response);
                        $location.url('/home');
                    });


                }
            });
        };
        $scope.getQuestion = function() {
            questionFactory.getQuestion($route.current.params.id, function(response) {
                console.log('success quest =', response);
                $scope.thisQuestion = response.question;
                console.log($scope.thisQuestion, '$scope.thisQuestion');
            });
        };


        //////////////////////////  New Answer  //////////////////////////////
        $scope.createAnswer = function() {
            $scope.question.answer.answeredBy = $scope.thisUser._id;
            console.log('Make a question', $scope.question);
            questionFactory.createAnswer($scope.thisQuestion, $scope.question.answer, function(response) {
                if (response) {

                    console.log(response);
                    $location.url('/home');


                }
            });
        };


    }]);