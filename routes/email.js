const express = require('express');
const router = require('express-promise-router')();
const passport = require('passport');
const passportConf = require('../passport');
const isNotLoggedIn = require("../middlewares/isNotLoggedIn");
const isLoggedIn = require("../middlewares/isLoggedIn.js");
const verifyToken = require("../middlewares/verifyToken.js");
const isOwner = require("../middlewares/isOwner.js");
const authController = require('../controllers/auth');
const cookieParser = require('cookie-parser');
const passportSignIn = passport.authenticate('local', { session: true });
const passportJWT = passport.authenticate('jwt', { session: false });
const User = require("../models/user");
const Email = require("../models/email");
const SG = require("@sendgrid/mail");
const schedule = require("node-schedule");
require("dotenv").config();

SG.setApiKey(process.env.SGKEY);

router.post('/email', isLoggedIn, verifyToken, async (req, res)=>{
    try{
        console.log(req.body);

        let info = {
            to : req.body.to,
            cc : req.body.cc,
            from : {
                id : req.user.id,
                name : req.user.name
            },
            subject : req.body.subject,
            content : req.body.content,
            frequency : req.body.frequency,
            recurring : req.body.frequency==0 ? false : true
        }

        await Email.create(info, (error, email)=>{
            if(error){
                res.redirect("/dashboard/create");
            }
            const msg = {
                to: req.body.to,
                from: {
                  name: req.user.name,
                  email: "fevistick2000@gmail.com",
                },
                subject: req.body.subject,
                html: req.body.content,
                cc: req.body.cc
              };
              // console.log(msg);
              const frequency = req.body.frequency;
            let count = 0;
            if(frequency==0){
                SG.send(msg)
                    .then((r) => {
                      console.log("email sent...");
                      count++;
                          return res.json({
                            success: true,
                            message: "email sent successfully",
                            // user_id: user.dataValues.id,
                          });
                    })
                    .catch((error) => {
                      console.log("email not sent...", error);
                      return res.json({
                        success: false,
                        message: error.message,
                      });
                    });
                }else if(frequency==1){
                    schedule.scheduleJob(email.id,'*/30 * * * * *', ()=>{
                          SG.send(msg)
                            .then((r) => {
                              console.log("email sent...");
                              count++;
                              if(count==1){
                                  return res.json({
                                    success: true,
                                    message: "email sent successfully",
                                    // user_id: user.dataValues.id,
                                  });
                              }
                            })
                            .catch((error) => {
                              console.log("email not sent...", error);
                              return res.json({
                                success: false,
                                message: error.message,
                              });
                            });
                      })
                    }else if(frequency==2){
                        schedule.scheduleJob(email.id, '0 0 * * MON', ()=>{
                            SG.send(msg)
                                .then((r) => {
                                console.log("email sent...");
                                count++;
                                if(count==1){
                                    return res.json({
                                        success: true,
                                        message: "email sent successfully",
                                        // user_id: user.dataValues.id,
                                    });
                                }
                                })
                                .catch((error) => {
                                console.log("email not sent...", error);
                                return res.json({
                                    success: false,
                                    message: error.message,
                                });
                                });
                        })
                }else if(frequency==3){
                    schedule.scheduleJob(email.id, '0 0 1 * *', ()=>{
                        SG.send(msg)
                            .then((r) => {
                            console.log("email sent...");
                            count++;
                            if(count==1){
                                return res.json({
                                    success: true,
                                    message: "email sent successfully",
                                    // user_id: user.dataValues.id,
                                });
                            }
                            })
                            .catch((error) => {
                            console.log("email not sent...", error);
                            return res.json({
                                success: false,
                                message: error.message,
                            });
                            });
                    })
                }else if(frequency==4){
                    schedule.scheduleJob(email.id, '0 0 1 1 *', ()=>{
                        SG.send(msg)
                            .then((r) => {
                            console.log("email sent...");
                            count++;
                            if(count==1){
                                return res.json({
                                    success: true,
                                    message: "email sent successfully",
                                    // user_id: user.dataValues.id,
                                });
                            }
                            })
                            .catch((error) => {
                            console.log("email not sent...", error);
                            return res.json({
                                success: false,
                                message: error.message,
                            });
                            });
                    })
                }
        })

        
    }catch(error){
        res.json({
            success : false,
            message : error.message
        })
    }
});

router.get("/cancel/:id", isLoggedIn, verifyToken, isOwner, async (req, res)=>{
    try{
        await Email.findByIdAndUpdate(req.params.id, {recurring : false}, (err, email)=>{
            if(err){
                console.log(err);
                history.back();
            }
            schedule.cancelJob(req.params.id);
            console.log("recurring false done");
            res.redirect("/dashboard/home");
        })
    }catch(error){
        res.json({
            success : false,
            message : error.message
        })
    }
})

module.exports = router;