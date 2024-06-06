const express = require("express");
const router = express.Router();
const pool = require("../db");

// admin authentication
router.post("/auth", (req, res) => {
  const {email, password} = req.body;
  try {
    let query =
    `select * from admins where email='${email}' and password='${password}'`;
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

module.exports = router;