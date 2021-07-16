/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/actions';

const mapDispatchToProps = (dispatch) => ({
  addJobApplication: (newJobApplication) =>
    dispatch(actions.addJobApplication(newJobApplication)),
  loadJobApplications: () => dispatch(actions.loadJobApplications),
});

class CreateJobApplicationModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      details: {
        companyName: '',
        jobTitle: '',
        salary: -1,
        postSource: '',
        description: '',
        statusName: 'pending',
        notes: '',
        statusDate: new Date(),
        favorite: false,
      },
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.formFieldChangeHandler = this.formFieldChangeHandler.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.addJobApplication(this.state.details);
    this.props.loadJobApplications();
    this.setState({
      details: {
        companyName: '',
        jobTitle: '',
        salary: -1,
        postSource: '',
        description: '',
        statusName: 'pending',
        notes: '',
        statusDate: new Date(),
        favorite: false,
      },
    });
    this.props.onClose();
  }

  formFieldChangeHandler(event) {
    const { details } = this.state;
    details[event.target.name] = event.target.value;
    this.setState({ details });
  }

  render() {
    if (!this.props.show) {
      return null;
    }

    return (
      <div className="modal list">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title">Create Job Application</h4>
          </div>
          <div className="modal-body">
            <form>
              <div className="modal-label">
                <label>
                  Favorite?:
                  <select className="computer-field"
                    defaultValue={this.state.details.favorite}
                    name="favorite"
                    onChange={this.formFieldChangeHandler}>
                    <option value="false">No</option>
                    <option value="true">Yes</option>
                  </select>
                </label>
                </div><br></br>
              <div className="modal-label">
                <label>
                  Company Name:
                  <input className="computer-field"
                    type="text"
                    name="companyName"
                    value={this.state.details.companyName}
                    onChange={this.formFieldChangeHandler}
                  />
                </label>
                </div><br></br>
              <div className="modal-label">
                <label>
                  Job Title:
                  <input className="computer-field"
                    type="text"
                    name="jobTitle"
                    value={this.state.details.jobTitle}
                    onChange={this.formFieldChangeHandler}
                  />
                </label>
                </div><br></br>
              <div className="modal-label">
                <label>
                  Salary:
                  <input className="computer-field"
                    type="text"
                    name="salary"
                    value={this.state.details.salary}
                    onChange={this.formFieldChangeHandler}
                  />
                </label>
              </div><br></br>
              <div className="modal-label">
                <label>
                  Application Status Date:
                  <input className="computer-field"
                    type="date"
                    name="statusDate"
                    value={this.state.details.statusDate}
                    onChange={this.formFieldChangeHandler}
                  />
                </label>
                </div><br></br>
              <div className="modal-label">
                <label>
                  Application Status:
                  <select className="computer-field"
                    defaultValue={this.state.details.statusName}
                    name="statusName"
                    onChange={this.formFieldChangeHandler}
                  >
                    <option value="pending">Pending</option>
                    <option value="applied">Applied</option>
                    <option value="interviewed">Interviewed</option>
                    <option value="offer_received">Offer Received</option>
                    <option value="rejected">Rejected</option>
                    <option value="dropped">Dropped</option>
                    <option value="accepted">Accepted</option>
                  </select>
                </label>
              </div><br></br>
              <div className="modal-label">
              <label>
                Post Source:
                <select className="computer-field"
                  defaultValue={this.state.details.postSource}
                  name="postSource"
                  onChange={this.formFieldChangeHandler}>
                  <option value="friend">Friend</option>
                  <option value="internet">Internet</option>
                </select>
              </label>
              </div><br></br>
              <div className="modal-label">
                <label>
                  Description:
                  <textarea className="computer-field"
                    name="description"
                    value={this.state.details.description}
                    onChange={this.formFieldChangeHandler}
                  />
                </label>
              </div><br></br>
              <label>
                Notes:
                <textarea className="computer-field"
                  name="notes"
                  value={this.state.details.notes}
                  onChange={this.formFieldChangeHandler}
                />
              </label><br></br>
              <button
                className="btn btn-add"
                type="submit"
                onClick={this.handleSubmit}
              >
                Add Job
              </button>
            </form>
          </div>
          <div className="modal-footer">
            <button
              className="btn btn-close"
              type="button"
              onClick={this.props.onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, mapDispatchToProps)(CreateJobApplicationModal);
