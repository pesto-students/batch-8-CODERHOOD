import React from "react";
import { shallow, mount } from "enzyme";
import ThreadHeader from "../ThreadHeader";

describe("<ThreadHeader />", () => {

  it("should render exactly 1 component", () => {
    const threadHeader = shallow(<ThreadHeader />);
    expect(threadHeader.children.length).toBe(1);
  });

  it("should render heading", () => {
    const heading = "My Custom Heading";
    const threadHeader = shallow(<ThreadHeader heading={heading} />);
    expect(threadHeader.find('h3').text()).toBe(heading);
  });

  it("should render multiple actions", () => {
    const actions = [
      <span><a href="/">Some Link</a></span>,
      <button>Some Button</button>,
      <i className="some-icon"></i>
    ];
    const threadHeader = mount(<ThreadHeader actions={actions} />);
    expect(threadHeader.find('.level-right .level-item').length).toBe(actions.length);
  });

});
