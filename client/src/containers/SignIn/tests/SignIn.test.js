import React from "react";
import { mount } from "enzyme";
import SignIn from "../SignIn";

describe("<SignIn />", () => {
  it("renders 1 sub-component", () => {
    const signIn = mount(<SignIn />);
    expect(signIn.children.length).toBe(1);
  });
  
  it("has email field", () => {
    const signIn = mount(<SignIn />);
    expect(signIn.find('input[type="email"]').length).toEqual(1);
  })

  it("has password field", () => {
    const signIn = mount(<SignIn />);
    expect(signIn.find('input[type="password"]').length).toEqual(1);
  })

  it("has submit button", () => {
    const signIn = mount(<SignIn />);
    expect(signIn.find('button').length).toEqual(1);
  })
});
