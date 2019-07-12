import React from "react";
import { shallow } from "enzyme";
import ThreadMessage from "../ThreadMessage";

describe("<ThreadMessage />", () => {

  it("should render exactly 1 component", () => {
    const threadForm = shallow(<ThreadMessage />);
    expect(threadForm.children.length).toBe(1);
  });

  it("should contain the message set", () => {
    const threadForm = shallow(<ThreadMessage textAreaProps={textAreaProps} />);
    expect(threadForm.find('textarea').prop('rows')).toBe(textAreaProps.rows);
  });

  it("should add props to button", () => {
    const props = { active: true };
    const threadForm = mount(<ThreadMessage active />);
    expect(threadForm.find('.button').hasClass('is-active')).toBe(true);
  });

});
