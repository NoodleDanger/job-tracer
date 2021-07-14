import subject from '../client/reducers/jobApplicationsReducer.js'


describe('jobapplication reducer', () => {
    let state;
  
    beforeEach(() => {
      state = {jobApplications: []}
    //   state = {
    //     companyName: '',
    //       jobTitle: '',
    //       salary: '',
    //       postSource: '',
    //       description: '',
    //       statusName: '',
    //       notes: '',
    //       statusDate: '',
    //       favorite: false,
    //   };
    });
  
    describe('default state', () => {
      it('should return a default state when given an undefined input', () => {
        expect(subject(undefined, { type: undefined })).toEqual(state);
      });
    });
    describe('unrecognized action types', () => {
        it('should return the original without any duplication', () => {
          const action = { type: 'unknown' };
          expect(subject(state, action)).toBe(state);
        });
      });

      describe('ADD_JOB_APPLICATION', () => {
        const action = {
          type: 'ADD_JOB_APPLICATION',
          payload:  {   companyName:"Facebook",
          jobTitle:"King Doggy",
          salary:99900000,
          postSource:"",
          description:"This is a description for Facebook",
          statusName:"kickingass",
          notes:"thefacebook.com, as it's known",
          statusDate:"2021-07-14",
          favorite:"true"}
          
        };
        it('it add jobApplication', ()=>{
          const {jobApplications} = subject(state,action);
          expect (jobApplications[0]).toEqual({   companyName:"Facebook",
          jobTitle:"King Doggy",
          salary:99900000,
          postSource:"",
          description:"This is a description for Facebook",
          statusName:"kickingass",
          notes:"thefacebook.com, as it's known",
          statusDate:"2021-07-14",
          favorite:"true"})
        })
      })
})