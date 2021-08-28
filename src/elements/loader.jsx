import React from 'react';
import PT from 'prop-types';
import cls from 'classnames';

export default function Loader({ size, color }) {
    const sizes = {
        sm: 'tw-w-10 tw-h-10',
        md: 'tw-w-14 tw-h-14',
        lg: 'tw-w-20 tw-h-20',
        xl: 'tw-w-32 tw-h-32',
    };

    return (
        <div className="tw-justify-center tw-items-center">
            <div className={cls(
                'tw-animate-spin tw-rounded-full tw-border-t-4 tw-border-b-4',
                sizes[size],
                color,
            )}
            />
        </div>
    );
}

Loader.defaultProps = {
    size: 'md',
    color: 'tw-border-green-800',
};

Loader.propTypes = {
    size: PT.oneOf(['sm', 'md', 'lg', 'xl']),
    color: PT.string,
};

Loader.displayName = 'elements/Loader';
