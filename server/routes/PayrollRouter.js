// routes/payrollRouter.js

const express = require('express');
const Payroll = require('../model/PayrollModel.js');
const Attendance = require('../model/AttendenceModel.js');
const Employee = require('../model/EmployeeModel.js');
const payRouter = express.Router();

payRouter.post('/generate', async (req, res) => {
  try {
    const { employeeId, month, year } = req.body;

    // Find the employee
    const employee = await Employee.findById(employeeId);
    if (!employee) return res.status(404).json({ message: 'Employee not found' });

    // Fetch attendance records for the specified month
    const attendances = await Attendance.find({
      employee: employeeId,
      date: {
        $gte: new Date(year, month - 1, 1),
        $lte: new Date(year, month, 0)
      }
    });

    // Calculate total hours worked by summing up daily hours
    let totalHoursWorked = 0;
    attendances.forEach(record => {
      if (record.checkIn && record.checkOut) {
        const hours = (record.checkOut - record.checkIn) / (1000 * 60 * 60); // Convert ms to hours
        totalHoursWorked += hours;
      }
    });

    // Define payroll details
    const baseSalary = parseFloat(employee.salary);
    const hourlyRate = baseSalary / 160; // Assuming 160 hours per month as full-time
    const grossPay = hourlyRate * totalHoursWorked;

    // Apply deductions and bonuses as needed
    const deductions = grossPay * 0.1; // Example: 10% deduction
    const bonuses = grossPay * 0.05; // Example: 5% bonus
    const netPay = grossPay - deductions + bonuses;

    // Save payroll record
    const payroll = new Payroll({
      employee: employeeId,
      month,
      year,
      baseSalary,
      totalHoursWorked,
      deductions,
      bonuses,
      netPay
    });

    await payroll.save();
    res.status(201).json({ message: 'Payroll generated successfully', payroll });
  } catch (error) {
    res.status(500).json({ message: 'Error generating payroll', error });
  }
});

module.exports = payRouter;
