import React from "react";
import { shallow, mount } from "enzyme";
import ChannelHeader from "../ChannelHeader";

describe("<ChannelHeader />", () => {

  it("should render exactly 1 component", () => {
    const channelHeader = shallow(<ChannelHeader />);
    expect(channelHeader.children.length).toBe(1);
  });

  it("should render heading", () => {
    const heading = "My Custom Heading";
    const channelHeader = shallow(<ChannelHeader heading={heading} />);
    expect(channelHeader.find('h3').text()).toBe(heading);
  });

  it("should render multiple actions", () => {
    const actions = [
      <span><a href="/">Some Link</a></span>,
      <button>Some Button</button>,
      <i className="some-icon"></i>
    ];
    const channelHeader = mount(<ChannelHeader actions={actions} />);
    expect(channelHeader.find('.level-right .level-item').length).toBe(actions.length);
  });

});
