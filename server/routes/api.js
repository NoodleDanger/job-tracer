const express = require('express');

const router = express.Router();
const jobApplicationController = require('../controllers/jobApplicationController');
const setUserId = require('../controllers/authController')
/**
 * @route GET /api/
 * @desc GET all job applications
 * @access Public
 */
console.log("setUserId should be function: ",setUserId);
router.get('/', setUserId.setUserId, jobApplicationController.getJobApplications, (req, res) => {
  res.status(200).json(res.locals.jobApplications);
});

/**
 * @route POST /api/jobApplication
 * @desc CREATE new job application
 * @access Public
 */

router.post(
  '/jobApplication',
  setUserId.setUserId,
  jobApplicationController.createJobApplication,
  (req, res) => {
    res.status(200).json({});
  }
);

/**
 * @route PUT /api/jobApplication
 * @desc UPDATE job application by id
 * @access Public
 */

router.put(
  '/jobApplication',
  setUserId.setUserId,
  jobApplicationController.updateJobApplicationById,
  (req, res) => {
    res.status(200).json({});
  }
);

/**
 * @route DELETE  /api/jobApplication
 * @desc DELETE job application by id
 * @access Public
 */

router.delete(
  '/jobApplication',
  setUserId.setUserId,
  jobApplicationController.deleteJobApplicationById,
  (req, res) => {
    res.status(200).json({});
  }
);

module.exports = router;
