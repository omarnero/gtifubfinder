import { useReducer, createContext } from "react";
import alertReducer from "./AlertReducer";
const AlertContext = createContext();
export const AlertProvider = (props) => {
  const intialState = null;
  const [state, dispatch] = useReducer(alertReducer, intialState);
  const setAlert = (msg, type) => {
    dispatch({
      type: "Set_alert",
      payload: { msg, type },
    });
    setTimeout(() => {
      dispatch({ type: "remove_alert" });
    }, 3000);
  };
  return (
    <AlertContext.Provider value={{ alert: state, setAlert }}>
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertContext;
