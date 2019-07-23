import React from "react";

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
      style={{ paddingTop: "10px", paddingBottom: "10px" }}
    >
      <figure className="media-left">
        <p className="image is-32x32" style={{ paddingTop: "5px" }}>
          <img src={userPic} alt={username} />
        </p>
      </figure>
      <div className="media-content">
        <div className="content" style={{ height: "10px" }}>
          <div>
            <strong>{username}</strong> <small>{timeSince}</small>
            <br /> {message}
          </div>
        </div>
        <nav className="level is-mobile">
          <div className="level-left">
            {messageActions.map(action => (
              <span className="level-item">{action}</span>
            ))}
          </div>
        </nav>
      </div>
    </article>
  );
};

export default Message;
