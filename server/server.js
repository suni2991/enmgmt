// 
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const emailRouter = require("./routes/EmailRouter.js")
const attendanceRouter = require("./routes/AttendenceRouter.js");
const payrollRouter = require("./routes/PayrollRouter.js");
const employeeRouter = require("./routes/EmployeeRouter.js");


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

async function main() {
  await mongoose.connect(process.env.URL);
    await mongoose.connection.db.collection('employees').createIndex({ email: 1 }, { unique: true });
    console.log('db connected.');
}

main().catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});

 
app.use(employeeRouter);
app.use(emailRouter);
app.use(attendanceRouter);
app.use(payrollRouter);




app.listen(6001, () => {
  console.log('KM server started at port 6001')
})