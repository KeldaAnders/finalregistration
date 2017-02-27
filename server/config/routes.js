const UserController = require("../controllers/users");
const QuestionController = require("../controllers/questions");



module.exports = function(app) {
    console.log('routes!');
    //************RESTful routes for users************

    app.get('/users', UserController.index);
    app.get('/user/:id', UserController.indexUser);
    app.post('/register', UserController.register);
    app.post('/login', UserController.login);
    
    app.put('/usersquestion', UserController.newquestion);

    //************END routes for users****************

    //************RESTful routes for question************
    console.log('in Q');

      app.get('/questions', QuestionController.index);
      app.get('/question/:id', QuestionController.indexquestion);
      app.post('/question', QuestionController.create);
      app.put('/question/answer/:id', QuestionController.createAnswer);
      

      //************END routes for question****************
};