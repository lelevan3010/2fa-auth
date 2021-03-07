import React, { createContext, useReducer, Dispatch } from "react";
import { reducer } from "./Reducer";

type Action = { type: string; payload: {} };

interface HistoryContext {
  History: {
    date?: Date;
    imageURL?: String;
    userId?: String;
    __v?: Number;
    _id?: String;
  }[];
  dispatchHistory: Dispatch<Action>;
}

const initialState: any = [];

const initialContext: HistoryContext = {
  History: [],
  dispatchHistory: (): void => {},
};

export const HistoryContext = createContext(initialContext);

export const HistoryProvider = ({ children }: any) => {
  const [History, dispatchHistory] = useReducer(reducer, initialState);

  return (
    <HistoryContext.Provider value={{ History, dispatchHistory }}>
      {children}
    </HistoryContext.Provider>
  );
};

export const { Consumer } = HistoryContext;
