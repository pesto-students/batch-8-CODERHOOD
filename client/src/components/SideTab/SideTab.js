import React from 'react';

import './SideTab.css';

const SideTab = ({ cls, content, onClick, ...props }) => {
    return (
        <div className={cls}
        onClick={(e, content) => onClick(e, content)}
        >
            { content }
        </div>
    )
}

export default SideTab