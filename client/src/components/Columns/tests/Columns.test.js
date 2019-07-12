import React from "react";
import { shallow } from "enzyme";
import Columns from "../Columns";

describe("<Columns />", () => {
  it("should render exactly 1 component", () => {
    const sidebar = shallow(<Columns />);
    expect(sidebar.children.length).toBe(1);
  });

  it("should be able to render children", () => {
    const child = <div className="column">Dummy Column</div>;
    const sidebar = shallow(<Columns>{child}</Columns>);
    expect(sidebar.contains(child)).toBe(true);
  });
});
