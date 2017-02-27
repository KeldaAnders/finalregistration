var mongoose = require('mongoose');


var Schema = mongoose.Schema;

var QuestionSchema = new Schema({
    questText: {
        type: String,
        required: true,
        trim: true,
        minLength: 10,
        // validate: {
        //     validator: function(questText) {
        //         if (questText.length > 10) {
        //             return true;
        //         } else {
        //             return false;
        //         }
        //     },
        //     message: "Your Question must be 10 characters or longer.",
        // }
    },
    questDescription: {
        type: String,
        required: true,
        trim: true,
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },

    answer: [{
        answerText: {
            type: String,
            required: true,
            trim: true,
            minLength: 5,
            // validate: {
            //     validator: function(questText) {
            //         if (answerText.length > 5) {
            //             return true;
            //         } else {
            //             return false;
            //         }
            //     },
            //     message: "Your answer must be 5 characters or longer.",
            // }
        },

        answerDetails: {
            type: String,
            trim: true,
        },

        likes: {
            type: Number,
            default: 0
        },
        answeredBy: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        }

    }]

}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});



mongoose.model('Question', QuestionSchema);