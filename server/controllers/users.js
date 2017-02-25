const User = require("mongoose").model('User');
const path = require('path');
const sign = require(path.resolve('server', 'modules', 'token_Auth')).sign;
var bcrypt = require('bcryptjs');

module.exports = {
    index(req, res) {
        User.find({})
            .then(function(users) {
                // console.log(' ***** getting Users Factory ***** ')
                res.json({
                    success: true,
                    users
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

    indexUser(req, res) {
        console.log(req.params.id, 'id');
        User.findById(req.params.id)
            .then(function(user) {
                // console.log(' ***** getting user Factory ***** ', user)
                res.json({
                    success: true,
                    user
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

    login(req, res) {
        console.log(req.body, 'body*********');
        User.findOne({
                email: req.body.email
            })
            .then(function(user) {
                if (user) {
                    console.log("User matching email found");
                    if (bcrypt.compareSync(req.body.password, user.password)) {
                        console.log("password is correct");
                        user.password = null;
                        sign(req, user.toObject(), function(error, token) {
                            if (error) {
                                res.json({
                                    success: false,
                                    error: error
                                });
                            }
                            res.json({
                                success: true,
                                token: token
                            });
                        })

                    } else {
                        console.log("User matching email not found");
                        res.json({
                            success: false,
                            errors: {
                                login_reg: {
                                    message: 'Password does not match User info'
                                }
                            }
                        });
                    }
                } else {
                    console.log("User matching email not found");
                    res.json({
                        success: false,
                        errors: {
                            login_reg: {
                                message: 'Password/email combination does not match'
                            }
                        }
                    });
                }
            })
            .catch(function errorHandler(error) {
                console.error(error)
                res.json({
                    success: false,
                    error
                });
            });
    },

    register(req, res) {
        console.log("Creating new user", req.body);
        if (req.body.password != req.body.confirm_password) {
            console.log("Password and Confirm-Password do not match");
            return res.json({
                success: false,
                errors: {
                    password: {
                        message: "Password and Confirm-Password do not match"
                    }
                }
            })
        }

        req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(8));
        User.create(req.body)
            .then(function(user) {
                console.log("Data from form =", req.body);
                console.log("user returned from DB =", user);
                user.password = null;
                sign(req, user.toObject(), function(error, token) {
                    if (error) {
                        res.json({
                            success: false,
                            error: error
                        });
                    }
                    res.json({
                        success: true,
                        user: user,
                        token: token
                    });
                })
            })
            .catch(function errorHandler(error) {
                console.error(error)
                res.json({
                    success: false,
                    error
                });
            });
    },
    newTopic(req, res) {
        console.log(req.body, '**********-- BODY --**********');
        User.findById(req.body.createdBy)
            .then(function(user) {
                user.topics.push(req.body);
                user.save(function() {
                    res.json({
                        success: true,
                        user
                    });
                })
            })

        .catch(errHandler.bind(res));
    },
    
    removeTopic(req, res) {
        console.log(req.body._id, 'body - remove topic from User');
        console.log(req.params.id, 'req.params.id - remove topic from User');
        User.findById(req.params.id)
            .then(function(user) {
                user.topics.pull(req.body._id);
                user.save(function() {
                    res.json({
                        success: true,
                        user
                    });
                })
            })
            .catch(errHandler.bind(res));
    },
    newPost(req, res) {
        User.findById(req.body.postedBy)
            .then(function(user) {
                user.posts.push(req.body);
                user.save(function() {
                    res.json({
                        success: true,
                        user
                    });
                })
            })

        .catch(errHandler.bind(res));
    },

    removePost(req, res) {
        console.log(req.body, 'body');
        User.findById(req.params.id)
            .then(function(user) {
                user.posts.pull(req.body._id);
                user.save(function() {
                    res.json({
                        success: true,
                        user
                    });
                })
            })
            .catch(errHandler.bind(res));
    },


};

function errHandler(error, res) {
    console.error(error)
    res.json({
        success: false,
        error
    });
}