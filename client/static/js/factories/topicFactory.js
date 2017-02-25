angular.module('tokenizer')
    .factory("topicFactory", ["$http", function($http) {
        const factory = {};

        console.log('TOPICFactory js loaded');
        //Initialize our list of friends
        var users = [];

        function handleErrors(err) {
            console.error(err);
        }
        factory.getTopics = function(callback) {
            // console.log('get topics');
            $http.get('/topics')
                .then(function(response) {
                    if (response.data.success) {
                        callback(response.data)
                    }
                })
                .catch(handleErrors)
        };
        factory.createTopic = function(topic, callback) {
            // console.log('factory post', postedText);
            $http.post('/topic', topic)
                .then(function(response) {
                    if (response.data.success) {
                        callback(response.data)
                    }
                })
                .catch(handleErrors)
        };

        //Remove the topic from the list
        factory.delete = function(topic, callback) {
            // console.log(topic, '= TOPIC in topic Factory ----- ');
            $http.delete('/topic/' + topic._id)
                .then(function(response) {
                    if (response.data.success) {
                        callback(response.data)
                    }
                })
                .catch(handleErrors);

        };

        //Pass the topic info to controller
        factory.showTopic = function(topicId, callback) {
            console.log('show topicId Factory', topicId);
            $http.get('/topic/' + topicId)
                .then(function(response) {
                    if (response.data.success) {
                        callback(response.data);
                        console.log(response.data);
                    }

                })
                .catch(handleErrors);
        };
        //////////////////// POST SECTION    ////////////////////

        factory.getPosts = function(callback) {
            // console.log('get posts');
            $http.get('/posts')
                .then(function(response) {
                    if (response.data.success) {
                        callback(response.data)
                    }
                })
                .catch(handleErrors)
        };

        factory.createPost = function(postedText, callback) {
            console.log('factory post', postedText);
            $http.post('/post', postedText)
                .then(function(response) {
                    if (response.data.success) {

                        callback(response.data)
                        console.log(response.data, '===========response.data');
                        $http.put('/topicpost', response.data)
                            .then(function(response) {
                                if (response.data.success) {
                                    console.log('topic post success', response);

                                }
                            })
                    }

                })

            .catch(handleErrors)
        };

        //Remove the post from the list
        factory.deletePost = function(post, callback) {
            console.log(post._id, 'id');
            $http.delete('/posts/' + post._id)
                .then(function(response) {
                    if (response.data.success) {
                        callback(response.data)
                        console.log(response.data, '===========response.data');
                        $http.put('/topicremove/' + post.topic, post)
                            .then(function(response) {
                                if (response.data.success) {
                                    console.log('topic remove post success', response);

                                }
                            })
                    }

                })
                .then(function(response) {
                    $http.get('/posts')
                        .then(function(postsResponse) {
                            if (postsResponse.data.success) {
                                callback(postsResponse.data);
                            }
                        });
                })
                .catch(handleErrors);

        };

        ///////////////////////////// Comment Section ////////////////////////////////

        factory.createComment = function(comment, postId, callback) {
            // console.log('factory post', postedText);
            $http.put('/comments/' + postId, comment)
                .then(function(response) {
                    if (response.data.success) {
                        $http.get('/posts')
                            .then(function(postsResponse) {
                                if (postsResponse.data.success) {
                                    callback(postsResponse.data);
                                }
                            });
                    }
                })
                .catch(handleErrors)
        };

        //Remove the post from the list
        factory.deleteComment = function(postID, comment, callback) {
            console.log(postID, 'id ---- & Comment', comment);
            $http.put('/commentsremove/' + postID, comment)
                .then(function(response) {
                    if (response.data.success) {
                        callback(response.data)
                        console.log(response.data, '===========response.data');

                    }

                })
                .catch(handleErrors);

        };
//////////////////////////// USER PAGE ///////////////////////////////

//Pass the topic info to controller
factory.showSelectedUser = function(userID, callback) {
    console.log('show topicId Factory', userID);
    var thisUser;
    $http.get('/user/' + userID)
        .then(function(response) {
            if (response.data.success) {
              console.log(response.data.user._id);
              thisUser= response.data.user;
            return thisUser;
            }
            
        })
        .then(function(thisUser) {
          console.log(thisUser._id, 'thisUser');
          $http.get('/comments/' + thisUser._id)
          .then(function(response){
                if (response.data.success) {
                  callback(thisUser , response.data)
              }
          })
        })
        
        .catch(handleErrors);
};
  ///////////////////////////// Ranking ////////////////////
  factory.addRank = function( post, callback) {
      console.log('postID',post);
      $http.put('/addrank', post)
          .then(function(response) {
              if (response.data.success) {
                  callback(response.data)
              }
          })
          .catch(handleErrors)
  };
  
  factory.rmvRank = function( post, callback) {
      console.log('postID',post);
      $http.put('/rmvrank', post)
          .then(function(response) {
              if (response.data.success) {
                  callback(response.data)
              }
          })
          .catch(handleErrors)
  };
  
        //    // Most important step: return the object so it can be used by the rest of our angular code
        return factory;


    }]);