import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

configure({ adapter: new Adapter() });

let wrapper;
beforeEach(() => {
    wrapper = shallow(<NavigationItems />);
});

describe('<NavigationItems />', () => {
    //describe is a method that take two arguments. The first one is a string to identify where
    //is the test located, the second one is the function we want to test.

    it('should render two <NavigationItem /> elements if not authenticated', () => {
        //as the function itself we call the method it(), which takes two arguments two.
        //The first one, a string where we describe what we expect to happen, the second the
        //function itself

        /* const wrapper = shallow(<NavigationItems />); */ // --> as long as we are using the beforeEach, we then of course no longer need it here
        //with the shallow() we take the component we want to test
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
        // with the expect() and all it utilities we define... well... what we expect. 
        // In the example: the wrapper, the component testing, might have a NavigationItem inside,
        // and might have it two times.
    });

    it('should render three <NavigationItem /> elements if authenticated', () => {
        /* const wrapper = shallow(<NavigationItems isAuthenticated/>); --> beforeEach takes it place */
        wrapper.setProps({ isAuthenticated: true }); // --> we need it cause we change the wrapper for this test
        expect(wrapper.find(NavigationItem)).toHaveLength(3);
    });

    it('should render three <NavigationItem /> elements if authenticated', () => {
        wrapper.setProps({ isAuthenticated: true });
        expect(wrapper.contains(<NavigationItem link='/logout'>Logout</NavigationItem>)).toEqual(true);
    });
});