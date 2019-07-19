/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
const ChannelMembers = (props) => {


    

    //TODO: Get this from API after Server PR merge
    const members = [
        { id: 1, name: "Kunnu01", profileImage: "http://s3.amazonaws.com/37assets/svn/765-default-avatar.png", isOnline: true },
        { id: 2, name: "Radhey", profileImage: "http://s3.amazonaws.com/37assets/svn/765-default-avatar.png", isOnline: false },
        { id: 3, name: "Saurabh Shetty", profileImage: "http://s3.amazonaws.com/37assets/svn/765-default-avatar.png", isOnline: true }
    ]

    return (
        <nav className="panel">
            <p className="panel-heading">
                Members
            </p>
            <div class="list">
            {members.map(member =>
                (<div className="list-item">
                    <span className="icon is-size-7" style={{padding: 10}}>
                        <i className="fas fa-circle" style={member.isOnline ? { color: "green" } : { color: "gray" }}></i>
                    </span>
                    {member.name}
                    <button className="button is-outlined is-pulled-right is-small">
                        Remove Member
                    </button>
                </div>)
            )}
            </div>
            <div className="panel-block">
                <button className="button is-link is-outlined is-fullwidth">
                    Add new member
                </button>
            </div>
        </nav>
    );
}

export default ChannelMembers;