const express = require("express");
const { render } = require("ejs");
const router = express.Router();
const fetch = require("node-fetch");

router.get("/", async (req, res) => {
    let courseList = [];
     await fetch("http://localhost:8083/catalog/courses", {"mode": "no-cors"})
                .then(res => res.json())
                .then(data => courseList.push(...data));
    res.render("courses", {courses: courseList});
});

router.get("/get/:courseId", async (req, res) => {
    let course = {}
    await fetch("http://localhost:8083/catalog/courses/" + req.params.courseId)
   .then(res => res.json())
   .then(data => course = {...data});

   let enrolledStudents = [];
   await fetch(`http://localhost:8083/catalog/courses/${course.cId}/enrolledStudents`, {"mode": "no-cors"})
              .then(res => res.json())
              .then(data => enrolledStudents.push(...data));


    res.render("showCourse", {course: course, enrolledStudents : enrolledStudents});
});

router.get("/addcourse", (req, res) => {
    res.render("courseCreate");
})

router.post("/addcourse", async (req, res) => {
    await fetch("http://localhost:8083/catalog/courses", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(req.body)
    }).then(res => console.log("Course Added"));

    res.redirect("/courses");
});

router.get("/updatecourse/:courseId", async (req, res) => {
    let course = {}
    await fetch("http://localhost:8083/catalog/courses/" + req.params.courseId)
   .then(res => res.json())
   .then(data => course = {...data});

   res.render("updateCourse", {course : course});
});

router.post("/updatecourse/:courseId", async(req, res) => {

    await fetch(`http://localhost:8083/catalog/courses/${req.params.courseId}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(req.body)
    });
    res.redirect(`/courses/get/${req.params.courseId}`);
});


router.get("/deletecourse/:courseId", async (req, res) => {
    await fetch(`http://localhost:8083/catalog/courses/${req.params.courseId}`, {
        method: "DELETE",
        headers: {"Content-Type": "application/json"}
    }).then(res => console.log("Course Removed"));
    res.redirect("/courses");
})

router.post("/update/enroll/:courseId", async (req, res) => {

    const studentId = req.body.studentId;
    console.log("insode enroll course id = " + req.params.courseId + " student id = " + studentId);

    await fetch(`http://localhost:8083/catalog/courses/addenroll/${req.params.courseId}/${studentId}`, {
        method: "GET",
        headers: {"Content-Type": "application.json"}
    }).then(res => console.log("Student Enrolled in course"));
    res.redirect("/courses/get/" + req.params.courseId);
});


router.get("/update/deenroll/:courseId/:studentId", async (req, res) => {
    console.log("Inside de enroll.... course id = " + req.params.courseId + " student Id = " + req.params.studentId);
    await fetch(`http://localhost:8083/catalog/courses/removeenroll/${req.params.courseId}/${req.params.studentId}`, {
        method: "GET",
        headers: {"Content-Type": "application.json"}
    }).then(res => console.log("Student DeEnrolled in course"));
    res.redirect("/courses/get/" + req.params.courseId);
});

module.exports = router;