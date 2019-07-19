import React from "react";
import { shallow } from "enzyme";
import Message from "../Message";

describe("<Message />", () => {

  it("should render exactly 1 component", () => {
    const threadForm = shallow(<Message />);
    expect(threadForm.children.length).toBe(1);
  });

});
