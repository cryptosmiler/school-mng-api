const express = require("express");
const router = express.Router();

const {
  createStudents,
  getAllStudents,
  getSingleStudent,
  updeateStudent,
  deleteStudent,
} = require("../controllers/students");

const {} = require("../controllers/students");

router.route("/").get(getAllStudents).post(createStudents);
router
  .route("/:id")
  .get(getSingleStudent)
  .patch(updeateStudent)
  .delete(deleteStudent);

module.exports = router;
