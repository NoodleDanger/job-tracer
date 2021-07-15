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
      describe ('LOAD_JOB_APPLICATIONS',()=>{
        
        const action = {
          type: 'LOAD_JOB_APPLICATIONS',
          payload: [{
            id: "test",
            companyName:"Facebook",
            jobTitle:"King Doggy",
            salary:99900000,
            postSource:"",
            description:"This is a description for Facebook",
            statusName:"kickingass",
            notes:"thefacebook.com, as it's known",
            statusDate:"2021-07-14",
            favorite:"true"},
            {
              id: "test2",
              companyName:"Google",
              jobTitle:"CEO",
              salary:99900000,
              postSource:"",
              description:"This is a description for Google",
              statusName:"kickingass",
              notes:"Google Bordello",
              statusDate:"2021-07-14",
              favorite:"false"}]
        }
        // it('populates the job applications array with payload', ()=>{
        //   const {jobApplications} = subject(state,action)
        //   expect
        // })

      })
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
        it('returns a state object not strictly equal to the original', () => {
          const newState = Object.assign({}, subject(state, action));
          expect(newState).not.toBe(state);
        });
        it('includes a jobApplications not strictly equal to the original', () => {
          const { jobApplications } = subject(state, action);
          expect(jobApplications).not.toBe(state.jobApplications);
        });
      })

      describe('EDIT_JOB_APPLICATION', ()=>{
        beforeEach(()=>
        state={jobApplications:[{
          id: "test",
          companyName:"Facebook",
          jobTitle:"King Doggy",
          salary:99900000,
          postSource:"",
          description:"This is a description for Facebook",
          statusName:"kickingass",
          notes:"thefacebook.com, as it's known",
          statusDate:"2021-07-14",
          favorite:"true"}]});

          const action = {
          type: 'EDIT_JOB_APPLICATION',
          payload: {
            id: "test",
            companyName:"YouChangedMe",
            jobTitle:"King Doggy",
            salary:99900000,
            postSource:"",
            description:"This is a description for Facebook",
            statusName:"kickingass",
            notes:"thefacebook.com, as it's known",
            statusDate:"2021-07-14",
            favorite:"true"},
          }

          it('changes an application info to new application info', ()=>{
            const {jobApplications} = subject(state,action);
            expect (jobApplications[0]).toEqual(action.payload)
        });

          it('does not alter the length of jobApplications array', ()=>{
            const {jobApplications} = subject(state,action);
            expect (jobApplications.length).toEqual(state.jobApplications.length)
          });
          it('returns a state object not strictly equal to the original', () => {
            const newState = Object.assign({}, subject(state, action));
            expect(newState).not.toBe(state);
          });
          it('includes a jobApplications not strictly equal to the original', () => {
            const { jobApplications } = subject(state, action);
            expect(jobApplications).not.toBe(state.jobApplications);
          });
        })

        describe('DELETE_JOB_APPLICATION', ()=>{
          beforeEach(()=>
          state={jobApplications:[{
            id: "test",
            companyName:"Facebook",
            jobTitle:"King Doggy",
            salary:99900000,
            postSource:"",
            description:"This is a description for Facebook",
            statusName:"kickingass",
            notes:"thefacebook.com, as it's known",
            statusDate:"2021-07-14",
            favorite:"true"},
            {
              id: "test2",
              companyName:"Google",
              jobTitle:"CEO",
              salary:99900000,
              postSource:"",
              description:"This is a description for Google",
              statusName:"kickingass",
              notes:"Google Bordello",
              statusDate:"2021-07-14",
              favorite:"false"}
          
          
          ]});
            
            const action = {
              type: 'DELETE_JOB_APPLICATION',
              payload: {id:"test2"}
            }
            it('it decreases jobApplications array length by 1', ()=>{
              const {jobApplications} = subject(state,action);
            expect (jobApplications.length).toEqual(1)
            });

            it('deletes correct job application', ()=>{
              const {jobApplications} = subject(state,action);
              expect(jobApplications[0]).toEqual(state.jobApplications[0])

            }

          )
              
          })
})