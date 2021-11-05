import { createContext, useContext, useReducer } from "react";
import { ToastReducer, initialState } from "./toastReducer";

const ToastStateContext = createContext();
const ToastDispatchContext = createContext();

export const useToastState = () => {
    const context = useContext(ToastStateContext);
    if (context === undefined) {
      throw new Error("useToastState must be used within a ToastProvider");
    }
   
    return context;
}
   
export const useToastDispatch = () => {
    const context = useContext(ToastDispatchContext);
    if (context === undefined) {
      throw new Error("useToastState must be used within a ToastProvider");
    }
   
    return context;
}

export const ToastProvider = ({ children }) => {
    const [user, dispatch] = useReducer(ToastReducer, initialState);
   
    return (
      <ToastStateContext.Provider value={user}>
        <ToastDispatchContext.Provider value={dispatch}>
          {children}
        </ToastDispatchContext.Provider>
      </ToastStateContext.Provider>
    );
};