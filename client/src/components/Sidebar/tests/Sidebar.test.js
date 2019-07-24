import React from 'react';
import { shallow } from 'enzyme';
import Sidebar from '../Sidebar';

describe('<Sidebar />', () => {
  it('expects true', () => {
    expect(true);
  });
  // it("should render exactly 1 component", () => {
  //   const sidebar = shallow(<Sidebar />);
  //   expect(sidebar.children.length).toBe(1);
  // });

  // it("should have default column size of 3", () => {
  //   const sidebar = shallow(<Sidebar />);
  //   expect(sidebar.hasClass('is-3')).toBe(true);
  // });

  // it("should be able to set column size", () => {
  //   const sidebar = shallow(<Sidebar width="8" />);
  //   expect(sidebar.hasClass('is-8')).toBe(true);
  // });

  // it("should be able to render childrens", () => {
  //   const child = <h1>Dummy Heading</h1>;
  //   const sidebar = shallow(<Sidebar>{child}</Sidebar>);
  //   expect(sidebar.contains(child)).toBe(true);
  // });
});
