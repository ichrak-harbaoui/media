const router = require('express').Router();
const User = require('../model/User');
const { registerValidation, loginValidation } = require('../validation')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
var nodemailer = require("nodemailer");


// Register
router.post('/register', async (req, res) => {
    // Validate the data
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).send({ error: error.details[0].message });

    // Check if the user is already in the database
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) return res.status(400).send({ error: 'Email already exists' });

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hashSync(req.body.password, salt);

    // Create a new user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        dateOfBirth: req.body.dateOfBirth, 
        password: hashPassword,
        imgUrl: req.body.imgUrl
    });
    try {
        const savedUser = await user.save();
        res.send({ user: savedUser._id });
    } catch (err) {
        res.status(400).send({ err: err });
    }
});

// Login
router.post('/login', async (req, res) => {

    // Validate the data
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send({ error: error.details[0].message });

    // Check if the email does not exists
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send({ success: 'false', error: 'Email is not found' });

    // Check if password is correct
    const validPass = await bcrypt.compareSync(req.body.password, user.password);
    if (!validPass) return res.status(400).send({ success: 'false', error: 'Invalid password' });

    // Create and assign a token
    const token = jwt.sign({ _id: user._id }, "dffd8kk5kjsga7gqytyewhrnmcq123"); // TOKEN SECRET

    res.send({ success: 'true', token: token });

});


router.get('/updatePassword',function(req,res){
    User.findOneAndUpdate({_id:req.query.id},{$set:{password:bcrypt.hashSync(req.query.password, 10)}},{new:true},function(err,result){
          if(err) console.log("err") ;
       res.send(result);
     })
     });


var smtpTransport = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    auth: {
      user: "ichrak.harbaoui@esprit.tn",
      pass: "07218374ichrak"
    }
  });
  //  random 
  function makeid(length) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    for (var i = 0; i < length; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
  }
  console.log(makeid(5))
  router.post('/sendCode',function (req,res) {
    User.findOneAndUpdate({email:req.query.email},{$set:{ resetPasswordToken:makeid(5)}},{new:true},
    (function (err, result) {
          
      if(result) { 
          var mailOptions={
              to : result.email,
              subject : "Changement de mot de passe",
              text : "Vous trouvez ci-joint votre code d'authentification "+ result.resetPasswordToken,
          }
          console.log(mailOptions);
          console.log(result.resetPasswordToken);
  
          smtpTransport.sendMail(mailOptions, function(error, response){
           if(error){
                  console.log("ok");
             // res.end("error");
           }
      });
      res.send(result);
     }
     else{
      console.log(err)
   } 
    })    
    )
    })
  
  // hethi ela tverifi el code el yektbou w lezem tzid champ ismou resetPasswordToken ,
  router.post('/verifyCode',function (req,res) 
  {
    User.findOneAndUpdate({resetPasswordToken:req.query.resetPasswordToken},{$set:{resetPasswordToken:""}},{new:true},
    function(err, result) { 
    if(err)
     { 
       console.log(result.resetPasswordToken);
       res.send(err);
        } 
   else
   { 
  res.send(result) 
   }
  }) ; 
  })
  
module.exports = router;

