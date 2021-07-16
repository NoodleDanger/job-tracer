// import the jobApp Model
const db = require('../models/jobApplicationModels');

const jobApplicationController = {};

// get all jobApplications

jobApplicationController.getJobApplications = (req, res, next) => {
  // create query string
  // get user_id from cookies
  console.log("USER ID: ", res.locals.userId);
  const userId = res.locals.userId; // hard coded, please change when users
  const queryStr = `
    SELECT * FROM applications
    WHERE auth_id=$1
    `;

  // call db query passing in query string

  db.query(queryStr, [userId])
    .then((data) => {
      // add the data to res.locals
      console.log(data.rows);
      const frontEndCompatability = data.rows.map((object) => {
        return {
          // eslint-disable-next-line no-underscore-dangle
          id: object._id,
          userId: object.auth_id,
          companyName: object.company_name,
          jobTitle: object.job_title,
          salary: object.salary,
          description: object.description,
          postSource: object.post_source,
          statusName: object.status_name,
          notes: object.notes,
          statusDate: object.status_date,
          favorite: object.favorite,
        };
      });
      console.log('array for front end: ', frontEndCompatability);
      res.locals.jobApplications = frontEndCompatability;
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
  console.log("in the hole")
  // get values from the req body
  const {
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
const userId = res.locals.userId;
  // put values in to a new array

  const jobApplicationValues = [
    companyName,
    jobTitle,
    salary,
    description,
    postSource,
    statusName,
    statusDate,
    notes,
    favorite,
    userId,
    1
  ];

  // make query string

  const queryStr = `INSERT INTO applications 
  (company_name,
    job_title,
    salary,
    description,
    post_source,
    status_name, 
    status_date, 
    notes, 
    favorite,
    auth_id,
    user_id) 
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`;

  // call db query passing in query string and values array

  db.query(queryStr, jobApplicationValues)
    .then((foobar) => {
      console.log('response from SQL server: ', foobar);
      return next();
    })
    .catch((err) => {
      console.log(err);
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

  const { id } = req.query;

  // get values from req body

  const {
    companyName,
    jobTitle,
    salary,
    description,
    postSource,
    notes,
    favorite,
  } = req.body;

  // add job application id as last array element

  const updatedJobApplicationValues = [
    companyName,
    jobTitle,
    salary,
    description,
    postSource,
    notes,
    favorite,
    id,
  ];

  // make query string

  const queryStr = `
    UPDATE
      applications
    SET 
      company_name = $1,job_title = $2,salary = $3, description = $4,post_source = $5,notes = $6,favorite = $7
    WHERE 
      id = $8  
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

  console.log('id of application to delete: ', id);
  // make query string

  const queryStr = `
    DELETE FROM 
      applications
    WHERE 
      _id = $1`;

  // query db

  db.query(queryStr, [id])
    .then(() => {
      console.log("we're here, we're queer, and we love chardonnay");
      return next();
    })
    .catch((err) => {
      console.log('jelly fish are super cool', err);
      return next({
        log: 'Express error handler caught error in jobApplicationController.deleteJobApplication',
        status: 400,
        message: { err },
      });
    });
};

module.exports = jobApplicationController;





