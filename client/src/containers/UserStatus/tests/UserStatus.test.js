import React from "react";
import { shallow } from "enzyme";
import UserStatus from "../UserStatus";
import * as AppContext from "../../App/AppContext";

describe("<UserStatus />", () => {
  it("renders 1 button", () => {
    jest
      .spyOn(AppContext, "useAppContext")
      .mockImplementation(() => ({ loginStatus: true }));
    const wrapper = shallow(<UserStatus />);
    expect(wrapper.find("button").length).toBe(1);
  });
});
