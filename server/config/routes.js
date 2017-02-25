const UserController = require("../controllers/users");
const PostController = require("../controllers/posts");
const TopicController = require("../controllers/topics");


module.exports = function(app) {
    console.log('routes!');
    //************RESTful routes for users************

    app.get('/users', UserController.index);
    app.get('/user/:id', UserController.indexUser);
    // app.delete('/users/:id', UserController.delete);
    app.put('/userspost', UserController.newPost);
    app.put('/userspost/:id', UserController.removePost);
    app.put('/userstopic/:id', UserController.removeTopic);
    app.put('/userstopic', UserController.newTopic);
    app.post('/register', UserController.register);
    app.post('/login', UserController.login);

    //************END routes for users****************

    //************RESTful routes for topic************

    app.get('/topics', TopicController.index);
    app.get('/topic/:id', TopicController.indexTopic);
    app.post('/topic', TopicController.create);
    app.put('/topic/:id', TopicController.update);
    app.put('/topicpost', TopicController.newPost);
    app.put('/topicremove/:id', TopicController.removePost);
    app.delete('/topic/:id', TopicController.delete);

    //************END routes for topic****************

    //************RESTful routes for posts************

  app.get('/posts', PostController.index);
  app.post('/post', PostController.create);
  app.put('/addrank', PostController.addRanking);
  app.put('/rmvrank', PostController.rmvRanking);
  app.delete('/posts/:id', PostController.delete);

  //************END routes for posts****************

    //************RESTful routes for comments************

    app.put('/comments/:id', PostController.newComment);
    app.put('/commentsremove/:id', PostController.removeComment);
    app.get('/comments/:id', PostController.getComments);
    //************END routes for comments****************
};