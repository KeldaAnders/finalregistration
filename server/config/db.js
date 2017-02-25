var mongoose = require('mongoose'),
    path = require('path'),
    fs = require('fs'),
    bcrypt = require('bcryptjs');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/discussionBoardI');

mongoose.connection.on('connected', function() {
    console.log('Database connected');
});

var models_path = path.resolve('server', 'models');

var reg = new RegExp(".js$", "i");

fs.readdirSync(models_path).forEach(function(file) {
    if (reg.test(file)) {
        require(path.resolve(models_path, file));
    }
});