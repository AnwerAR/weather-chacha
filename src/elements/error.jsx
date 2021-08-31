import React from 'react';
import PT from 'prop-types';
import cls from 'classnames';

export default function ErrorComponent({
    code, message, level, children,
}) {
    return (
        <div className={cls(
            'tw-p-5',
            { 'tw-bg-red-200 tw-text-red-800': level === 'error' },
            { 'tw-bg-green-200 tw-text-green-800': level === 'info' },
        )}
        >
            <h2>{code}</h2>
            <div>{message}</div>
            {children}
        </div>
    );
}

ErrorComponent.defaultProps = {
    message: 'Something went wrong',
    level: 'error',
    children: null,
};

ErrorComponent.propTypes = {
    code: PT.oneOfType([PT.string, PT.number]).isRequired,
    message: PT.string,
    level: PT.oneOf(['error', 'info', 'warning']),
    children: PT.node,
};

ErrorComponent.displayName = 'blocks/ErrorComponent';
