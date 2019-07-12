import React from 'react';
import Button from '../Button/Button';

const ThreadForm = ({textAreaProps, ...props}) => {
  return (
    <article className="media">
      <div className="media-content">
        <div className="field">
          <p className="control">
            <textarea 
              rows="1" 
              className="textarea"
              placeholder="Add a comment..."
              {...textAreaProps}
            ></textarea>
          </p>
        </div>
      </div>
      <div className="media-right">
        <Button type="primary" outlined {...props}>Send</Button>
      </div>
    </article>
  )
}

export default ThreadForm;