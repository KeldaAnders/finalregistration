var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PostSchema = new Schema({
    topic: {
        type: String,
        required: true
    },
    description:{
      type: String,
      required: true
    },
    category:{
      option: {
        type: String,
        required: true
    }
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required : true,
    },
    posts: [{
        type: Schema.Types.ObjectId,
        ref: 'Post'
    }],
}, {
    timestamps: {
        updatedAt: new Date(),
        $setOnInsert: {
            createdAt: new Date()
          }
      }
});


mongoose.model('Topic', PostSchema);