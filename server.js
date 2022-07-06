// /*********************************************************************************
// * WEB322 – Assignment 04
// * I declare that this assignment is my own work in accordance with Seneca Academic Policy. No part 
// * of this assignment has been copied manually or electronically from any other source 
// * (including 3rd party web sites) or distributed to other students.
// * 
// * Name: Harsh Vishnu Limbachiya  Student ID: 157295197  Date: 05/7/2022
// *
// ***********************************************************************************

const HTTP_PORT = process.env.PORT || 8080;
const express = require("express");
const path = require("path");
const officeData = require("./public/officeData");
const app = express();
app.use(express.static("public"));

officeData.initialize().then(function(){

    //set up a route to listen to /PartTimer
    app.get("/PartTimer", (req, res) => {
        officeData.getPartTimers().then((officeData) => {
            res.json(officeData);
        }).catch((err)=>{
            res.json({message: "no result"});
        });
    });

    //setup a route to listen on default url path
    app.get("/", (req, res) => {
        res.sendFile(path.join(__dirname, "/public/views/home.html"));
    });

    //setup http server to listen to /employee/num
    app.get("/employee/:num", (req, res) => {
        officeData.getEmployeeByNum(req.params.num).then((officeData) => {
            res.json(officeData);
        }).catch((err) => {
            res.json({message : "No results"});
        });
    });

    //set http server to /audio
    app.get("/audio", (req, res) => {
        res.sendFile(path.resolve('/public/views/audio.html'));
    });
    //set http request to /video
    app.get("/video", (req, res) => {
        res.sendFile(path.resolve('/public/views/video.html'));
    });

    //set http request to /table
    app.get("/table", (req, res) =>{
        res.sendFile(path.resolve('/public/views/table.html'));
    });

    //set http request to /list 
    app.get("/list", (req, res) => {
        res.sendFile( path.resolve('/public/views/list.html'));
    });

    //set default page not found status
    app.use((req, res) => {
        res.status(404).send("Page Not Found");
    });

    //setup http server to listen on HTTP_PORT
    app.listen(HTTP_PORT, ()=>
        {
            console.log("server listening on port" + HTTP_PORT);
        });

}).catch((err) => {
    console.log(err);
});