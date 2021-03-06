const router = require('express').Router();
const verify = require('./verifyToken');
const jwt = require('jsonwebtoken')
const Post = require('../model/Post');
const Comment = require('../model/Comment');
const User = require('../model/User');

// Creates new comment by postID
router.post('/create/:postID', async (req, res) => {
    const token = req.header('Authorization');
    const user = jwt.decode(token);

const comment = new Comment({
        userID: user._id,
        postID: req.params.postID,
        content: req.body.content,
    })
    try {
        const savedComment = await comment.save();
        try {
            await Post.findById(req.params.postID).updateOne({ $push: { comments: savedComment._id } });
            res.json({
                "status": "success"
            })
        } catch (err) {
            res.status(400).send({ err: err })
        }
    } catch (err) {
        res.status(400).send({ err: err });
    }
})
router.post('/updateComment/:commentID',function(req,res){
    Comment.findById(req.params.commentID).updateOne({$set:{content:req.body.content }}).exec((err, result) => {
        res.json({
            "result": result
        })  
  });
});

router.get('/deleteComment/:commentID', function (req, res) {
    Comment.findOneAndDelete({ _id: req.params.commentID} ).exec(function (err, result) {
      if (err) res.send(err)
      else res.send(result)
    })
    
  })
  

module.exports = router;
