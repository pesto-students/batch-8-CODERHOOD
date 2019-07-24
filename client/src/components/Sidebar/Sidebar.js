import React from "react";
import cn from "classnames";

const Sidebar = ({ width = 2, ...props }) => {
  const className = cn("column", width && `is-${width}`);
  return (
    <div
      className={className}
      style={{
        background: "#3e103f",
        minHeight: "100%",
        paddingTop: "30px",
        paddingBottom: "0px"
      }}
      {...props}
    >
      {props.children}
    </div>
  );
};

export default Sidebar;
