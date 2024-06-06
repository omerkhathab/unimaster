const express = require("express"); 
const cors = require("cors");
const app = express();

const studentRouter = require("./routes/students");
const facultyRouter = require("./routes/faculty");
const departmentRouter = require("./routes/departments");
const adminRouter = require("./routes/admin");
const courseRouter = require("./routes/courses");

app.use(express.json()); 
app.use(cors());
app.use("/students", studentRouter);
app.use("/faculties", facultyRouter);
app.use("/departments", departmentRouter);
app.use("/admin", adminRouter);
app.use("/courses", courseRouter);

app.listen(5000, () => {
  console.log("server started at localhost 5000");
});