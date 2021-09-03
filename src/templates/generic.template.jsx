import React from 'react';
import PT from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../blocks/header';
import FancySwitch from '../elements/fancy.switch';
import Button from '../elements/button';

export default function GenericTemplate({ children, setRefresh }) {
    const unit = useSelector(({ tempUnit }) => tempUnit);
    const dispatch = useDispatch();

    return (
        <div className="md:tw-container tw-mx-auto">
            <Header>
                <FancySwitch
                    onChange={(v) => {
                        if (unit !== v) {
                            dispatch({ type: 'tempUnit/change', payload: v });
                        }
                    }}
                    values={['Celcius', 'Fahrenheit']}
                />
                <Button
                    variant="prInvert"
                    onClick={() => setRefresh(Math.random())}
                    extraClasses="tw-rounded tw-ml-2"
                >
                    Refresh
                </Button>
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
