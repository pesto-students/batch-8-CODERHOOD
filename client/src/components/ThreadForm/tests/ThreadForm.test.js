import React from "react";
import { shallow, mount } from "enzyme";
import ThreadForm from "../ThreadForm";

describe("<ThreadForm />", () => {

  it("should render exactly 1 component", () => {
    const threadForm = shallow(<ThreadForm />);
    expect(threadForm.children.length).toBe(1);
  });

  it("should add props to textarea with textAreaProps", () => {
    const textAreaProps = {rows : 3};
    const threadForm = shallow(<ThreadForm textAreaProps={textAreaProps} />);
    expect(threadForm.find('textarea').prop('rows')).toBe(textAreaProps.rows);
  });

  it("should add props to button", () => {
    const threadForm = mount(<ThreadForm active />);
    expect(threadForm.find('.button').hasClass('is-active')).toBe(true);
  });

});
