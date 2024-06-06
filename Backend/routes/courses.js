const express = require("express");
const router = express.Router();
const pool = require("../db");

router.get("/getcourses", (req, res) => {
  let query = `select courseid,coursename,deptname from courses NATURAL JOIN Departments`;
  pool.getConnection((err, connection) => {
    if (err) {
      res.json({ displayMessage: err, data: "", isSuccess: false });
    } else {
      connection.query(query, (err, data, fields) => {
        if (err) {
          res.json({ displayMessage: err, data: "", isSuccess: false });
        } else {
          if (data.length > 0) {
            res.json({ displayMessage: "", data: data, isSuccess: true });
          } else {
            res.json({
              displayMessage: "No Data Found",
              data: "",
              isSuccess: true,
            });
          }
        }
      });
      connection.release();
    }
  });
});

router.get("/mycourses/:sid", (req, res) => {
  const sid=req.params.sid
  let query = 
    `SELECT c.courseid, c.coursename, d.deptname FROM courses c NATURAL JOIN Departments d WHERE c.courseid IN (
    SELECT e.courseid FROM enrollment e WHERE e.sid = ${sid})`;
  pool.getConnection((err, connection) => {
    if (err) {
      res.json({ displayMessage: err, data: "", isSuccess: false });
    } else {
      connection.query(query, (err, data, fields) => {
        if (err) {
          res.json({ displayMessage: err, data: "", isSuccess: false });
        } else {
          if (data.length > 0) {
            res.json({ displayMessage: "", data: data, isSuccess: true });
          } else {
            res.json({
              displayMessage: "No Data Found",
              data: "",
              isSuccess: true,
            });
          }
        }
      });
      connection.release();
    }
  });
});

router.post("/enroll", (req, res) => {
  const { sid, courseid} = req.body;
  let query = `INSERT INTO Enrollment (sid, courseid) Values(${sid},'${courseid}')`;
  pool.getConnection((err, connection) => {
    if (err) {
      res.json({ displayMessage: err, data: "", isSuccess: false });
    } else {
      connection.query(query, (err, data, fields) => {
        if (err) {
          res.json({ displayMessage: err, data: "", isSuccess: false });
        } else {
            res.json({
              displayMessage: "Course Enrolled Successfully!",
              data: "",
              isSuccess: true,
            });
        }
      });
      connection.release();
    }
  });
});

router.post("/unenroll", (req, res) => {
  const { sid, courseid} = req.body;
  let query = `DELETE FROM Enrollment WHERE sid=${sid} and courseid='${courseid}'`;
  pool.getConnection((err, connection) => {
    if (err) {
      res.json({ displayMessage: err, data: "", isSuccess: false });
    } else {
      connection.query(query, (err, data, fields) => {
        if (err) {
          res.json({ displayMessage: err, data: "", isSuccess: false });
        } else {
            res.json({
              displayMessage: "Unenrolled Successfully",
              data: "",
              isSuccess: true,
            });
        }
      });
      connection.release();
    }
  });
});

router.get("/enrollment/:sid", (req, res) => {
  const sid=req.params.sid;
  let query = 
  `SELECT c.courseid, c.coursename, d.deptname FROM courses c NATURAL JOIN Departments d WHERE c.courseid NOT IN (
    SELECT e.courseid FROM enrollment e WHERE e.sid = ${sid})`;
  pool.getConnection((err, connection) => {
    if (err) {
      res.json({ displayMessage: err, data: "", isSuccess: false });
    } else {
      connection.query(query, (err, data, fields) => {
        if (err) {
          res.json({ displayMessage: err, data: "", isSuccess: false });
        } else {
          if (data.length > 0) {
            res.json({ displayMessage: "", data: data, isSuccess: true });
          } else {
            res.json({
              displayMessage: "No Data Found",
              data: "",
              isSuccess: true,
            });
          }
        }
      });
      connection.release();
    }
  });
});

router.post("/add", (req, res) => {
  const {courseid, coursename,deptid} = req.body;
  let query = "INSERT INTO Courses (courseid,coursename,deptid)"
  query+=` values('${courseid}','${coursename}','${deptid}')`
  pool.getConnection((err, connection) => {
      if (err) {
        return res.json({ displayMessage: err, data: "", isSuccess: false });
      } else {
        connection.query(query, (err, data, fields) => {
          if (err) {
            return res.json({ displayMessage: err, data: "", isSuccess: false });
          } else {
            if (data.affectedRows) {
              return res.json({ displayMessage: "Course Added Successfully", data: data, isSuccess: true });
            } else {
              return res.json({
                displayMessage: "No Data Found",
                data: "",
                isSuccess: true,
              });
            }
          }
        });
        connection.release();
      }
    });
})

router.delete("/delete/:courseid", (req, res) => {
  const courseid=req.params.courseid;
  let query= `DELETE FROM Courses WHERE courseid='${courseid}'`;
  try {
    pool.getConnection((err, connection) => {
      connection.query(query, (err, data, fields) => {
      if (err) {
        connection.release();
        res.json({
          displayMessage: "Something went wrong. Try Again!",
          data: err,
          isSuccess: false,
        });
      } else {
          res.json({
            displayMessage: `Course ${courseid} deleted`,
            data: data,
            isSuccess: true,
          });
      }
      });
      connection.release();
    });
  } catch (error) {
  res.json({
    displayMessage: error.message,
    data: "",
    isSuccess: false,
  });
}
});

module.exports = router;