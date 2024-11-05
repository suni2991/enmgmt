const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  employee: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
  date: { type: Date, required: true },
  checkIn: { type: Date, required: true },
  checkOut: { type: Date },
  hoursWorked: { type: Number, default: 0 }, // calculated based on check-in and check-out
  status: { type: String, enum: ["Present", "Absent", "Half-Day", "On-Leave"], default: "Present" },
});

const Attendance = mongoose.model('Attendance', attendanceSchema);
module.exports = Attendance;
