const Course = require('../models/courseModel');

// @desc    Fetch all courses
// @route   GET /api/courses
// @access  Public
const getCourses = async (req, res) => {
  const courses = await Course.find({}).populate('instructor', 'name');
  res.json(courses);
};

// @desc    Fetch single course
// @route   GET /api/courses/:id
// @access  Public
const getCourseById = async (req, res) => {
  const course = await Course.findById(req.params.id).populate('instructor', 'name');

  if (course) {
    res.json(course);
  } else {
    res.status(404).json({ message: 'Course not found' });
  }
};

// @desc    Create a course
// @route   POST /api/courses
// @access  Private/Instructor
const createCourse = async (req, res) => {
  const { title, description, category, price, lessons } = req.body;

  const course = new Course({
    title,
    description,
    category,
    price,
    lessons: lessons || [],
    instructor: req.user._id,
  });

  const createdCourse = await course.save();
  res.status(201).json(createdCourse);
};

// @desc    Update a course
// @route   PUT /api/courses/:id
// @access  Private/Instructor
const updateCourse = async (req, res) => {
  const { title, description, category, price, lessons } = req.body;

  const course = await Course.findById(req.params.id);

  if (course) {
    if (course.instructor.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      res.status(401).json({ message: 'Not authorized to update this course' });
      return;
    }

    course.title = title || course.title;
    course.description = description || course.description;
    course.category = category || course.category;
    course.price = price || course.price;
    course.lessons = lessons || course.lessons;

    const updatedCourse = await course.save();
    res.json(updatedCourse);
  } else {
    res.status(404).json({ message: 'Course not found' });
  }
};

// @desc    Delete a course
// @route   DELETE /api/courses/:id
// @access  Private/Instructor
const deleteCourse = async (req, res) => {
  const course = await Course.findById(req.params.id);

  if (course) {
    if (course.instructor.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      res.status(401).json({ message: 'Not authorized to delete this course' });
      return;
    }

    await course.deleteOne();
    res.json({ message: 'Course removed' });
  } else {
    res.status(404).json({ message: 'Course not found' });
  }
};

module.exports = {
  getCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
};
