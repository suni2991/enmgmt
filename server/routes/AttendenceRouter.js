const express = require('express');
const router = express.Router();
const Attendance = require('../model/AttendenceModel.js');
const Employee = require('../model/EmployeeModel.js');

// Endpoint for employee check-in
router.post('/checkin', async (req, res) => {
  const { employeeId } = req.body;
  if (!employeeId) return res.status(400).json({ message: "Employee ID is required" });

  try {
    const currentDate = new Date();
    const startOfDay = new Date(currentDate.setHours(0, 0, 0, 0)); // Get the start of the day

    // Check if the employee has already checked in today
    const existingRecord = await Attendance.findOne({
      employee: employeeId,
      date: { $gte: startOfDay }
    });

    if (existingRecord) {
      return res.status(400).json({ message: "Already checked in for today" });
    }

    const attendanceRecord = new Attendance({
      employee: employeeId,
      date: new Date(),
      checkIn: new Date(),
    });
    await attendanceRecord.save();
    await Employee.updateOne(
      { _id: employeeId },
      { $push: { attendance: attendanceRecord._id } }
    );

    res.status(200).json({ message: "Check-in successful", attendanceRecord });

  } catch (error) {
    res.status(500).json({ message: "Error during check-in", error });
  }
});

// Check-Out Endpoint
router.post('/checkout', async (req, res) => {
  const { employeeId } = req.body;
  if (!employeeId) return res.status(400).json({ message: "Employee ID is required" });

  try {
    const currentDate = new Date();
    const startOfDay = new Date(currentDate.setHours(0, 0, 0, 0)); // Get the start of the day

    const attendanceRecord = await Attendance.findOne({
      employee: employeeId,
      date: { $gte: startOfDay } // Find today's record
    });

    if (!attendanceRecord) {
      return res.status(404).json({ message: "No check-in record found for today" });
    }

    attendanceRecord.checkOut = currentDate;
    const hoursWorked = (currentDate - attendanceRecord.checkIn) / (1000 * 60 * 60); // Calculate hours
    attendanceRecord.hoursWorked = hoursWorked;

    // Determine attendance status based on hours worked
    attendanceRecord.status = hoursWorked >= 7 ? 'Present' : 'Absent';
    
    await attendanceRecord.save();
    await Employee.updateOne(
      { _id: employeeId },
      { $set: { "attendance.$[elem].checkOut": currentDate, "attendance.$[elem].hoursWorked": hoursWorked, "attendance.$[elem].status": attendanceRecord.status } }, 
      { arrayFilters: [{ "elem": attendanceRecord._id }] }
    );

    res.status(200).json({ message: "Check-out successful", attendanceRecord });
  } catch (error) {
    res.status(500).json({ message: "Error during check-out", error });
  }
});

// Fetch attendance records for an employee
router.get('/api/attendance/:employeeId', async (req, res) => {
  const { employeeId } = req.params;

  try {
    const attendanceRecords = await Attendance.find({ employee: employeeId }).sort({ date: -1 });

    if (!attendanceRecords.length) {
      return res.status(404).json({ message: "No attendance records found for this employee." });
    }

    res.status(200).json(attendanceRecords);
  } catch (error) {
    console.error("Error fetching attendance records:", error);
    res.status(500).json({ message: "Error fetching attendance records", error: error.message });
  }
});

module.exports = router;
