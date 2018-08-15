class Dispatcher{

    constructor(){
        this.isDispatch = false;
        this.actionHandlers = [];
    }

    register(actionHandler) {
        this.actionHandlers.push(actionHandler);
    }

    dispatch(action){
        if (this.isDispatch)
            throw Error('Cannot dispatch in a middle of dispatching');
        
        this.isDispatch = true;
        this.actionHandlers.forEach(handler => handler(action));
        this.isDispatch = false;
    }
}

export default new Dispatcher();