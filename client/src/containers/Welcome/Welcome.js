import React from 'react';
import { Button } from '../../components';

const Welcome = (props) => {
  const { firstVisit } = props;
  return (
    <div className="content has-text-centered welcome">
      {firstVisit ? (
        <>
          <h1>Welcome to CoderHood </h1>
          <figure class="image is-128x128">
            <img
              src="https://wdr-test-icti.cdn.prismic.io/wdr-test-icti/3f9387b0e53fb535624c3a559964e5f3871345ac_connect-logo3x.png"
              alt="welcome"
            />
          </figure>
          <h2>Your CoderHood workspace is all set</h2>
          <p>
            We have added a basic channel for your team - try adding members to
            go ahead and poke around!
          </p>
          <p>Or try sending yourself a direct message to test things out.</p>
        </>
      ) : (
        <>
          <h1>Welcome Back to CoderHood </h1>
          <img
            style={{ width: '15vw', height: '30vh' }}
            src="https://wdr-test-icti.cdn.prismic.io/wdr-test-icti/3f9387b0e53fb535624c3a559964e5f3871345ac_connect-logo3x.png"
            alt="Welcome"
          />
          <h2>Manage your workspace</h2>
          <p>
            You can add multiple channels to this workspace to manage multiple
            purposes
          </p>
          <p>
            All your channels are public. All members of this workspace can
            <b> Add</b> and <b>Join</b> channels.
          </p>
        </>
      )}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Button
          className="button is-outlined is-black"
          style={{ margin: '1%' }}
          onClick={props.openHandle}
        >
          Add Channel
        </Button>
        <Button
          className="button is-outlined is-black"
          style={{ margin: '1%' }}
          onClick={props.openUser}
        >
          Invite People
        </Button>
      </div>
    </div>
  );
};

export default Welcome;
