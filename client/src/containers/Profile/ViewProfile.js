/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';

const ViewProfile = (props) => {

    const member = { name: "Radheyshyam", profileImage: "https://ca.slack-edge.com/TANRWLALE-UK0V63TLP-8291d120d19c-1024", bio: "I am Hero", email: "radhey@shyam.com" }

    return (
        <div className="card">
            <div className="card-image">
                <figure className="image is-3by2">
                    <img src={member.profileImage} alt="Profile" />
                </figure>
            </div>
            <div className="card-content">
                <div className="media">
                    <div className="media-left">
                        <figure className="image is-48x48">
                            <img src={member.profileImage} alt="Profile" />
                        </figure>
                    </div>
                    <div className="media-content">
                        <p className="title is-4">{member.name}</p>
                        <p className="subtitle is-6">{member.email}</p>
                    </div>
                </div>
                <div className="content">
                    {member.bio} <a>{member.email}</a>.
                    <br />
                </div>
            </div>
        </div>
    );
}

export default ViewProfile;