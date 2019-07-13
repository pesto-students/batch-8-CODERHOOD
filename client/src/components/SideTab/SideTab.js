import React from 'react';

import './SideTab.css';

const SideTab = ({ cls, content, id, onClick, ...props }) => {
    return (
        <div className={cls}
        onClick={(e) => onClick(e, id, content)}
        >
            { content }
        </div>
    )
}

export default SideTab
