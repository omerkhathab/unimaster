const express = require("express");
const router = express.Router();
const pool = require("../db");

// get all students data
router.get("/allstudents", (req, res) => {
  let query = "SELECT * FROM Students";
  pool.getConnection((err, connection) => {
    connection.query(query, (err, data, fields) => {
      if (err) {
        connection.release();
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
  });
});

// get a student data
router.post("/student", (req, res) => {
  try {
    let { sid } = req.body
    if (!sid) {
      return res.json({
        displayMessage: "Please enter a student id",
        data: "",
        isSuccess: false,
      });
    } else {
      let query = `SELECT * From Students NATURAL JOIN Departments where sid=${sid}`;
      pool.getConnection((err, connection) => {
        connection.query(query, (err, data, fields) => {
          if (err) {
            connection.release();
            return res.json({ displayMessage: err, data: "", isSuccess: false });
          } else {
            if (data.length > 0) {
              return res.json({ displayMessage: "", data: data, isSuccess: true });
            } else {
              return res.json({
                displayMessage: "No Data Found",
                data: data,
                isSuccess: true,
              });
            }
          }
        });
        connection.release();
      });
    }
  } catch (error) {
    return res.json({
      displayMessage: error.message,
      data: "",
      isSuccess: false,
    });
  }
});

// insert a student
router.post("/insert", (req, res) => {
    const {fullname, dob,gender,blood,address,phone,email,password,department} = req.body;
    let query= `INSERT INTO STUDENTS (fullname,dob,gender,blood,address,phone,email,password,deptid) VALUES`;
    query+=`('${fullname}','${dob}','${gender}','${blood}','${address}','${phone}','${email}','${password}','${department}')`;
    try {
      pool.getConnection((err, connection) => {
        connection.query(query, (err, data, fields) => {
        if (err) {
            switch (err.code) {
              case "ER_DUP_ENTRY":
                res.json({
                  displayMessage: `${email} is already in used! Please Register with another email address.`,
                  data: "",
                  isSuccess: false,
                });
                break;
              default:
                res.json({
                  displayMessage:
                    "Something went wrong with the registration process. Try Again.",
                  data: "",
                  isSuccess: false,
                });
                break;
            }
            connection.release();
        } else {
            res.json({
              displayMessage:
                "Student successfully registered at Unimaster.",
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

// delete a student
router.delete("/delete/:sid", (req, res) => {
    const sid=req.params.sid;
    let query= `DELETE FROM Students WHERE sid=${sid}`;
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
              displayMessage: `Student with id ${sid} deleted`,
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

// student authentication
router.post("/auth", (req, res) => {
    const {email, password} = req.body;
  try {
    let query =
    `select * from students natural join departments where email='${email}' and password='${password}'`;
      pool.getConnection((err, connection) => {
        if (err) res.json({ displayMessage: err, data: "", isSuccess: false });
        connection.query(query, (err, data, fields) => {
          if (err) {
              res.json({ displayMessage: err, data: "", isSuccess: false });
              connection.release();
          } else {
            res.json({
              displayMessage: "",
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

//  all students details
router.get("/studentinfo", (req, res) => {
  let query = "select sid, FullName, DOB, Gender, Blood, Address, Phone, Email, Password, DeptId, DeptName FROM Students NATURAL JOIN DEPARTMENTS";

  pool.getConnection((err, connection) => {
    if (err) {
      res.json({ displayMessage: err, data: "", isSuccess: false });
    } else {
      connection.query(query, (err, dbData, fields) => {
        connection.release();
        if (err) {
          res.json({ displayMessage: err, data: "", isSuccess: false });
        } else {
          if (dbData.length > 0) {
            res.json({
              displayMessage: err,
              data: dbData,
              isSuccess: true,
            });
          } else {
            res.json({
              displayMessage: "No Data Found",
              data: data,
              isSuccess: true,
            });
          }
        }
      });
    }
  });
});

// forgot password
router.post("/forgetpassword", (req, res) => {
  try {
    const {email, password} = req.body;
    const query = `UPDATE Students Set Password='${password}' WHERE email='${email}'`;
    pool.getConnection((err, connection) => {
    connection.query(query, (err, data, fields) => {
        if (err) {
        connection.release();
        res.json({ displayMessage: err, data: "", isSuccess: false });
        } else {
        res.json({
            displayMessage: "",
            data: data.affectedRows,
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

// update details of student
router.post("/updatedetails", (req, res) => {
    const { sid, password, phone, address } = req.body;
    let query = "UPDATE Students SET ";
    const fieldsToUpdate = [];
    if (address) fieldsToUpdate.push(`address='${address}'`);
    if (phone) fieldsToUpdate.push(`phone='${phone}'`);
    if (password) fieldsToUpdate.push(`password='${password}'`);
    
    if (fieldsToUpdate.length > 0) {
      query += fieldsToUpdate.join(', ');
      query += ` WHERE Sid='${sid}'`;
    }
  try {
    pool.getConnection((err, connection) => {
        connection.query(query, (err, data, fields) => {
            if (err) {
                connection.release();
                res.json({ displayMessage: err, data: "", isSuccess: false });
            } else {
                res.json({
                    displayMessage: "",
                    data: data.affectedRows,
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