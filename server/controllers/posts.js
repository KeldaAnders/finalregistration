const Post = require("mongoose").model('Post');


module.exports = {
    index(req, res) {
        Post.find({})
            .then(function(posts) {
                // console.log(' ***** getting Post Factory ***** ')
                res.json({
                    success: true,
                    posts
                });
            })
            .catch(errHandler.bind(res));
    },
    create(req, res) {
        // console.log('my post = ', req.body);
        Post.create(req.body)
            .then(function(post) {
                // console.log('then = ', req.body);
                res.json({
                    success: true,
                    post
                });
            })
            .catch(errHandler.bind(res));
    },

    delete(req, res) {
        // console.log(req.body, ' req.body');
        // console.log(req.params.id, 'id');
        Post.findByIdAndRemove(req.params.id)
            .then(function(posts) {
                res.json({
                    success: true,
                    posts
                });
            })
            .catch(errHandler.bind(res));
    },

    newComment(req, res) {
        console.log(req.body, ' req.body');
        console.log(req.params.id, 'id');
        Post.findById(req.params.id)
            .then(function(post) {
                post.comments.push(req.body);
                post.save(function() {
                    res.json({
                        success: true,
                        post
                    });
                })
            })

        .catch(errHandler.bind(res));
    },
    removeComment(req, res) {
        console.log(req.body, 'body');
        Post.findById(req.params.id)
            .then(function(post) {
                post.comments.pull(req.body._id);
                post.save(function() {
                    res.json({
                        success: true,
                        post
                    });
                })
            })
            .catch(errHandler.bind(res));
    },
    getComments(req, res) {
        console.log(req.params.id, ' getComments id');
        var userID = req.params.id;
        Post.find().where("comments.commentedBy", userID)

        .then(function(usersCommentsArr) {
                // console.log(' ***** getting user Factory ***** ', user)
                res.json({
                    success: true,
                    usersCommentsArr
                });
            })
            .catch(function errorHandler(error) {
                console.error(error)
                res.json({
                    success: false,
                    error
                });
            });
    },

    addRanking(req, res) {
        var newRank;
        Post.findById(req.body._id)
            .then(function(post) {
                newRank = post.rank + 1;
            })
            .then(function() {
                var id = req.body._id;
                var updateObj = {
                    rank: newRank
                };

                Post.findByIdAndUpdate(id, updateObj, {
                    new: false
                }, function(err, model) {
                    if (err) {
                        console.log(err);
                        return;
                    }
                })
                
            })
            .then(function() {
                console.log(newRank);
                console.log("this is where the newRank ");
                res.json({
                    success: true,
                    newRank
                });
            })
        .catch(function errorHandler(error) {
            console.error(error)
            res.json({
                success: false,
                error
            });
        });
    },
    rmvRanking(req, res) {
        var newRank;
        Post.findById(req.body._id)
            .then(function(post) {
                newRank = post.rank - 1;
            })
            .then(function() {
                var id = req.body._id;
                var updateObj = {
                    rank: newRank
                };

                Post.findByIdAndUpdate(id, updateObj, {
                    new: false
                }, function(err, model) {
                    if (err) {
                        console.log(err);
                        return;
                    }
                })
                
            })
            .then(function() {
                console.log(newRank);
                console.log("this is where the newRank ");
                res.json({
                    success: true,
                    newRank
                });
            })
        .catch(function errorHandler(error) {
            console.error(error)
            res.json({
                success: false,
                error
            });
        });
    },


}

function errHandler(error, res) {
    console.error(error)
    this.status(500).json({
        success: false,
        error
    });
}