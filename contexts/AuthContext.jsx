import { createContext, useEffect, useReducer } from "react";
//useReducer allows us to use reducers in order to control our stattes
import { auth } from "../firebase/config";

//creates our context
export const AuthContext = createContext();

//actions our reducer can perform based on the action dispatched
export const authReducer = (state, action) => {
  switch (action.type) {
    //when action dispatched is LOGIN, will take state and update the user within it to be 
    case "LOGIN":
      return { ...state, user: action.payload };
      //when action dispatched is LOGOUT, will take the state and update the user to be null
    case "LOGOUT":
      return { ...state, user: null };
      //when action dispatched is AUTH_IS_READY, will run on initial page render and take the state and update user to be either the user if logged in, or null if signed out
    case "AUTH_IS_READY":
      return { ...state, user: action.payload, authIsReady: true };
      //default state which returns current user state
    default:
      return state;
  }
};

//Will be wrapped around the app in order to allow for global access to AuthContext
export const AuthContextProvider = ({ children }) => {
  //manages our states by using our authReducer function, default state of null when not signed in
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    authIsReady: false,
  });

  //When page is first rendered, checks state to see if user is logged in or signed out
  useEffect(() => {
    //checks firebase for change in user state depending if user is logged in or logged out
    const unsub = auth.onAuthStateChanged((user) => {
      //payload will be either null or current user
      dispatch({ type: "AUTH_IS_READY", payload: user });
      unsub();
    });
  }, []);

  return (
    //returns state and dispatch action
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
