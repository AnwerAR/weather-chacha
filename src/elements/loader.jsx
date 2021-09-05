import React from 'react';
import PT from 'prop-types';
import cls from 'classnames';

export default function Loader({ size, color }) {
    return (
        <div className="tw-justify-center tw-items-center">
            <div className={cls(
                'tw-animate-spin tw-rounded-full tw-border-t-4 tw-border-b-4',
                { 'tw-w-10 tw-h-10': size === 'sm' },
                { 'tw-w-14 tw-h-14': size === 'md' },
                { 'tw-w-20 tw-h-20': size === 'lg' },
                { 'tw-w-32 tw-h-32': size === 'xl' },
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
