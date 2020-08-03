const express = require("express");
const courseHandler = require("./routeHandlers/courseHandler");
const studentHandler = require("./routeHandlers/studentHandler");
const path = require("path");
const app = express();

app.use(express.urlencoded({extended:true}));
app.use('/courses', express.static(__dirname + '/public'))
app.use('/students', express.static(__dirname + '/public'))
app.use('/courses/get', express.static(__dirname + '/public'));
app.use('/students/get', express.static(__dirname + '/public'));
app.use('/courses/updatecourse', express.static(__dirname + '/public'))
app.use('/students/updatestudent', express.static(__dirname + '/public'))
app.use(express.static("public"));
app.set("view engine", "ejs");

app.use("/courses", courseHandler);
app.use("/students", studentHandler);

app.get("/", (req, res) => {
    res.render("home");
});





app.listen(3000, () => console.log("Port on 3000 Running..."));