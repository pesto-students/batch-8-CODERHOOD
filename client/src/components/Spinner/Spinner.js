import React from 'react'
import './Spinner.css';

const Spinner = ({ cls }) => {
    return (
        <div className={`la-ball-fall ${cls}`}>
            <div />
            <div />
            <div />
        </div>
    )
}

export default Spinner
