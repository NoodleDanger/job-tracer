import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import JobApplicationList from './components/JobApplicationList';
import store from './store';
import { loadJobApplications, addJobApplication } from './actions/actions';
import CreateJobApplicationModal from './components/modals/CreateJobApplicationModal';
import './main.css';

const mapStateToProps = (state) => ({
  jobApplications: state.jobApplications.jobApplications,
});

const App = (props) => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    store.dispatch(loadJobApplications());
  }, []);

  return (
    <div className="container">
      <div id="main-logo-container">
        <img src="http://localhost:3000/assets/main-logo.png"></img>
      </div>
      <div id="btn-add-container">
      <button
        className="btn btn-add"
        type="button"
        onClick={() => setShow(true)}
      >
        Create
      </button></div>
      <CreateJobApplicationModal
        onClose={() => setShow(false)}
        show={show}
        addJobApplication={addJobApplication}
      />
      <JobApplicationList jobApplications={props.jobApplications} />
      <div id="dangernoodle-logo"><img src="http://localhost:3000/assets/dangernoodle-labs_logo.png" width="300px"></img></div>
    </div>
  );
};

export default connect(mapStateToProps, null)(App);
