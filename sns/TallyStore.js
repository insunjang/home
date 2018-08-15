import EventEmitter from 'EventEmitter';
import Dispatcher from './Dispatcher';

var tally = {
    count: 0
};

const increament = () => {
    tally.count += 1;
};

const decreament = () => {
    tally.count -= 1;
};

const zero = () => {
    tally.count = 0;
};

const handleAction = (action) => {
    switch (action.type) {
        case 'INCREAMENT':
            increament();
            break;
        case 'DECREAMENT':
            decreament();
            break;
        case 'ZERO':
            zero();
            break;
        default:
            //nothing
    }
    instance.emitChange();
};

Dispatcher.register(handleAction);

class TallyStore extends EventEmitter {
    getTally() {
        return Object.assign({}, tally);
    }
    addChangeListener(callback) {
        this.addListener('CHANGE', callback);
    }

    removeChangeListener(callback) {
        this.removeListener('CHANGE', callback);
    }
    emitChange() {
        this.emit('CHANGE');
    }
}
const instance = new TallyStore();
export default instance;
