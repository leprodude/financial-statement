import React, { createContext, useReducer } from "react";
import FinancialsReducer from "../reducers/FinancialsReducer";
import {
  initialIncomes,
  initialExpenses,
  initialAssets,
  initialLiabilities,
} from "../InitialFinancials.js";

export const FinancialsContext = createContext();

export function FinancialsProvider(props) {

  const [financials, dispatch] = useReducer(FinancialsReducer, {
    income: initialIncomes,
    expense: initialExpenses,
    asset: initialAssets,
    liability: initialLiabilities,
  });

  return (
    <FinancialsContext.Provider value={{ financials, dispatch }}>
      {props.children}
    </FinancialsContext.Provider>
  );
}