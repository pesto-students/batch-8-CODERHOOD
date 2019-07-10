import React from "react";
import { shallow } from "enzyme";
import SignIn from "../SignIn";

describe("<SignIn />", () => {
  it("renders 1 sub-component", () => {
    const signIn = shallow(<SignIn />);
    expect(signIn.children.length).toBe(1);
  });
  
  it("has email field", () => {
    const signIn = shallow(<SignIn />);
    expect(signIn.find('.input.email').length).toEqual(1);
  })

  it("has password field", () => {
    const signIn = shallow(<SignIn />);
    expect(signIn.find('.input.password').length).toEqual(1);
  })

  it("has submit button", () => {
    const signIn = shallow(<SignIn />);
    expect(signIn.find('button').length).toEqual(1);
  })
});
