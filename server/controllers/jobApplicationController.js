// import the jobApp Model
const db = require('../models/jobApplicationModels');

const jobApplicationController = {};

// get all jobApplications

jobApplicationController.getJobApplications = (req, res, next) => {
  // create query string
  const queryStr = `
    SELECT * FROM applications
    `;

  // call db query passing in query string

  db.query(queryStr)
    .then((data) => {
      // add the data to res.locals
      res.locals.jobApplications = data.rows;
      return next();
    })
    .catch((err) => {
      return next({
        log: 'Express error handler caught error in jobApplicationController.getJobApplications',
        status: 400,
        message: { err },
      });
    });
};

// create new job application

jobApplicationController.createJobApplication = (req, res, next) => {
  // get values from the req body
  const {
    userId,
    companyName,
    jobTitle,
    salary,
    description,
    postSource,
    statusName,
    statusDate,
    notes,
    favorite,
  } = req.body;

  // put values in to a new array

  const jobApplicationValues = [
    userId,
    companyName,
    jobTitle,
    salary,
    description,
    postSource,
    statusName,
    statusDate,
    notes,
    favorite,
  ];

  // make query string

  const queryStr = `
    INSERT INTO 
      applications 
        (user_id, company_name,job_title,salary,description,post_source,status_name, status_date, notes, favorite)
      VALUES 
        ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`;

  // call db query passing in query string and values array

  db.query(queryStr, jobApplicationValues)
    .then(() => {
      return next();
    })
    .catch((err) => {
      return next({
        log: 'Express error handler caught error in jobApplicationController.createJobApplication',
        status: 400,
        message: { err },
      });
    });
};

// update job application

jobApplicationController.updateJobApplicationById = (req, res, next) => {
  // get id from req query

  // get values from req body

  const {
    userId,
    companyName,
    jobTitle,
    salary,
    description,
    postSource,
    statusName,
    statusDate,
    notes,
    favorite,
    id
  } = req.body;

  // add job application id as last array element

  const updatedJobApplicationValues = [
    userId,
    companyName,
    jobTitle,
    salary,
    description,
    postSource,
    statusName,
    statusDate,
    notes,
    favorite,
    id
  ];

  // make query string

  const queryStr = `
    UPDATE
      applications
    SET 
      user_id = $1, company_name = $2,job_title = $3,salary = $4, description = $5,post_source = $6, status_name = $7, status_date = $8, notes = $9,favorite = $10
    WHERE 
      _id = $11  
    `;

  //  query db

  db.query(queryStr, updatedJobApplicationValues)
    .then(() => {
      return next();
    })
    .catch((err) => {
      return next({
        log: 'Express error handler caught error in jobApplicationController.updateJobApplicationById',
        status: 400,
        message: { err },
      });
    });
};

// delete job application

jobApplicationController.deleteJobApplicationById = (req, res, next) => {
  // get id from req query
  const { id } = req.query;

  console.log(id);
  // make query string

  const queryStr = `
    DELETE FROM 
      applications
    WHERE 
      _id = $1`;

  // query db

  db.query(queryStr, [id])
    .then(() => {
      return next();
    })
    .catch((err) => {
      return next({
        log: 'Express error handler caught error in jobApplicationController.deleteJobApplication',
        status: 400,
        message: { err },
      });
    });
};

module.exports = jobApplicationController;
