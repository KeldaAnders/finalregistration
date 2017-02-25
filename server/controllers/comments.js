const Post = require("mongoose").model('Post');


module.exports = {

    create(req, res) {
        console.log('post & comment= ', req.body);
        console.log(req.params, '=id');
        Post.findById(req.params.id)
        .then(function(post) {
          console.log('= ***** post ***',post);
          console.log(post.comments, '= ***** post.comments');
          console.log(req.body.comments, '=req.body.comments');
                post.comments.push(req.body.comments);
                post.save(function(post) {
                      
                        });
                
        console.log('********************* NEW POST SAVE***********************', post);
            res.json({
                success: true,
                post
            });
            })
        .catch(errHandler.bind(res));
    },


    delete(req, res) {
        // console.log(req.body, ' req.body');
        // console.log(req.params.id, 'id');
        Post.findByIdAndRemove(req.params.id)
            .then(function(posts) {
                res.json({
                    success: true,
                    posts
                });
            })
            .catch(errHandler.bind(res));
    }

}

function errHandler(error, res) {
    console.error(error)
    this.status(500).json({
        success: false,
        error
    });
}