import React from 'react'

import './Spinner.css';
import SmallContainer from '../SmallContainer/SmallContainer';

const Spinner = ({ cls }) => {
    return (
        <SmallContainer>
            <div className={`spinner la-ball-fall ${cls}`}>
                <div />
                <div />
                <div />
            </div>
        </SmallContainer>
    )
}

export default Spinner
