const UserController = require("../controllers/users");



module.exports = function(app) {
    console.log('routes!');
    //************RESTful routes for users************

    app.get('/users', UserController.index);
    app.get('/user/:id', UserController.indexUser);
    app.post('/register', UserController.register);
    app.post('/login', UserController.login);

    //************END routes for users****************


};