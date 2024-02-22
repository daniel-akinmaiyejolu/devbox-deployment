// RequestContext.js
import React, { createContext, useContext, useReducer } from 'react';
import axios from 'axios';

// Create a context
const RequestContext = createContext();

// Initial state
const initialState = {
  loading: false,
  error: null,
  success: false,
};

// Reducer function
const requestReducer = (state, action) => {
  switch (action.type) {
    case 'REQUEST':
      return { ...state, loading: true };
    case 'SUCCESS':
      return { ...state, loading: false, success: true };
    case 'ERROR':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

// Context provider component
export const RequestContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(requestReducer, initialState);

  const handleSubmit = async (requestData) => {
    dispatch({ type: 'REQUEST' });
    try {
      const response = await axios.post('http://localhost:5000/submit-request', requestData);
      if (response.status === 200) {
        dispatch({ type: 'SUCCESS' });
      } else {
        dispatch({ type: 'ERROR', payload: 'Failed to submit request' });
      }
    } catch (error) {
      dispatch({ type: 'ERROR', payload: error.message });
    }
  };

  return (
    <RequestContext.Provider value={{ state, handleSubmit }}>
      {children}
    </RequestContext.Provider>
  );
};

// Custom hook to access context
export const useRequestContext = () => useContext(RequestContext);
