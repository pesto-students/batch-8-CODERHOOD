import React from 'react'
import { Button } from '../../components';

const Welcome = (props) => {
    const { firstVisit } = props;
    return (
      <div className="content has-text-centered welcome">
        {
          firstVisit
          ?
          <>
          <h1>Welcome to CoderHood </h1>
          <img 
            style={{ width: '100vw', height: '20vh' }}
            src='/images/slackImage.png' alt='Welcome'
          />
          <h2>Your CoderHood workspace is all set</h2>
          <p>We have added a basic channel for your team - try adding members to go ahead and poke around!</p>
          <p>Or try sending yourself a direct message to test things out.</p>
          </>
          :
          <>
          <h1>Welcome Back to CoderHood </h1>
          <img 
            style={{ width: '100vw', height: '20vh' }}
            src='/images/slackImage.png' alt='Welcome'
          />
          <h2>Manage your workspace</h2>
          <p>You can add multiple channels to this workspace to manage multiple purposes</p>
          <p>
            All your channels are public. 
            All members of this workspace can 
            <b> Add</b> and <b>Join</b> channels.
          </p>
          </>
        }
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button 
            className="button is-outlined is-black"
            style={{ margin: '1%'}}
            onClick={props.openHandle}
          >
            Add Channel
          </Button>
          <Button 
            className="button is-outlined is-black"
            style={{ margin: '1%'}}
            onClick={props.openUser}
          >
            Invite People
          </Button>
        </div>
      </div>
    )
}

export default Welcome;
