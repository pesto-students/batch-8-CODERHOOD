import React from "react";
import { shallow } from "enzyme";
import SidebarList from "../SidebarList";

describe("<SidebarList />", () => {
  it("should render exactly 1 component", () => {
    const sidebar = shallow(<SidebarList />);
    expect(sidebar.children.length).toBe(1);
  });

  it("should contain heading provided in props", () => {
    const heading = "My Custom Heading";
    const sidebar = shallow(<SidebarList heading={heading} />);
    expect(sidebar.find('h4').contains(heading)).toBe(true);
  });

  it("should contain heading provided in props", () => {
    const heading = "My Custom Heading";
    const sidebar = shallow(<SidebarList heading={heading} />);
    expect(sidebar.find('h4').contains(heading)).toBe(true);
  });

  it("should contain action provided in props", () => {
    const action = "<a onClick='doThis'>Click Me</a>";
    const sidebar = shallow(<SidebarList action={action} />);
    expect(sidebar.find('h4').contains(action)).toBe(true);
  });

  it("should be able to accept extra props by the list", () => {
    const extra = "onClick='doThis()'";
    const sidebar = shallow(<SidebarList extra={extra} />);
    expect(sidebar.find('ul').prop('extra')).toBe(extra);
  });

  it("should have same number of list elements", () => {
    const list = ["Salman", "Shahrukh", "Hritik", "Amir"];
    const sidebar = shallow(<SidebarList list={list} />);
    expect(sidebar.find('ul').children().length).toBe(4);
  });

});
