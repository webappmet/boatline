import React, { useReducer } from "react";
 
let user = localStorage.getItem("currentUser");
 
export const initialState = {
  user: "" || user,
  loading: true
};
 
export const AuthReducer = (initialState, action) => {
  switch (action.type) {
    case "REQUEST_LOGIN":
      return {
        ...initialState,
        loading: true
      };
    case "LOGIN_SUCCESS":
      return {
        ...initialState,
        user: action.payload.user,
        loading: false
      };
    case "LOGOUT":
      return {
        ...initialState,
        user: ""
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};