import React from 'react'
import './Spinner.css';

const Spinner = ({ cls }) => {
    return (
        <div className="is-narrow">
            <div className={`la-ball-fall ${cls}`}>
                <div className="is-centered" />
                <div />
                <div />
            </div>
        </div>
    )
}

export default Spinner
