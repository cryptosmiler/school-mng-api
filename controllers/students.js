const Students = require("../models/students");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");

// Create Student
const createStudents = async (req, res) => {
  const { name, admissionNum, dob } = req.body;

  if (!name || !admissionNum || !dob) {
    throw new BadRequestError(
      "Please Provide Name, admission Number, Date of Birth."
    );
  }

  req.body.createdBy = req.user.userId;

  const students = await Students.create(req.body);

  res.status(StatusCodes.CREATED).json({ students });
};

// Get All Students
const getAllStudents = async (req, res) => {
  const { userId } = req.user;
  const students = await Students.find({ createdBy: userId });

  res.status(StatusCodes.OK).json({ count: students.length, students });
};

// Get Single Student
const getSingleStudent = async (req, res) => {
  const {
    user: { userId },
    params: { id: studentId },
  } = req;

  const student = await Students.findOne({
    admissionNum: studentId,
    createdBy: userId,
  });

  if (!student) {
    throw new NotFoundError(`No user with admission Number ${studentId}`);
  }

  res.status(StatusCodes.OK).json({ student });
};

// Update Single Student
const updeateStudent = async (req, res) => {
  const {
    body: { name, dob },
    user: { userId },
    params: { id: studentId },
  } = req;

  if (name === "" || dob === "") {
    throw new BadRequestError(
      "Name, Admission Number or Date of Birth can not be empty"
    );
  }

  const student = await Students.findOneAndUpdate(
    {
      createdBy: userId,
      admissionNum: studentId,
    },
    req.body,
    { new: true, runValidators: true }
  );

  if (!student) {
    throw new NotFoundError(`No user with admission Number ${studentId}`);
  }

  res.status(StatusCodes.OK).json({ student });
};

// Delete Single Student
const deleteStudent = async (req, res) => {
  const {
    user: { userId },
    params: { id: studentId },
  } = req;

  const student = await Students.findOneAndRemove({
    admissionNum: studentId,
    createdBy: userId,
  });

  if (!student) {
    throw new NotFoundError(
      `No student found with admission number ${studentId} `
    );
  }
  res.status(StatusCodes.OK).send();
};

module.exports = {
  createStudents,
  getAllStudents,
  getSingleStudent,
  updeateStudent,
  deleteStudent,
};
