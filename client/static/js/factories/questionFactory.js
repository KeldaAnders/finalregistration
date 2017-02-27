angular.module('tokenizer')
    .factory("questionFactory", ["$http", function($http) {
        const factory = {};

        console.log('questionFactory js loaded');
        //Initialize our list of friends
        var users = [];

        function handleErrors(err) {
            console.error(err);
        }
        factory.getQuestions = function(callback) {
            // console.log('get questions');
            $http.get('/questions')
                .then(function(response) {
                    if (response.data.success) {
                        callback(response.data)
                    }
                })
                .catch(handleErrors)
        };

        //Pass the question info to controller
        factory.showQuestion = function(questionId, callback) {
            console.log('show questionId Factory', questionId);
            $http.get('/question/' + questionId)
                .then(function(response) {
                    if (response.data.success) {
                        callback(response.data);
                        console.log(response.data);
                    }

                })
                .catch(handleErrors);
        };

        factory.createQuestion = function(question, callback) {
            // console.log('factory answer', answeredText);
            $http.post('/question', question)
                .then(function(response) {
                    if (response.data.success) {
                        callback(response.data)
                    }
                })
                .catch(handleErrors)
        };

        //Pass the topic info to controller
        factory.getQuestion = function(questId, callback) {
            console.log('show Id Factory', questId);
            $http.get('/question/' + questId)
                .then(function(response) {
                    if (response.data.success) {
                        callback(response.data);
                        console.log(response.data);
                    }

                })
                .catch(handleErrors);
        };
        //       //////////////////// Answer SECTION    ////////////////////


        factory.createAnswer = function(question, answer, callback) {
            console.log('factory answer', question, answer);
            $http.put('question/answer/'+ question._id , answer)
                .then(function(response) {
                    if (response.data.success) {
                        callback(response.data)
                    }
                })
                .catch(handleErrors)
        };

        // ///////////////////////////// Likes ////////////////////
        // factory.addRank = function( answer, callback) {
        //     console.log('answerID',answer);
        //     $http.put('/addrank', answer)
        //         .then(function(response) {
        //             if (response.data.success) {
        //                 callback(response.data)
        //             }
        //         })
        //         .catch(handleErrors)
        // };
        // 
        // factory.rmvRank = function( answer, callback) {
        //     console.log('answerID',answer);
        //     $http.put('/rmvrank', answer)
        //         .then(function(response) {
        //             if (response.data.success) {
        //                 callback(response.data)
        //             }
        //         })
        //         .catch(handleErrors)
        // };

        //    // Most important step: return the object so it can be used by the rest of our angular code
        return factory;


    }]);