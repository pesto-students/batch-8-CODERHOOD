import React from "react";
import { shallow } from "enzyme";
import ThreadMessage from "../ThreadMessage";

describe("<ThreadMessage />", () => {

  it("should render exactly 1 component", () => {
    const threadForm = shallow(<ThreadMessage />);
    expect(threadForm.children.length).toBe(1);
  });

});
