import Dispatcher from './Dispatcher';

export const increament = () => {
    const action = {
        type: 'INCREAMENT'
    }
    Dispatcher.dispatch(action);
};

export const decreament = () => {
    const action = {
        type: 'DECREAMENT'
    }
    Dispatcher.dispatch(action);
};

export const zero = () => {
    const action = {
        type: 'ZERO'
    }
    Dispatcher.dispatch(action);
};
