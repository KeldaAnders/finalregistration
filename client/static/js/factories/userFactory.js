angular.module('tokenizer')
    .factory("userFactory", ["$http", function($http) {
        const factory = {};

        console.log('userFactory js loaded');
        //Initialize our list of friends
        var users = [];

        function handleErrors(err) {
            console.error(err);
        }

        factory.login = function(userData, callback, errback) {
            console.log('login factory');
            return $http.post('/auth/login', userData)
                .then(callback, errback);
        };


        factory.register = function(userData, callback) {
            console.log('register factory', userData);
            return $http.post('/auth/register', userData)
                .then(callback)
                .catch(handleErrors);
        };
        //Pass the user info to controller
        factory.showUser = function(userId, callback) {
            // console.log('showUser Factory', userId);
            $http.get('/user/' + userId)
                .then(function(response) {
                    if (response.data.success) {
                        callback(response.data);
                        // console.log(response.data.user);
                    }

                })
                .catch(handleErrors);
        };
        factory.getUsers = function(callback) {
            $http.get('/users')
                .then(function(response) {
                    if (response.data.success) {
                        callback(response.data)
                    }
                })
                .catch(handleErrors)
        };


      ///////////////////// Question section ////////////////////////
      
    
      factory.updateUserquestion = function(postObj, callback) {
        // console.log(postObj, 'post Object');
        $http.put('/usersquestion', postObj)
            .then(function(response) {
                if (response.data.success) {
                    console.log('success=============', response.data);
                    callback(response.data)
                }
            })
    };

        
    
              

        //    // Most important step: return the object so it can be used by the rest of our angular code
        return factory;


    }]);