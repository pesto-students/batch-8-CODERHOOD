import { shallow } from "enzyme";
import Header from "../Header";
import React from "react";
describe("<Header />", () => {
  it("renders 1 sub-component", () => {
    const headerWrapper = shallow(<Header />);
    expect(headerWrapper.children.length).toBe(1);
  });

  it("renders 2 columns", () => {
    const headerWrapper = shallow(<Header />);
    expect(headerWrapper.find(".column").length).toBe(2);
  });

  it("renders 2 clickable icons", () => {
    const headerWrapper = shallow(<Header />);
    expect(headerWrapper.find(".clickable-icon").length).toBe(2);
  });

  it("renders 1 Search Field", () => {
    const headerWrapper = shallow(<Header />);
    expect(headerWrapper.find(".search-container").length).toBe(1);
    expect(
      headerWrapper.find(".search-container").find("InputField").length
    ).toBe(1);
  });
});
