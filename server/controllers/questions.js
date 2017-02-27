const Question = require("mongoose").model('Question');

module.exports = {
    index(req, res) {
        Question.find({})
            .then(function(question) {
                // console.log(' ***** getting Users Factory ***** ')
                res.json({
                    success: true,
                    question
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

    indexquestion(req, res) {
        console.log(req.params.id, 'id');
        Question.findById(req.params.id)
            .then(function(question) {
                // console.log(' ***** getting user Factory ***** ', user)
                res.json({
                    success: true,
                    question
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
        Question.create(req.body)
            .then(function(question) {
                // console.log('then = ', req.body);
                res.json({
                    success: true,
                    question
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


    //////////create Answer////////
    createAnswer(req, res) {
        var answers;
        Question.findById(req.params.id)
        
            .then(function(question) {
                answers = question.answer;
                answers.push(req.body);
            })
            .then(function() {
                var id = req.body._id;
                var updateObj = {
                    answer: answers
                };

                Question.findByIdAndUpdate(req.params.id, updateObj, {
                    new: false
                }, function(err, model) {
                    if (err) {
                        console.log(err);
                        return;
                    }
                })
                
            })
            .then(function() {
                console.log(answers);
                console.log("this is where the newRank ");
                res.json({
                    success: true
                    
                });
            })
        .catch(function errorHandler(error) {
            console.error(error)
            res.json({
                success: false,
                error
            });
        });
    }
    

// createAnswer2(req, res) {
//         console.log(req.params, '=id');
//         Question.findById(req.params.id)
//         .then(function(question) {
//           console.log('***** question ***',question);
//           console.log( '***** question.answer', question.answer);
//           console.log('req.body = ',req.body);
//                 question.answer.push(req.body);
//                 
//                 question.save(function(question) {
//                       
//                         });
//                 
//         console.log('********************* NEW POST SAVE***********************', question);
//             res.json({
//                 success: true,
//                 question
//             });
//             })
//             .catch(function errorHandler(error) {
//                 console.error(error)
//                 res.json({
//                     success: false,
//                     error
//                 });
//             });
//     }

};
