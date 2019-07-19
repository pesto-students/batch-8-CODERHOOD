/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { modules, methods, endpoints } from '../../constants/constants';
import useFetch from '../../hooks/useFetch';
import Spinner from '../../components/Spinner/Spinner';
import callApi from '../../libs/axios';

const ChannelMembers = (props) => {
    const { channel } = modules;
    const { get, put } = methods;
    const { member } = endpoints;
    // const channelDetails = useFetch(get, `/${channel}/${props.channelId}`, {});
    const channelDetails = useFetch(get, `/${channel}/5d296820efda5a73faa563d5`, {});

    //TODO: Get this from API after Server PR merge
    const members = [
        { id: 1, name: "Kunnu01", profileImage: "http://s3.amazonaws.com/37assets/svn/765-default-avatar.png", isOnline: true },
        { id: 2, name: "Radhey", profileImage: "http://s3.amazonaws.com/37assets/svn/765-default-avatar.png", isOnline: false },
        { id: 3, name: "Saurabh Shetty", profileImage: "http://s3.amazonaws.com/37assets/svn/765-default-avatar.png", isOnline: true },
    ]

    const { isLoading } = channelDetails;
    
    if (isLoading) {
      return <Spinner />
    }

    const removeMember = async (memberId) => {
        const result = await callApi(put, `/${channel}/${member}`, { operation: 'delete', id: '5d296820efda5a73faa563d5', memberId });
        console.log(result);
    }

    return (
        <nav className="panel">
            <p className="panel-heading">
                {channelDetails.response.data.name}
            </p>
            <div class="list">
            {channelDetails.response.data.members.map(member =>
                (<div className="list-item">
                    <span className="icon is-size-7" style={{padding: 10}}>
                        <i className="fas fa-circle" style={member.isOnline ? { color: "green" } : { color: "gray" }}></i>
                    </span>
                    {member}
                    <button className="button is-outlined is-pulled-right is-small" 
                    onClick = {() => {removeMember(member)}}>
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