const router = require('express').Router();
const verify = require('./verifyToken');
const jwt = require('jsonwebtoken')
const Post = require('../model/Post');
const Comment = require('../model/Comment');
const User = require('../model/User');
const socketApi = require('../socketApi');
var mongoose = require('mongoose')

// Create friend request to given id
router.post('/friendrequest/:userID', async (req, res) => {

    const token = req.header('Authorization');
    const user = jwt.decode(token);
    // Control that already user
    const result = await User.findById(req.params.userID).findOne({ friendRequests: user._id })
    if (result) {
        return res.send({ err: "Already..." })
    }
    try {
        await User.findById(req.params.userID).updateOne({ $push: { friendRequests: user._id } });

        socketApi.io.emit('friendreq' + req.params.userID);
        res.json({
            "status":
                "ok"

        })

    } catch (err) {
        console.log(err)
    }
});

// Removes friend request by userID
router.delete('/friendrequest/:userID', async (req, res) => {
    const token = req.header('Authorization');
    const user = jwt.decode(token);

    try {
        await User.findById(user._id).updateOne({ $pull: { friendRequests: req.params.userID } });
        res.json({
            "status": {
                "deletedFrom": user._id,
                "Deleted": req.params.userID
            }
        })
    } catch (err) {
        res.status(400).send({ err: err })
    }
});




// Accepts friend request 
router.post('/friend/:userID', async (req, res) => {

    const token = req.header('Authorization');
    const user = jwt.decode(token);
    try {
        // Add user in your friend list
        await User.findById(user._id).updateOne({ $push: { friends: req.params.userID } });
        // Add yourself to user's friend list
        await User.findById(req.params.userID).updateOne({ $push: { friends: user._id } });
        // Delete user's friend request
        await User.findById(user._id).updateOne({ $pull: { friendRequests: req.params.userID } });

        res.json({
            "status": "success"
        })
    } catch (err) {
        res.status(400).send({ err: err })
    }
});

// Removes friend by userID
router.delete('/deleteFriend/:userID', async (req, res) => {
    const token = req.header('Authorization');
    const user = jwt.decode(token);

    try {
        await User.findById(user._id).updateOne({ $pull: { friends: req.params.userID } });
        await User.findById(req.params.userID).updateOne({ $pull: { friends: user._id } });

        res.json({
            "status": {
                "deletedFrom": user._id,
                "Deleted": req.params.userID
            }
        })
    } catch (err) {
        res.status(400).send({ err: err })
    }
});




// Search user by name
router.get('/search/:name', async (req, res) => {
    try {
        await User.find({ 'name': new RegExp(req.params.name, 'i') }).select(['name', 'imgUrl','friendRequests']).exec((err, result) => {
            res.json({
                "result": result
            })
        })
    } catch (error) {
        res.status(400).send({ err: err })
    }
})

// Get logged in user info
router.get('/info', async (req, res) => {
    const token = req.header('Authorization');
    const user = jwt.decode(token);
    try {
     await  User.findById(user._id).populate({
            path: 'friends', select: ['name', 'imgUrl']
        }).populate({
            path: 'friendRequests', select: ['name', 'imgUrl']
        }).populate({
            path: 'notifications', select: ['name', 'imgUrl']
        }).exec((err, result) => {
            console.log(err);
            res.json({
                "result": result
            });
        })
    } catch (error) {
        res.status(400).send({ err: err })
    }
})

// Get user info by userID
router.get('/infoByID/:id', (req, res) => {
    try {
        User.findById(req.params.id)
            .select(['imgUrl', 'name', '_id', 'date', 'email', 'phone','dateOfBirth','description','bgUrl', 'friends'])
            .exec((err, result) => {
                res.json({
                    "result": result
                });
            })
    } catch (error) {
        res.status(400).send({ err: err })
    }
})




// router.post('/update/:id',function(req,res){
//     User.findOneAndUpdate({id:req.params.id},{$set:{name:req.body.name , email:req.body.email}},{new:true},function(err,result){
//          if(err) console.log(err.message) ;
//        res.send(result);
     
//      })
//   });
router.post('/update/:id',function(req,res){
    const {imgUrl,name,email,phone,dateOfBirth,description} = req.body;
    const user = !imgUrl ? {name:req.body.name , email:req.body.email 
        , phone:req.body.phone , dateOfBirth:req.body.dateOfBirth ,description:req.body.description  }:
    {name, email,phone,dateOfBirth,description,imgUrl};
    User.findById(req.params.id).updateOne({$set:user}).exec((err, result) => {
        res.json({
            "result": result
        })  
  });
});



router.get("/all", (req, res) => {
    const errors = {};
    User.find()
      .populate("user", ["name", "avatar"])
      .then((profiles) => {
        if (!profiles) {
          errors.noprofile = "there are no profile";
          return res.status(404).json(errors);
        }
        res.json(profiles);
      })
      .catch((err) =>
        res.status(404).json({
          msg: "there are no profiles",
        })
      );
  });
  
module.exports = router;
