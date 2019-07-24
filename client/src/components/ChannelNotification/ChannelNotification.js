import React from 'react'
import './ChannelNotification.css';

const ChannelNotification = ({ content }) => {
    return (
        <div 
          className="has-text-centered channel-notification content"
          style={{ fontSize: '0.8em' }}
        >
            {content}
        </div>
    )
}

export default ChannelNotification
