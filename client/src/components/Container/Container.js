import React from "react";
import "./Container.css";

const Container = props => {
  return (
    <section
      className="section"
      style={{ paddingTop: "0em", paddingLeft: "0em", paddingRight: "0em" }}
    >
      <div className="container" style={{ maxWidth: "100%" }}>
        {props.children}
      </div>
    </section>
  );
};

export default Container;
