import React from 'react';
import PT from 'prop-types';

export default function Header({ title, children }) {
    return (
        <div className="main-header tw-mx-2 lg:tw-mx-0">
            <h2>{title}</h2>
            <div>{children}</div>
        </div>
    );
}

Header.defaultProps = {
    children: null,
};

Header.propTypes = {
    title: PT.string.isRequired,
    children: PT.node,
};

Header.displayName = 'blocks/Header';
