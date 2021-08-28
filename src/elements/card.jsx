import React from 'react';
import PT from 'prop-types';
import cls from 'classnames';

export default function Card({ title, isActive }) {
    return (
        <div className={cls(
            'tw-flex-1',
            { 'tw-bg-green-500': isActive },
        )}
        >
            {title}
        </div>
    );
}

Card.defaultProps = {
    isActive: false,
};

Card.propTypes = {
    title: PT.string.isRequired,
    isActive: PT.bool,
};

Card.displayName = 'elements/Card';
