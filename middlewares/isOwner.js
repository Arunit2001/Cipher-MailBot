const passport = require('passport');
const Email = require('../models/email');


async function isOwner(req, res, next) {
    await Email.findById(req.params.id, (err, email)=>{
        if(err){
            res.json({
                success : false,
                message : "Email id does not exist."
            });
        }
        if (email.from.id!=req.user.id) {
          // req.session = null;
          res.json({
              success : false,
              message : "Unauthorized."
          });
        } else {
          next();
        }
    })
  } 

  module.exports = isOwner;