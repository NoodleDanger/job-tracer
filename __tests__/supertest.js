const request = require('supertest');

const server = 'http://localhost:3000';

/**
 * Read the docs! https://www.npmjs.com/package/supertest
 */

// API testing suite
describe('Test API connections', () => {
  // Test #1 - Test whether database is serving up all applications.
  describe('Endpoint: /api/', () => {
    describe('GET all job applications', () => {
      it('responds with 200 status and application/json content type', () => request(server)
        .get('/api/')
        .expect('Content-Type', /application\/json/)
        .expect(200));
    });
  });

  // Test #2 - Test whether database is accepting our outgoing application POST requests.
  describe('Endpoint: /api/jobApplications', () => {
    describe('POST a new job application', () => {

      /* Stash everything you need for a postgresQL query in a dummy req object, e.g.:
        INSERT INTO applications (user_id, company_name, job_title, salary, description,
          post_source, status_name, status_date, notes, favorite) VALUES ('1', 'Supertest',
          'Dummy Role', '6969', 'Mocks stuff up', 'Ask Jeeves', 'Rejected', '1/18/1999', 'Cool notes', 'false'); */

      const jobApplicationValues = {
        userId: "1",
        companyName: "FAANG",
        jobTitle: "Engineer",
        salary: "200000",
        description: "It's a living",
        postSource: "Indeed",
        statusName: "Pending",
        statusDate: "2021-07-14",
        notes: "Notes",
        favorite: "true",
      };

      it('responds with 200 status and application/json content type', () => request(server)
        .post('/api/jobApplication/')
        .send(jobApplicationValues)
        .expect('Content-Type', /application\/json/)
        .expect(200));
    });

    // Test #3 - Test whether database is accepting our outgoing PUT update requests.
    describe('PUT an update into a job application', () => {

      const jobApplicationValues = {
        id: "2",
        userId: "1",
        companyName: "Yahoo",
        jobTitle: "Grand Poobah",
        salary: "300000",
        description: "Does stuff",
        postSource: "LinkedIn",
        statusName: "Rejected",
        statusDate: "1999-01-18",
        notes: "Cool notes",
        favorite: "true",
      };

      it('responds with 200 status and application/json content type', () => request(server)
        .put('/api/jobApplication')
        .send(jobApplicationValues)
        .expect('Content-Type', /application\/json/)
        .expect(200));
    });

    // Test #4 - Test whether database is accepting our outgoing DELETE requests.
    describe('DELETE a job application', () => {

      const jobApplicationValues = {
        userId: "1",
        companyName: "Yahoo",
        jobTitle: "Grand Poobah",
        salary: "300000",
        description: "Does stuff",
        postSource: "LinkedIn",
        statusName: "Rejected",
        statusDate: "1999-01-18",
        notes: "Cool notes",
        favorite: "true",
      };

      it('responds with 200 status and application/json content type', () => request(server)
        .post('/api/jobApplication/')
        .send(jobApplicationValues)
        .delete('/api/jobApplication')
        .expect(200));
    });

  });
});
