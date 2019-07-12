import React from 'react';

const ThreadMessage = ({
  threadId,
  userPic, 
  userName,
  timeSince,
  message,
  messageActions,
  ...props
}) => {
  return (
    <article className="media">
      <figure className="media-left">
        <p className="image is-64x64">
          <img src={userPic} alt={userName} />
        </p>
      </figure>
      <div className="media-content">
        <div className="content">
          <p>
            <strong>{userName}</strong> <small>{timeSince}</small>
            <br /> {message}
          </p>
        </div>
        <nav className="level is-mobile">
          <div className="level-left">
            {messageActions.map(action => <span className="level-item">{action}</span>)}
          </div>
        </nav>
      </div>
    </article>
  )
}

export default ThreadMessage;