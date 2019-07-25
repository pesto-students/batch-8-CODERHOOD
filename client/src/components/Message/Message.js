import React from 'react';

const Message = ({
  messageId,
  userPic,
  username,
  timeSince,
  message,
  messageActions = [],
  ...props
}) => {
  return (
    <article
      className="media"
      style={{ paddingTop: '0.4em', paddingBottom: '0.4em' }}
    >
      <figure className="media-left">
        <p className="image is-32x32" style={{ paddingTop: '.2em' }}>
          <img src={userPic} alt={username} />
        </p>
      </figure>
      <div className="media-content">
        <div className="content" style={{ minHeight: '2em' }}>
          <div>
            <strong>{username}</strong> <small>{timeSince}</small>
            <br /> {message}
          </div>
        </div>
        <nav className="level is-mobile">
          <div className="level-left">
            {messageActions.map((action) => (
              <span className="level-item">{action}</span>
            ))}
          </div>
        </nav>
      </div>
    </article>
  );
};

export default Message;
