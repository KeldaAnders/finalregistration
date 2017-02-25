var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PostSchema = new Schema({
    postedText: {
        type: String,
        required: true
    },
    rank: { 
        type: Number, 
        default: 0 
    },
    postedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required : true,
    },
    topic: {
        type: Schema.Types.ObjectId,
        ref: 'Topic'
    },
      
    comments: [{
      commentText: String,
      commentedBy: {
          type: Schema.Types.ObjectId,
          ref: 'User',
          required : true,
      }
      
  }]
}, {
    timestamps: {
        updatedAt: new Date(),
        $setOnInsert: {
            createdAt: new Date()
          }
      }
});


mongoose.model('Post', PostSchema);