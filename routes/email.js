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
const History = require("../models/history");
const SG = require("@sendgrid/mail");
const schedule = require("node-schedule");
const moment = require("moment");
require("dotenv").config();

SG.setApiKey(process.env.SGKEY);

router.post('/email', isLoggedIn, verifyToken, async (req, res)=>{
    try{
        // console.log(req.body);
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
            recurring : (req.body.frequency==0 || req.body.frequency==5) ? false : true,
            createdAt : new Date().toLocaleString()
        }

        await Email.create(info, async (error, email)=>{
            if(error){
                res.redirect("/dashboard/create");
            }

            const msg = {
                to: req.body.to,
                from: {
                  name: req.user.name,
                  email: "sakuranoneed@gmail.com",
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
                    .then(async (r) => {
                      console.log("email sent...");
                      info.createdAt = new Date().toLocaleString();
                      await History.create(info, (err, history)=>{
                          if(err){
                              console.log(err);
                              return;
                          }
                          console.log("history created...");
                          return res.json({
                            success: true,
                            message: "email sent successfully",
                            // user_id: user.dataValues.id,
                          });
                      })
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
                            .then(async (r) => {
                              console.log("email sent...");
                              info.createdAt = new Date().toLocaleString();
                              await History.create(info, (err, history)=>{
                                if(err){
                                    console.log(err);
                                }
                                console.log("history created...");
                                count++;
                                if(count==1){
                                    return res.json({
                                        success: true,
                                        message: "email sent successfully",
                                        // user_id: user.dataValues.id,
                                    });
                                }
                              })
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
                                .then(async (r) => {
                                console.log("email sent...");
                                info.createdAt = new Date().toLocaleString();
                                await History.create(info, (err, history)=>{
                                    if(err){
                                        console.log(err);
                                    }
                                    console.log("history created...");
                                    count++;
                                    if(count==1){
                                        return res.json({
                                            success: true,
                                            message: "email sent successfully",
                                            // user_id: user.dataValues.id,
                                        });
                                    }
                                  })
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
                            .then(async (r) => {
                            console.log("email sent...");
                            info.createdAt = new Date().toLocaleString();
                            await History.create(info, (err, history)=>{
                                if(err){
                                    console.log(err);
                                }
                                console.log("history created...");
                                count++;
                                if(count==1){
                                    return res.json({
                                        success: true,
                                        message: "email sent successfully",
                                        // user_id: user.dataValues.id,
                                    });
                                }
                              })
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
                            .then(async (r) => {
                            console.log("email sent...");
                            info.createdAt = new Date().toLocaleString();
                            await History.create(info, (err, history)=>{
                                if(err){
                                    console.log(err);
                                }
                                console.log("history created...");
                                count++;
                                if(count==1){
                                    return res.json({
                                        success: true,
                                        message: "email sent successfully",
                                        // user_id: user.dataValues.id,
                                    });
                                }
                              })
                            })
                            .catch((error) => {
                            console.log("email not sent...", error);
                            return res.json({
                                success: false,
                                message: error.message,
                            });
                            });
                    })
                }else if(frequency==5){
                    var DELAY = req.body.delay;
                    console.log("delay = ", DELAY);
                    setTimeout(function(){
                        SG.send(msg)
                            .then(async (r) => {
                            console.log("email sent...");
                            info.createdAt = new Date().toLocaleString();
                            await History.create(info, (err, history)=>{
                                if(err){
                                    console.log(err);
                                }
                                console.log("history created...");
                                count++;
                                if(count==1){
                                    return res.json({
                                        success: true,
                                        message: "email sent successfully",
                                        // user_id: user.dataValues.id,
                                    });
                                }
                              })
                            })
                            .catch((error) => {
                            console.log("email not sent...", error);
                            return res.json({
                                success: false,
                                message: error.message,
                            });
                            });
                    }, DELAY);
                }
            })

        
    }catch(error){
        res.json({
            success : false,
            message : error.message
        })
    }
});

router.post('/email/edit/:id', isLoggedIn, verifyToken, isOwner, async (req, res)=>{
    try{
        console.log(req.body);

        let info = {
            to : req.body.to,
            cc : req.body.cc,
            from : {
                id : req.user.id,
                name : req.user.name,
                email : req.user.email
            },
            subject : req.body.subject,
            content : req.body.content,
            frequency : req.body.frequency,
            recurring : (req.body.frequency==0 || req.body.frequency==5)? false : true,
            createdAt : new Date().toLocaleString()
        }

        await Email.findByIdAndUpdate(req.params.id, {content : req.body.content}, (error, email)=>{
            if(error){
                res.redirect("/dashboard/create");
            }
            const msg = {
                to: req.body.to,
                from: {
                  name: req.user.name,
                  email: "sakuranoneed@gmail.com",
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
                    .then(async (r) => {
                      console.log("email sent...");
                      info.createdAt = new Date().toLocaleString();
                      await History.create(info, (err, history)=>{
                          if(err){
                              console.log(err);
                          }
                          console.log("history created...");
                          return res.json({
                            success: true,
                            message: "email sent successfully",
                            // user_id: user.dataValues.id,
                          });
                      })
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
                            .then(async (r) => {
                              console.log("email sent...");
                              info.createdAt = new Date().toLocaleString();
                              await History.create(info, (err, history)=>{
                                if(err){
                                    console.log(err);
                                    return;
                                }
                                console.log("history created...");
                                count++;
                                if(count==1){
                                    return res.json({
                                        success: true,
                                        message: "email sent successfully",
                                        // user_id: user.dataValues.id,
                                    });
                                }
                              })
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
                                .then(async (r) => {
                                console.log("email sent...");
                                info.createdAt = new Date().toLocaleString();
                                await History.create(info, (err, history)=>{
                                    if(err){
                                        console.log(err);
                                    }
                                    console.log("history created...");
                                    count++;
                                    if(count==1){
                                        return res.json({
                                            success: true,
                                            message: "email sent successfully",
                                            // user_id: user.dataValues.id,
                                        });
                                    }
                                  })
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
                            .then(async (r) => {
                            console.log("email sent...");
                            info.createdAt = new Date().toLocaleString();
                            await History.create(info, (err, history)=>{
                                if(err){
                                    console.log(err);
                                }
                                console.log("history created...");
                                count++;
                                if(count==1){
                                    return res.json({
                                        success: true,
                                        message: "email sent successfully",
                                        // user_id: user.dataValues.id,
                                    });
                                }
                              })
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
                            .then(async (r) => {
                            console.log("email sent...");
                            info.createdAt = new Date().toLocaleString();
                            await History.create(info, (err, history)=>{
                                if(err){
                                    console.log(err);
                                }
                                console.log("history created...");
                                count++;
                                if(count==1){
                                    return res.json({
                                        success: true,
                                        message: "email sent successfully",
                                        // user_id: user.dataValues.id,
                                    });
                                }
                              })
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

router.get("/edit/:id", isLoggedIn, verifyToken, isOwner, async (req, res)=>{
    try{
        await Email.findById(req.params.id, (err, email)=>{
            if(err){
                console.log(err);
                return res.json({
                    success : false,
                    message : err.message
                });
            }
            schedule.cancelJob(email.id);
            res.render("editSchedule.ejs", {email : email, moment : moment});
        })
    }catch(error){
        res.json({
            success : false,
            message : error.message
        })
    }
})

module.exports = router;