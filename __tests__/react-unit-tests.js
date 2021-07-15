/**
 * ************************************
 *
 * @module react-unit-tests.js
 * @author Ted Craig
 * @date 2021-07-14
 * @description unit testing for React components
 *
 * ************************************
 */

// Import React from 'react' module in order to instanciate React components for testing.
import React from 'react';

// Import functionality from Enzyme.
// Enzyme is a wrapper around React test utilities which makes it easier to
// shallow render and traverse the shallow rendered tree.
import { configure, shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import toJson from 'enzyme-to-json';

// Import React components to be tested.
import JobApplication from '../client/components/JobApplication.js';
import JobApplicationList from '../client/components/JobApplicationList.js';

// Newer Enzyme versions require an adapter to a particular version of React.
configure({ adapter: new Adapter() });

// ==================================================
//  REACT UNIT TESTS
// ==================================================

describe('React unit tests', () => {
  describe('JobApplicationList', () => {
    let wrapper;

    const jobApplicationsArray = [
      {
        company_name: 'Codesmith',
        job_title: 'Fellow',
        salary: 0,
        description: 'Become a superhero for some resident plebes',
        post_source: 'Anisha bot',
        status_name: 'Submitted',
        status_date: new Date(),
        notes: '',
        favorite: true,
      },
    ];

    const props = {
      id: 10001,
      jobApplications: jobApplicationsArray,
      deleteJobApplication: deleteJobApplication,
    };

    // create an emulated function that will allow us to spy on its invocation and other stats
    const mock1 = jest.fn();

    // assign the emulated function to this stand-in for a Redux action-creator method
    const deleteJobApplication = mock1;

    beforeAll(() => {
      wrapper = shallow(<JobApplicationList {...props} />);
    });

      // 1. It should also contain a div with two buttons
      it('should contain a h2 tag and an inner div', () => {
        let outterContainer = wrapper.find('h2');
        expect(outterContainer.find('div')).toHaveLength(1);
      });

    // 2. It should also contain a div with two buttons
    it('should contain a div with two buttons', () => {
      let outterContainer = wrapper.find('div');
      expect(outterContainer.find('div').find('button')).toHaveLength(2);
      // expect(wrapper.find('div').find({className: 'flex'}).find('button').find('.addCard').prop('onClick')());
      // expect(wrapper.find('div').find({className: 'flex'}).find('button').find('.deleteCard').prop('onClick')());
    });

    // 3. The functions passed down should be invoked on click
    it('The functions passed down should be invoked on click', () => {
      wrapper.find('button').forEach((node) => node.simulate('click'));
      expect(mock1.mock.calls).toHaveLength(2);

      // expect(wrapper.find('div').find({className: 'flex'}).find('.addCard').simulate('click'));
      // expect(addCard).toBeCalled();
      // expect(wrapper.find('div').find({className: 'flex'}).find('.deleteCard').simulate('click'));
      // expect(deleteCard).toBeCalled();
    });

    // 4. MarketDisplay should render a div with a class of `marketBox`, and the
    // interior div wrapping the two buttons should have a class of `flex`
    it('renders a parent div with a class of `marketBox`', () => {
      expect(wrapper.find('div').at(0).hasClass('marketBox')).toBe(true);
      // expect(wrapper.find('div').find({className: 'marketBox'}).find('div').find({className: 'flex'})).toHaveLength(1);
    });

    it('renders an interior div with class of `flex`', () => {
      expect(wrapper.find('div').at(1).hasClass('flex')).toBe(true);
    });

    // it('MarketDisplay renders a div with a class of `marketBox`, and an interior div with a class of `flex`', () => {
    //   expect(wrapper.find('div').find({className: 'marketBox'})).toHaveLength(1);
    //   expect(wrapper.find('div').find({className: 'marketBox'}).find('div').find({className: 'flex'})).toHaveLength(1);
    // });
  });

  describe('MarketsDisplay', () => {
    // TODO: Test the following:
    //   1. A MarketsDisplay should have an h4 element to display the 'Markets'
    //   title
    //   2. A single MarketDisplay is rendered for each market in the
    //   marketList prop
    //   3. The percentage prop should be a string calculated to two decimals.
    //   Test for zero, a whole number, and a fractional value. (Right now this
    //   is implemented incorrectly, so follow TDD here)
  });
});
