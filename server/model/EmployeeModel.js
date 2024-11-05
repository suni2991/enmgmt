const mongoose = require('mongoose');


const employeeSchema = new mongoose.Schema({
  id: { type: Number },
  empId: {type: Number},
  fullName: { type: String, require: true },
  contact: { type: Number },
  email: { type: String, unique: true},
  dob: {type: Date},
  doj: {type: Date},
  qualification: {type: String},
  employementType:{type: String},
  languages:[{type:String}],
  maritalStatus:{type: String, enum: ["Single", "Married", "Unmarried"]},
  designation:{type: String},
  prefShift:{type:String},
  shiftTimings:{type:String},
  password: { type: String },
  address: {type:String},
  district: {type: String},
  pincode: {type: String},
  salary:{type: String},
  confirmPassword: { type: String },
  role: { type: String, enum: ["Employee", "Admin", "Reporting-Manager","Vice-President","Project-Manager" ], default: "Employee" },
  dateCreated: { type: Date, default: "" },
  createdAt: { type: Date },
  category: { type: String },
  mgrName: { type: String },
  mgrEmail: { type: String },
  department: {type: String, default: 'Not Defined'},
});

employeeSchema.index({ email: 1, 'topics.topic': 1 }, { unique: true });
employeeSchema.add({
  attendance: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Attendance' }],
  payroll: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Payroll' }]
});

const Employee = mongoose.model('Employee', employeeSchema);
module.exports = Employee;
