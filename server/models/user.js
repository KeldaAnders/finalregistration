var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
const nameRegex = /^[a-zA-Z]+$/;
const emailRegex = /^[a-zA-Z0-9\.\+_-]+@[a-zA-Z0-9\._-]+\.[a-zA-Z]*$/;
// const birthdayRegex = /^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/;
const passwordRegex = /(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]{8,}/;
//Requires at least 1 uppercase, at least 1 number and 8 characters long

var Schema = mongoose.Schema;

var UsersSchema = new Schema({
    first_name: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        minLength: 1,
        validate: {
            validator: function(name) {
                return nameRegex.test(name)
            },
            message: "First Name must be at least one letter long with no numbers &/or symbols",
        }
    },
    last_name: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        minLength: 1,
        validate: {
            validator: function(name) {
                return nameRegex.test(name)
            },
            message: "Last Name must be at least one letter long with no numbers &/or symbols",
        }
    },
    email: {
        type: String,
        required: true,
        trim: true,
        minLength: 6,
        validate: {
            validator: function(email) {
                return emailRegex.test(email)
            },
            message: "Please enter a valid email",
        },
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minLength: 8,
        validate: {
            validator: function(password) {
                return passwordRegex.test(password)
            },
            message: "Password must be at least 8 characters long with at least 1 uppercase letter and 1 number",
        }
    },
    birthday: {
        type: Date,
        required: true,
        validate: {
            validator: function(birthday) {
              today =  new Date();
              if (birthday < today ){
                return true;
              }else{
                return false;
              }
            },
            message: "birthday must be a valid birthday",
        }
    },
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});



mongoose.model('User', UsersSchema);