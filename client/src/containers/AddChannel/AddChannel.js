/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { InputField } from '../../components'
import SmallContainer from '../../components/SmallContainer/SmallContainer'
import AddMember from '../ChannelMembers/AddMember'
import callApi from '../../libs/axios';
import { modules, methods, endpoints } from '../../constants/constants';
import { useAppContext } from "../App/AppContext";

const AddChannel = (props) => {

    const [members, setMembers] = useState([]);
    const [channelName, setChannelName] = useState(undefined);
    const { loginStatus } = useAppContext();

    const updateMember = (member) => {
        setMembers([...members, member]);
    }
    const handleChannelNameChange = (e) => {
        setChannelName(e.target.value);
    }
    const createChannel = async () => {
        const { post } = methods;
        const { channel } = modules;
        await callApi(post, `/${channel}/`,
            {
                name: channelName,
                workspace: props.workspaceId,
                members: members,
                isPrivate: false,
                user: loginStatus.user._id
            });
        props.onClose();
    }

    return (
        <SmallContainer>
            <InputField label="Channel Name" name="channelName" onChange={handleChannelNameChange} />
            <div style={{ marginBottom: "8px" }}><strong>Add People</strong></div>
            <AddMember members={props.members} handleAdd={updateMember} />
            <br />
            <div><strong>People</strong></div>
            <div className="list is-hoverable">
                {members.map(member =>
                    <a className="list-item">{member.name}</a>)}
            </div>
            <button className="button" onClick={createChannel}>Create Channel</button>
        </SmallContainer>
    )
}

export default AddChannel;
