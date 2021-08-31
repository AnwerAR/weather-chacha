import React from 'react';
import PT from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../blocks/header';
import FancySwitch from '../elements/fancy.switch';

export default function GenericTemplate({ children, setRefresh }) {
    const unit = useSelector(({ tempUnit }) => tempUnit);
    const dispatch = useDispatch();

    return (
        <div className="md:tw-container lg:tw-mx-auto">
            <Header>
                <FancySwitch
                    onChange={(v) => {
                        if (unit !== v) {
                            dispatch({ type: 'tempUnit/change', payload: v });
                        }
                    }}
                    values={['Celcius', 'Fahrenheit']}
                />
                <button type="button" onClick={() => setRefresh(Math.random())}>
                    Referesh
                </button>
            </Header>
            {children}
        </div>
    );
}

GenericTemplate.defaultProps = {
    children: null,
    setRefresh: () => {},
};

GenericTemplate.propTypes = {
    children: PT.node,
    setRefresh: PT.func,
};

GenericTemplate.displayName = 'templates/GenericTemplate';
