import React from 'react';

function Heading(props) {
    const title = props.title;

    return (
        <header className="title">
            <h1>{title}</h1>
        </header>
    )
}

export default Heading;