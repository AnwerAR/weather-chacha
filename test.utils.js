import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import PT from 'prop-types';
import store from './src/store';

const Wrapper = ({ children }) => (
    <Provider store={store}>
        {children}
    </Provider>
);

Wrapper.defaultProps = {
    children: null,
};

Wrapper.propTypes = {
    children: PT.node,
};

const customRender = (ui, options) => render(ui, { wrapper: Wrapper, ...options });

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };
