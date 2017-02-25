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


        //Remove the user from the list
        factory.delete = function(user, callback) {
            // console.dir(user);
            $http.delete('/users/' + user._id)
                .then(function(response) {
                    if (response.data.success) {
                        console.log(response.data, 'res');
                        callback(response.data)
                    }
                })
                .catch(handleErrors);

        };

        ///////////////////// User's Topic ////////////////////////
        factory.updateUserTopic = function(postObj, callback) {
            // console.log(postObj, 'post Object');
            $http.put('/userstopic', postObj)
                .then(function(response) {
                    if (response.data.success) {
                        console.log('success=============', response.data);
                        callback(response.data)
                    }
                })
        };
        factory.deleteTopic = function(topic, callback) {
            console.log(topic, '***** topic in USER Factory');
            $http.put('/userstopic/' + topic.createdBy, topic)
                .then(function(response) {
                    if (response.data.success) {
                        console.log(response.data, 'res');
                        callback(response.data)
                    }
                })
                .catch(handleErrors);

        };
        ///////////////////// User's Post ////////////////////////
        factory.updateUserPost = function(postObj, callback) {
            // console.log(postObj, 'post Object');
            $http.put('/userspost', postObj)
                .then(function(response) {
                    if (response.data.success) {
                        console.log('success=============', response.data);
                        callback(response.data)
                    }
                });
        };
        factory.deletePost = function(post, callback) {
            console.log(post, '***** post');
            $http.put('/userspost/' + post.postedBy, post)
                .then(function(response) {
                    if (response.data.success) {
                        console.log(response.data, 'res');
                        callback(response.data)
                    }
                })
                .catch(handleErrors);

        };
        
    
              

        //    // Most important step: return the object so it can be used by the rest of our angular code
        return factory;


    }]);