const express = require("express");
const router = express.Router();
const pool = require("../db");

// api to get all the faculties data
router.get("/allfaculties", async (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) {
      res.json({ displayMessage: err, data: "", isSuccess: false });
    } else {
      let query =
        "SELECT * FROM Faculty";
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

router.post("/insert", (req, res) => {
    const {fullname, department,designation,email,experience,gender,password,phone,qualification} = req.body;
    let query = "INSERT INTO FACULTY (fullname,department,designation,email,experience,gender,password,phone,qualification)";
    query+=` values('${fullname}','${department}','${designation}','${email}','${experience}','${gender}','${password}','${phone}','${qualification}')`
    pool.getConnection((err, connection) => {
        if (err) {
          return res.json({ displayMessage: err, data: "", isSuccess: false });
        } else {
          connection.query(query, (err, data, fields) => {
            if (err) {
              return res.json({ displayMessage: err, data: "", isSuccess: false });
            } else {
              if (data.affectedRows) {
                return res.json({ displayMessage: "Added Successfully", data: data, isSuccess: true });
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

// delete a student
router.post("/delete", (req, res) => {
  const {facultyid} = req.body;
  let query= `DELETE FROM Students WHERE sid=${facultyid}`;
  try {
    pool.getConnection((err, connection) => {
      connection.query(query, (err, data, fields) => {
      if (err) {
        connection.release();
        res.json({
          displayMessage: "Something went wrong. Try Again!",
          data: "",
          isSuccess: false,
        });
      } else {
          res.json({
            displayMessage: `Faculty with id ${facultyid}deleted`,
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