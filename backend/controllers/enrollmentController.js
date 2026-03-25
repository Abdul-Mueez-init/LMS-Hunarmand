const Enrollment = require('../models/enrollmentModel');
const Course = require('../models/courseModel');

// @desc    Enroll in a course
// @route   POST /api/enroll
// @access  Private/Student
const enrollInCourse = async (req, res) => {
  const { courseId } = req.body;

  const course = await Course.findById(courseId);

  if (!course) {
    res.status(404).json({ message: 'Course not found' });
    return;
  }

  const enrollmentExists = await Enrollment.findOne({
    student: req.user._id,
    course: courseId,
  });

  if (enrollmentExists) {
    res.status(400).json({ message: 'Already enrolled in this course' });
    return;
  }

  const enrollment = await Enrollment.create({
    student: req.user._id,
    course: courseId,
  });

  if (enrollment) {
    res.status(201).json(enrollment);
  } else {
    res.status(400).json({ message: 'Invalid enrollment data' });
  }
};

// @desc    Get my courses
// @route   GET /api/enroll/my-courses
// @access  Private/Student
const getMyCourses = async (req, res) => {
  const enrollments = await Enrollment.find({ student: req.user._id }).populate('course');
  res.json(enrollments);
};

module.exports = {
  enrollInCourse,
  getMyCourses,
};
