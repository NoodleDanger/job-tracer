/* eslint-disable react/no-array-index-key */
import React from 'react';
import { connect } from 'react-redux';
import JobApplication from './JobApplication';
import * as actions from '../actions/actions';

const mapDispatchToProps = (dispatch) => ({
  deleteJobApplication: (id) => dispatch(actions.deleteJobApplication(id)),
});

function JobApplicationList({ jobApplications, deleteJobApplication }) {
  return (
    <div>
      <h2 className="heading">Application List</h2>
      <div className="list">
        {jobApplications &&
          jobApplications.map((application, index) => (
            <JobApplication
              key={`job-${index}`}
              id={application.id}
              companyName={application.companyName}
              jobTitle={application.jobTitle}
              status={application.statusName}
              deleteJobApplication={deleteJobApplication}
            />
          ))}
      </div>
    </div>
  );
}

export default connect(null, mapDispatchToProps)(JobApplicationList);
