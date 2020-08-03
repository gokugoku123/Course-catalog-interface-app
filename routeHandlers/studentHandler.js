const express = require("express");
const { render } = require("ejs");
const router = express.Router();
const fetch = require("node-fetch");


router.get("/", async (req, res) => {
    let studentList = [];
     await fetch("http://localhost:8083/catalog/students", {"mode": "no-cors"})
                .then(res => res.json())
                .then(data => studentList.push(...data));
    res.render("students", {students: studentList});
});

router.get("/get/:studentId", async (req, res) => {
     let student = {}
     await fetch("http://localhost:8083/catalog/students/" + req.params.studentId)
    .then(res => res.json())
    .then(data => student = {...data});
     res.render("showStudent", {student: student});
});



router.get("/addstudent", (req, res) => {
    res.render("studentCreate");
})

router.post("/addstudent", async (req, res) => {
    await fetch("http://localhost:8083/catalog/students", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(req.body)
    }).then(res => console.log("Student Added"));

    res.redirect("/students");
});

router.get("/updatestudent/:studentId", async (req, res) => {
    let student = {}
    await fetch("http://localhost:8083/catalog/students/" + req.params.studentId)
   .then(res => res.json())
   .then(data => student = {...data});

   res.render("updateStudent", {student : student});
});

router.post("/updatestudent/:studentId", async(req, res) => {
    await fetch(`http://localhost:8083/catalog/students/${req.params.studentId}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(req.body)
    });
    res.redirect(`/students/get/${req.params.studentId}`);
});

router.get("/deletestudent/:studentId", async (req, res) => {
    console.log("Delete Student = " + req.params.studentId);
    await fetch(`http://localhost:8083/catalog/students/${req.params.studentId}`, {
        method: "DELETE",
        headers: {"Content-Type": "application/json"}
    }).then(res => console.log("Student Removed"));
    res.redirect("/students");
})


router.get("/", (req, res) => {
    fetch("http://localhost:8083/catalog/students", {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(req.body)
    }).then(res => console.log(res.body));

    res.redirect("/students");
});


module.exports = router;