import React, { useEffect, useState } from 'react';
import PT from 'prop-types';
import cls from 'classnames';

export default function FancySwitch({ onChange, values, isChecked }) {
    const [checked, setChecked] = useState(isChecked);
    const [current, setCurrent] = useState({
        value: null,
        inverseLabel: null,
    });

    useEffect(() => {
        setCurrent({
            value: checked ? values[1] : values[0],
            inverseLabel: !checked ? values[1][0] : values[0][0],
        });
    }, [checked]);

    /**
     * Still this hook fires initially (1 time) on every page load. We need to make onChange
     * behanve like generic events which fires only on value changes.
     */
    useEffect(() => {
        /**
         * Trigger only when value is not null.
         */
        if (current.value) {
            onChange(current.value);
        }
    }, [current]);

    return (
        <div className="tw-relative tw-inline-block">
            <div>
                <input
                    type="checkbox"
                    name="toggle"
                    id="toggle"
                    defaultChecked={checked}
                    onChange={() => setChecked(!checked)}
                    className="tw-opacity-0 tw-absolute"
                />
                <label
                    htmlFor="toggle"
                    className={cls(
                        'tw-toggle-checkbox tw-bg-green-600 tw-absolute tw--top-1 tw-block tw-w-8 tw-h-8 tw-text-white tw-rounded-full tw-cursor-pointer',
                        'tw-flex tw-justify-center tw-items-center',
                        { 'tw-right-0': !checked },
                        { 'tw-left-0': checked },

                    )}
                >
                    {current.inverseLabel}
                </label>
            </div>
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label
                title="Checked"
                className={cls(
                    'tw-toggle-label tw-block tw-h-6 tw-rounded-full tw-bg-green-200 tw-text-green-800',
                    { 'tw-pr-9 tw-pl-3': !checked },
                    { 'tw-pl-9 tw-pr-3': checked },
                )}
            >
                {current.value}
            </label>
        </div>
    );
}

FancySwitch.defaultProps = {
    values: [0, 1],
    isChecked: false,
    onChange: () => {},
};

FancySwitch.propTypes = {
    values: PT.arrayOf(PT.any),
    isChecked: PT.bool,
    onChange: PT.func,
};

FancySwitch.displayName = 'elements/FancySwitch';
