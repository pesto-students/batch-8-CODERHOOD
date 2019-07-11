import React from "react";
import { shallow } from "enzyme";
import Button from "../Button";

describe("<Button />", () => {
  it("renders 1 sub-component", () => {
    const btn = shallow(<Button />);
    expect(btn.children.length).toBe(1);
  });

  it("should render anchor tag button when tag prop is passed", () => {
    const btn = shallow(<Button tag="a" />);
    expect(btn.type()).toBe('a');
  })

  it("should not render anchor tag button when tag prop is missing", () => {
    const btn = shallow(<Button />);
    expect(btn.type()).toBe('a');
  })

  it("should render anchor tag button when tag prop is passed", () => {
    const btn = shallow(<Button tag="button" />);
    expect(btn.type()).toBe('a');
  })

  it("should render anchor tag when invalid tag prop is passed", () => {
    const label = 'My Button Name';
    const btn = shallow(<Button>{label}</Button>);
    expect(btn.text()).toBe(label);
  })

  it("should always have 'button' class", () => {
    let btn = shallow(<Button />);
    expect(btn.hasClass('button')).toBe(true);

    btn = shallow(<Button primary />);
    expect(btn.hasClass('button')).toBe(true);

    btn = shallow(<Button small />);
    expect(btn.hasClass('button')).toBe(true);

    btn = shallow(<Button rounded />);
    expect(btn.hasClass('button')).toBe(true);

    btn = shallow(<Button hovered rounded small primary />);
    expect(btn.hasClass('button')).toBe(true);
  })

  it("should have class for each type of prop", () => {
    const button = <Button 
      type = "danger"
      bwShade = "dark"
      size = "large"
      fullwidth
      outlined
      inverted
      rounded
      hovered
      focussed
      active
      loading
    >Label</Button>

    const btn = shallow(button);
    
    expect(btn.hasClass('is-danger')).toBe(true);
    expect(btn.hasClass('is-dark')).toBe(true);
    expect(btn.hasClass('is-large')).toBe(true);
    expect(btn.hasClass('is-fullwidth')).toBe(true);
    expect(btn.hasClass('is-outlined')).toBe(true);
    expect(btn.hasClass('is-inverted')).toBe(true);
    expect(btn.hasClass('is-rounded')).toBe(true);
    expect(btn.hasClass('is-hovered')).toBe(true);
    expect(btn.hasClass('is-focussed')).toBe(true);
    expect(btn.hasClass('is-active')).toBe(true);
    expect(btn.hasClass('is-loading')).toBe(true);

  })

});
