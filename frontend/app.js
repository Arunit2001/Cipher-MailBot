const express = require("express");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static("assets"));

app.get("/", (req, res)=>{
    res.render("landing.ejs");
})

app.get("/login", (req, res)=>{
    res.render("login.ejs")
})
app.get("/signup", (req, res)=>{
    res.render("signup.ejs");
})

app.post("/signup", async (req, res)=>{
    try{
        let response = await fetch("http://localhost:5000/user/signup",{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
                name : req.body.name,
                email : req.body.email,
                password : req.body.password
            }),
        })
        response = await response.json();
        if(response.success==true){
            res.redirect("/login");
        }else{
            //use flash here
        }
    }catch(error){
        res.json()
    }
})

app.post("/signin", async (req, res)=>{
    try{
        let response = await fetch("http://localhost:5000/user/signin",{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
                email : req.body.email,
                password : req.body.password
            }),
        })
        response = await response.json();
        if(response.success==true){
            res.redirect("/");
        }else{
            //use flash here
        }
    }catch(error){
        res.json()
    }
})

app.listen("3000", ()=>{
    console.log("frontend started....");
})