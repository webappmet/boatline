export const initialState = {
    message: '',
    visible: false,
    timer: 3000
};
   
export const ToastReducer = (initialState, action) => {
    switch (action.type) {
        case "SHOW_MESSAGE":
            return {
                ...initialState,
                message: action.payload.message,
                timer: action.payload.timer || initialState.timer,
                visible: true,
            };
        case "HIDE_MESSAGE":
            return {
                ...initialState,
                visible: false,
            };
    default:
        throw new Error(`Unhandled action type: ${action.type}`);
    }
  };