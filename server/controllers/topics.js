const Topic = require("mongoose").model('Topic');


module.exports = {
    index(req, res) {
        Topic.find({})
            .then(function(topic) {
                // console.log(' ***** getting Post Factory ***** ')
                res.json({
                    success: true,
                    topic
                });
            })
            .catch(errHandler.bind(res));
    },
    
    indexTopic(req, res) {
        // console.log(req.params.id, 'id');
        Topic.findById(req.params.id)
            .then(function(topic) {
                // console.log(' ***** getting topic  ***** ', topic)
                res.json({
                    success: true,
                    topic
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
    create(req, res) {
        // console.log('new Topic = ', req.body);
        Topic.create(req.body)
            .then(function(topic) {
                // console.log('then = ', req.body);
                res.json({
                    success: true,
                    topic
                });
            })
            .catch(errHandler.bind(res));
    },


    delete(req, res) {
        // console.log(req.params.id, 'id of topic to Delete');
        Topic.findByIdAndRemove(req.params.id)
            .then(function(topic) {
                res.json({
                    success: true,
                    topic
                });
            })
            .catch(errHandler.bind(res));
    },

    
          //////////////////// POST sync SECTION    ////////////////////
    newPost(req, res) {
      // console.log('topic req', req.body.post.topic);
        Topic.findById(req.body.post.topic)
            .then(function(topic) {
                topic.posts.push(req.body.post);
                topic.save(function() {
                    res.json({
                        success: true,
                        topic
                    });
                })
            })

        .catch(errHandler.bind(res));
    },
    update(req, res) {
        // console.log(req.body, ' req.body');
        // console.log(req.params.id, 'id');
        Post.findByIdAndUpdate(req.params.id, req.body)
            .then(function(topic) {
                res.json({
                    success: true,
                    topic
                });
                // console.log(' res 1');
            })

        .catch(errHandler.bind(res));
    },
    removePost(req, res) {
    // console.log(req.body, 'post body');
    Topic.findById(req.params.id)
        .then(function(topic) {
            topic.posts.pull(req.body._id);
            topic.save(function() {
                res.json({
                    success: true,
                    
                });
            })
        })
        .catch(errHandler.bind(res));
},




      //////////////////// Comments sync SECTION    ////////////////////
      
      
      

}


function errHandler(error, res) {
    console.error(error)
    this.status(500).json({
        success: false,
        error
    });
}