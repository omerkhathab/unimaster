const express = require("express");
const router = express.Router();
const pool = require("../db");

router.get("/getdepartments", (req, res) => {
let query = `select deptid,deptname,headofdept,count(sid) as StudentCount from departments NATURAL JOIN Students group by deptid`;
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

module.exports = router;
