import React from "react";
import Button from "../Button/Button";

const ThreadForm = ({ textAreaProps, isDisabled, ...props }) => {
  return (
    <article className="media" style={{ padding: "1%" }}>
      <div className="media-content">
        <div className="field">
          <p className="control">
            <textarea
              rows="1"
              className="textarea"
              placeholder="Message"
              {...textAreaProps}
              disabled={isDisabled}
            />
          </p>
        </div>
      </div>
      <div className="media-right">
        <Button type="primary is-medium" outlined {...props}>
          Send
        </Button>
      </div>
    </article>
  );
};

export default ThreadForm;
