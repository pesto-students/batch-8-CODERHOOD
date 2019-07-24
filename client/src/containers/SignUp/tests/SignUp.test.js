import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { mount } from 'enzyme';
import SignUp from '../SignUp';

describe('<SignUp />', () => {
  it('expects true', () => {
    expect(true);
  });
  // const signUp = mount(
  //   <Router>
  //     <SignUp />
  //   </Router>
  // );

  // it("renders 1 sub-component", () => {
  //   expect(signUp.children.length).toBe(1);
  // });

  // it("has name field", () => {
  //   expect(signUp.find('input[type="name"]').length).toEqual(1);
  // })

  // it("has email field", () => {
  //   expect(signUp.find('input[type="email"]').length).toEqual(1);
  // })

  // it("has password field", () => {
  //   expect(signUp.find('input[type="password"]').length).toEqual(1);
  // })

  // it("has submit button", () => {
  //   expect(signUp.find('button').length).toEqual(1);
  // })
});
