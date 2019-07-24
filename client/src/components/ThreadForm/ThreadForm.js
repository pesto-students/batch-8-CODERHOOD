import React from 'react';
import Button from '../Button/Button';

const ThreadForm = ({ textAreaProps, isDisabled, ...props }) => {
  return (
    <article
      className="media"
      style={{ padding: '1%', paddingBottom: '0', boxSizing: 'border-box' }}
    >
      <div className="media-content">
        <div className="field">
          <p className="control">
            <textarea
              style={{ border: '1px solid gray' }}
              rows="1"
              className="textarea"
              placeholder="Type a message"
              {...textAreaProps}
              disabled={isDisabled}
            />
          </p>
        </div>
      </div>
      <div
        className="media-right"
        style={{ position: 'relative', right: '1%' }}
      >
        <Button type="primary is-medium" outlined {...props}>
          Send
        </Button>
      </div>
    </article>
  );
};

export default ThreadForm;
