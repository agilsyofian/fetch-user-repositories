import { createContext, useContext, useReducer } from "react";

const ContextCreate = createContext();

ContextCreate.displayName = "AppContext";

function reducer(state, action) {
  switch (action.type) {
    case "STATUS": {
      return { ...state, status: action.value };
    }
    case "QUERY_DATA": {
      return { ...state, query: action.value };
    }
    default: {
      throw new Error(`action tidak dapat dihandle: ${action.type}`);
    }
  }
}

function AppContextProvider({ children }) {
	const initialState = {
    status:null,
    query:{value:''}
	};
	const [controller, dispatch] = useReducer(reducer, initialState);
	return <ContextCreate.Provider value={[controller, dispatch]}>{children}</ContextCreate.Provider>;
}

function useAppContext() {
  const context = useContext(ContextCreate);
  return context;
}

const setStatus = (dispatch, value) => dispatch({ type: "STATUS", value });
const setQuery = (dispatch, value) => dispatch({ type: "QUERY_DATA", value });

export {
  AppContextProvider,
  useAppContext,
  setStatus,
  setQuery,
};