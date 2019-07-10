import React from "react";
import { shallow } from "enzyme";
import InputField from "../InputField";

describe("<InputField />", () => {
  it("renders 1 sub-component", () => {
    const signIn = shallow(<InputField />);
    expect(signIn.children.length).toBe(1);
  });

  it("input type attribute works properly", () => {
    const signIn = shallow(<InputField type="password" />);
    expect(signIn.find('input').prop('type')).toBe('password');
  })

  it("label works correctly", () => {
    const label = 'My Label';
    const signIn = shallow(<InputField label={label} />);
    expect(signIn.find('label').text()).toEqual(label);
  })

  it("input className is set correctly", () => {
    const className = 'my-custom-class';
    const signIn = shallow(<InputField className={className} />);
    expect(signIn.find('input').hasClass(className)).toBe(true);
  })

 });
