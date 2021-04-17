const router = require('express').Router();
const verify = require('./verifyToken');
const jwt = require('jsonwebtoken')
const Post = require('../model/Post');
const Comment = require('../model/Comment');
const User = require('../model/User');
const mongoose = require('mongoose');

// Gets logged user's friends' posts
router.get('/:page', verify, (req, res) => {
    const pageSize = 5;
    const token = req.header('Authorization');
    const user = jwt.decode(token);
    User.findById(user._id).select("friends").then(data => {
        // Added yourself into friends array to show your posts
        data.friends.push(user._id)
        const query = Post.find({
            "userID": data.friends,
            "fakePost":false

        })
            .sort({ "date": -1  })
            .skip(pageSize * req.params.page)
            .limit(pageSize)
            .populate({
                path: 'comments', select: ['content', 'date'], populate: {
                    path: "userID", select: ['name', 'imgUrl']
                }
            })
            .populate({
                path: 'userID', select: ['name','imgUrl']
            })
            .exec((err, result) => {
                res.json({
                    "result": result
                })
            });
    });
});


// Gets logged user's friends' posts fake 
router.get('/fakePosts/:page', verify, (req, res) => {
    const pageSize = 5;
    const token = req.header('Authorization');
    const user = jwt.decode(token);
    User.findById(user._id).select("friends").then(data => {
        // Added yourself into friends array to show your posts
        data.friends.push(user._id)
        const query = Post.find({
            "userID": data.friends,
            "fakePost":true
        })
            .sort({ "date": -1  })
            .skip(pageSize * req.params.page)
            .limit(pageSize)
            .populate({
                path: 'comments', select: ['content', 'date'], populate: {
                    path: "userID", select: ['name', 'imgUrl']
                }
            })
            .populate({
                path: 'userID', select: ['name','imgUrl']
            })
            .exec((err, result) => {
                res.json({
                    "result": result
                })
            });
    });
});

// Get posts by userID and page number (Page number * 5)
router.get('/profile/:userID/:page', (req, res) => {
    const pageSize = 5;
    const query = Post.find({
        "userID": new mongoose.Types.ObjectId(req.params.userID),
        "fakePost":false
    })
        .sort({ "date": -1 })
        .skip(pageSize * req.params.page)
        .limit(pageSize)
        .populate({
            path: 'comments', select: ['content', 'date'], populate: {
                path: "userID", select: ['name', 'imgUrl']
            }
        })
        .populate({
            path: 'userID', select: ['name','imgUrl']
        })
        .exec((err, result) => {
            res.json({
                "result": result
            })
        });


});

router.get('/profileFake/:userID/:page', (req, res) => {
    const pageSize = 5;
    const query = Post.find({
        "userID": new mongoose.Types.ObjectId(req.params.userID),
        "fakePost":true
    })
        .sort({ "date": -1 })
        .skip(pageSize * req.params.page)
        .limit(pageSize)
        .populate({
            path: 'comments', select: ['content', 'date'], populate: {
                path: "userID", select: ['name', 'imgUrl']
            }
        })
        .populate({
            path: 'userID', select: ['name','imgUrl']
        })
        .exec((err, result) => {
            res.json({
                "result": result
            })
        });


});
// Create new post and attach it to the user's post array
router.post('/', verify, async (req, res) => {
    const token = req.header('Authorization');
    const user = jwt.decode(token);
    const post = new Post({

        userID: user._id,
        content: req.body.content,
        type: req.body.type,
        mediaURL: req.body.mediaURL,
        comments: req.body.comments,
    });
    try {
        const savedPost = await post.save();

        // PUSH ID OF THE NEWLY CREATED POST TO THE USER'S POSTS ARRAY
        try {
            await User.findById(user._id).updateOne({ $push: { posts: savedPost._id } });
            res.json({
                "postID": savedPost._id
            })
        } catch (err) {
            res.status(400).send({ err: err })
        }
    } catch (err) {
        res.status(400).send({ err: err });
    }
});

router.get('/deletePost/:postID', function (req, res) {
    Post.findOneAndDelete({ _id: req.params.postID} ).exec(function (err, result) {
      if (err) res.send(err)
      else res.send(result)
    })
    
  });
  
router.delete('/post/:id', async (req, res) => {
    const token = req.header('Authorization');
    const user = jwt.decode(token);

    try {
        await User.findById(user._id).updateOne({ $pull: { posts: req.params.id } });
        res.json({
            "status": {
                "deletedFrom": user._id,
                "Deleted": req.params.id
            }
        })
    } catch (err) {
        res.status(400).send({ err: err })
    }
});



// Increment or decrement like
router.post('/like/:postID', async (req, res) => {
    const token = req.header('Authorization');
    const user = jwt.decode(token);

    let liked = false;

    await Post.findById(req.params.postID).select('likes').then(data => {
        // Check user if already liked the post
        liked = data.likes.includes(user._id)
    })
    try {
        if (liked) {
            await Post.findById(req.params.postID).updateOne({ $pull: { likes: user._id } });
            return res.json({
                "response": "unlike"
            })
        }
        else {
            await Post.findById(req.params.postID).updateOne({ $push: { likes: user._id } });
            return res.json({
                "response": "like"
            })
        }
    } catch (error) {//
    }

});

// Gets the post by postID
router.get('/post/:postID', async (req, res) => {
    try {
        await Post.findById(req.params.postID)
            .populate({
                path: 'comments', select: ['content', 'date'], populate: {
                    path: "userID", select: ['name','imgUrl']
                }
            }).populate({
                path: 'userID', select: ['name','imgUrl']
            })
            .exec((err, result) => {
                return res.json({
                    "result": result
                })
            })
    } catch (error) {
        res.json({
            err
        })
    }
})
router.post('/updatePost/:postID',function(req,res){
    Post.findById(req.params.postID).updateOne({$set:{content:req.body.content }}).exec((err, result) => {
        res.json({
            "result": result
        })  
  });
});

router.post('/fakePost/:postID',function(req,res){
    Post.findById(req.params.postID).updateOne({$set:{fakePost:true }}).exec((err, result) => {
        res.json({
            "result": result
        })  
  });
});


// Increment or decrement fake
router.post('/fake/:postID', async (req, res) => {
    const token = req.header('Authorization');
    const user = jwt.decode(token);

    let liked = false;

    await Post.findById(req.params.postID).select('fake').then(data => {
        // Check user if already liked the post
        liked = data.fake.includes(user._id)
  
    })
    try {
        if (liked) {

            await Post.findById(req.params.postID).updateOne({ $pull: { fake: user._id } });
            
            return res.json({
                "response": "unlike"
            })
        }
        else {
            await Post.findById(req.params.postID).updateOne({ $push: { fake: user._id } });
            return res.json({
                "response": "like"
            })
        }
    } catch (error) {//
    }

});

// Increment or decrement fake
router.post('/nofake/:postID', async (req, res) => {
    const token = req.header('Authorization');
    const user = jwt.decode(token);

    let liked = false;

    await Post.findById(req.params.postID).select('nofake').then(data => {
        // Check user if already liked the post
       
        liked = data.nofake.includes(user._id)
    })
    try {
        if (liked) {
            await Post.findById(req.params.postID).updateOne({ $pull: { nofake: user._id } });


            return res.json({
                "response": "unlike"
            })
        }
        else {
            await Post.findById(req.params.postID).updateOne({ $push: { nofake: user._id } });
            return res.json({
                "response": "like"
            })
        }
    } catch (error) {//
    }

});






module.exports = router;

