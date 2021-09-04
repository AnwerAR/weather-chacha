import React from 'react';
import PT from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import cls from 'classnames';
import Header from '../blocks/header';
import Button from '../elements/button';

export default function GenericTemplate({ children, setRefresh }) {
    const unit = useSelector(({ tempUnit }) => tempUnit);
    const dispatch = useDispatch();

    return (
        <div className="md:tw-container tw-mx-auto">
            <Header title="Weather Chacha">
                <span>
                    <Button
                        disabled={unit === 'Celcius'}
                        onClick={() => dispatch({ type: 'tempUnit/change', payload: 'Celcius' })}
                        extraClasses={cls(
                            'tw-rounded-l',
                        )}
                        size="sm"
                    >
                        Celcius
                    </Button>
                    <Button
                        disabled={unit === 'Fahrenheit'}
                        onClick={() => dispatch({ type: 'tempUnit/change', payload: 'Fahrenheit' })}
                        extraClasses={cls(
                            'tw-rounded-r',
                        )}
                        size="sm"
                    >
                        Fahrenheit
                    </Button>
                </span>
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
