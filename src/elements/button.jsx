import React from 'react';
import PT from 'prop-types';
import cls from 'classnames';

export default function Button({
    type, children, disabled, onClick, extraClasses, variant, size,
}) {
    return (
        <button
            className={cls(
                /**
                 * Variations.
                 */
                { 'tw-bg-green-500 hover:tw-bg-green-700 tw-text-white': variant === 'pr' && !disabled }, // Primary
                { 'tw-border tw-border-green-500 tw-text-green-500 hover:tw-bg-green-700 hover:tw-text-white ': variant === 'prInvert' && !disabled }, // Primary invert
                /**
                 * Sizes.
                 */
                { 'tw-py-1 tw-px-2': size === 'sm' && variant !== 'plain' },
                { 'tw-py-2 tw-px-4': size === 'md' && variant !== 'plain' },
                { 'tw-py-3 tw-px-6': size === 'lg' && variant !== 'plain' },

                { 'tw-py-1': size === 'sm' && variant === 'plain' },
                { 'tw-py-2': size === 'md' && variant === 'plain' },
                { 'tw-py-3': size === 'lg' && variant === 'plain' },

                /**
                 * Disabled state.
                 */
                { 'disabled:tw-cursor-not-allowed tw-border-gray-300 disabled:tw-bg-gray-300 disabled:tw-text-gray-400': disabled },

                /**
                 * Plain with no padding
                 */
                { 'tw-text-green-500': variant === 'plain' && !disabled }, // Primary

                /**
                 * any extra css class for custom styling.
                 */
                extraClasses,
            )}
            type={type === 'submit' ? 'submit' : 'button'}
            disabled={disabled}
            onClick={onClick}
        >
            {children}
        </button>
    );
}

Button.defaultProps = {
    type: 'button',
    onClick: () => {},
    disabled: false,
    extraClasses: '',
    variant: 'pr',
    size: 'md',
};

Button.propTypes = {
    type: PT.oneOf(['submit', 'button']),
    children: PT.node.isRequired,
    onClick: PT.func,
    disabled: PT.bool,
    extraClasses: PT.string,
    /**
     * Variant definations:
     * pr: Primary
     * prInvert: Primary Invert
     * plain: plain (no borders or y-axis padding)
     */
    variant: PT.oneOf(['pr', 'prInvert', 'plain']),
    /**
     * Size definations:
     * sm: Small
     * md: Medium
     * lg: Large
     */
    size: PT.oneOf(['sm', 'md', 'lg']),
};
