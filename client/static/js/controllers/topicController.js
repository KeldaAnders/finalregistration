angular.module('tokenizer')
    .controller("TopicController", ["$scope", "$routeParams", "$location", "$route", 'userFactory', 'topicFactory', 'AuthService', function($scope, $routeParams, $location, $route, userFactory, topicFactory, auth) {
        console.log(' ***** TOPIC Controller loaded ***** ');
        if (!auth.isAuthed()) {
            return $location.url('/');
        }
        
        $scope.users = [];
        $scope.topics = [];
        $scope.newComment = {}
        $scope.selectedUser  = {}
        $scope.categories = [{
            option: 'JavaScript'
        }, {
            option: 'C#'
        }, {
            option: 'Ruby'
        }, {
            option: 'MEAN JS'
        }, {
            option: 'MySQL'
        }, {
            option: 'JQuery'
        }, ];

        // 
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


        $scope.createTopic = function() {
            $scope.topic.createdBy = $scope.thisUser;
            console.log('Make a Topic', $scope.topic);
            topicFactory.createTopic($scope.topic, function(response) {
                if (response) {
                    userFactory.updateUserTopic(response.topic, function(response) {
                        console.log(response);
                    });
                    $scope.topic = {};
                    topicFactory.getTopics(function(response) {
                        // console.log(response, '-----response-----');
                        $scope.topics = response.topic;

                    });
                }
            });
        };
        $scope.getTopics = function() {
            topicFactory.getTopics(function(response, callback) {
                $scope.topics = response.topic;
                // console.log(response, '-----response-----');

            });

        };

        $scope.getUserName = function(userID) {
            // console.log(userID, 'x***** topic userID ****');
            // console.log($scope.users, 'USERs');
            // console.log(this.topic, 'this topic');
            // console.log($scope.topics, 'topics scope');
            var i;
            for (i = 0; i < $scope.users.length; i++)
                if (userID === $scope.users[i]._id) {
                    this.topic.username = $scope.users[i].first_name + " " + $scope.users[i].last_name;
                    // console.log(this.topic.username , '********TRUE USERNAME*********');
                    // console.log('true'); 
                }
                // console.log('false'); 
        };

        //Delegate deleting topic to the factory
        $scope.delete = function(topic, idx) {
            // console.log('start', topic,'= TOPIC ----- ', idx,'= index ----- ');
            var topicIndex = idx;
            topicFactory.delete(topic, function(response) {
                $scope.topics.splice(topicIndex, 1);
                console.log('response.data.success from TOPICS', response);
            });
            userFactory.deleteTopic(topic, function(response) {
                console.log('response.data.success from Users', response);
            });
        };

        ///////////////////////////// Topics Post Section ////////////////////


        $scope.showTopic = function() {
            topicFactory.showTopic($route.current.params.id, function(response) {
                console.log('success topic =', response);
                var i;
                for (i = 0; i < $scope.users.length; i++)
                    if (response.topic.createdBy === $scope.users[i]._id) {
                        $scope.username = $scope.users[i].first_name + " " + $scope.users[i].last_name;
                    }
                console.log('$scope.username =', $scope.username);
                $scope.thisTopic = response.topic;
            });
        };

        ///////////////////////////// Posts Section ////////////////////////////////
        $scope.getPosts = function() {
            topicFactory.getPosts(function(response, callback) {
                $scope.posts = response.posts;
                console.log('********TRUE Res*********');

            })

        };
        
        $scope.getUserPosts = function(idx) {
            // console.log($scope.thisTopic._id, '**** THIS b4****');
            // console.log(idx.topic);
            if (idx.topic === $scope.thisTopic._id) {

                return true;
            }
            return false;
        };
        $scope.getPostUser = function(userID) {
            // console.log(userID, 'x***** topic userID ****');
            // console.log($scope.users, 'USERs');
            // console.log(this.post, 'this post');
            // console.log($scope.topics, 'topics scope');
            var i;
            for (i = 0; i < $scope.users.length; i++)
                if (userID === $scope.users[i]._id) {
                    this.post.username = $scope.users[i].first_name + " " + $scope.users[i].last_name;
                    // console.log(this.topic.username , '********TRUE USERNAME*********');
                    // console.log('true'); 
                }
                // console.log('false'); 
        };

        $scope.createPost = function() {
            $scope.post.postedBy = $scope.thisUser;
            $scope.post.topic = $scope.thisTopic;
            // console.log('Make a Post', $scope.post);
            topicFactory.createPost($scope.post, function(response) {
                if (response) {
                    userFactory.updateUserPost(response.post, function(response) {
                        // console.log(response);
                    });
                    $scope.post = {};
                    topicFactory.getPosts(function(response) {
                        $scope.posts = response.posts;
                        // console.log($scope.posts);
                    });
                }
            });
        };

        //Delegate deleting posts to the factory
        $scope.deletePost = function(post) {
            console.log('start', $scope.posts);
            topicFactory.deletePost(post, function(response) {
              if (response) {
                  console.log('response= new Comment======', response.posts);
                  $scope.posts = response.posts;
              }
            });
            userFactory.deletePost(post, function(response) {
                console.log('response.data.success', response);
            });
        };
        ///////////////////////////// Comment Section ////////////////////////////////
        $scope.createComment = function(postID) {
            $scope.newComment.commentedBy = $scope.thisUser;
            console.log('Make a comment', postID);
            console.log('scope', $scope.newComment);
            topicFactory.createComment($scope.newComment, postID, function(response) {
                if (response) {
                    console.log('response= new Comment======', response.posts);
                    $scope.posts = response.posts;
                }
                $scope.newComment = {}
            })
            
            
        };
        $scope.getCommentedBy = function(userID) {
            var i;
            for (i = 0; i < $scope.users.length; i++) {
                  if (userID === $scope.users[i]._id) {
                      this.comment.commentedByName = $scope.users[i].first_name + ' ' +$scope.users[i].last_name;
                  }
              }
        };

        $scope.deleteComment = function(post, comment, idx) {
            // console.log('start', post._id, post, comment);
            var commentIndex = idx;
            // console.log($scope.posts);
            topicFactory.deleteComment(post._id, comment, function(response) {
                post.comments.splice(commentIndex, 1);
                console.log('response.data.success');
            });
          
        };
        
        ///////////////////////////// show Selected User Section ////////////////////


        $scope.showSelectedUser = function() {
            topicFactory.showSelectedUser($route.current.params.id, function(thisUser , comments) {
                console.log('this user =', thisUser , 'usersComments====',comments.usersCommentsArr);
                $scope.selectedUser = thisUser;
                $scope.selectedUser.comments = comments.usersCommentsArr;
            });
        };
        ///////////////////////////// Ranking ////////////////////
        $scope.addRank = function(post) {
          var self = this;
            topicFactory.addRank( post, function(response) {
                self.post.rank = response.newRank
            });
        };
        
        $scope.rmvRank = function(post) {
          var self = this;
            topicFactory.rmvRank( post, function(response) {
                console.log('newRank =', response);
                self.post.rank = response.newRank
                
            });
        };
        
        $scope.logout = function() {
            auth.logout();
            $location.url('/');
        };

    }]);