const express = require('express');
const router = express.Router();
const { enrollInCourse, getMyCourses } = require('../controllers/enrollmentController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').post(protect, enrollInCourse);
router.route('/my-courses').get(protect, getMyCourses);

module.exports = router;
