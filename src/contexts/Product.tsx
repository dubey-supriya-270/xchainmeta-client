import React, { useReducer, createContext, ReactNode, useMemo } from "react";
import {
  Product,
  initialState,
  State as InitialStateType,
  Actions,
} from "../reducers/product";

export const ProductContext = createContext<{
  state: InitialStateType;
  dispatch: React.Dispatch<Actions>;
}>({
  state: initialState,
  dispatch: () => null,
});

// define the type of the children prop
type Props = {
  children: ReactNode;
};

export const ProductContextProvider: React.FC<Props> = ({ children }) => {
  //get the state and the dispatch function from the useReducer hook by using the User reducer
  const [state, dispatch] = useReducer(Product, initialState);
  //create an object called value which has the state and the dispatch function returned from the reducer
  const value = useMemo(() => ({ state, dispatch }), [state, dispatch]);
  //wrap the children with the Provider component for the Loading Context and pass the value of the context
  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
};