const mongoose = require('mongoose');

const enrollmentSchema = mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Course',
    },
    progress: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Enrollment = mongoose.model('Enrollment', enrollmentSchema);

module.exports = Enrollment;
