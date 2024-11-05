const mongoose = require('mongoose');

const payrollSchema = new mongoose.Schema({
  employee: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
  month: { type: String, required: true }, // e.g., "October 2024"
  year: { type: Number, required: true },
  baseSalary: { type: Number, required: true }, // fetched from Employee model initially
  totalHoursWorked: { type: Number, default: 0 },
  deductions: { type: Number, default: 0 },
  bonuses: { type: Number, default: 0 },
  netPay: { type: Number, default: 0 }, // calculated based on salary, deductions, and bonuses
});

const Payroll = mongoose.model('Payroll', payrollSchema);
module.exports = Payroll;
