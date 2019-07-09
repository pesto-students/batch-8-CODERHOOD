import React from "react";
import { shallow } from "enzyme";
import App from "../App";

describe("<App />", () => {
  it("renders 1 subcomponent", () => {
    const app = shallow(<App />);
    expect(app.children.length).toBe(1);
  });
});
