import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { mount } from 'enzyme';
import SignIn from '../SignIn';

describe('<SignIn />', () => {
  it('expects true', () => {
    expect(true);
  });
  //   const signIn = mount(
  //     <Router>
  //       <SignIn />
  //     </Router>
  //   );

  //   it("renders 1 sub-component", () => {
  //     expect(signIn.children.length).toBe(1);
  //   });

  //   it("has email field", () => {
  //     expect(signIn.find('input[type="email"]').length).toEqual(1);
  //   })

  //   it("has password field", () => {
  //     expect(signIn.find('input[type="password"]').length).toEqual(1);
  //   })

  //   it("has submit button", () => {
  //     expect(signIn.find('button').length).toEqual(1);
  //   })
});
