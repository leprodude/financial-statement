import React, { createContext } from "react";
import FinancialsReducer from "../reducers/FinancialsReducer";
import useLocalStorageReducer from "../hooks/useLocalStorageReducer";
import {
  initialIncomes,
  initialExpenses,
  initialAssets,
  initialLiabilities,
} from "../InitialFinancials.js";

export const FinancialsContext = createContext();
export const DispatchContext = createContext();

export function FinancialsProvider(props) {
  // const [financials, dispatch] = useReducer(FinancialsReducer, {
  //   income: initialIncomes,
  //   expense: initialExpenses,
  //   asset: initialAssets,
  //   liability: initialLiabilities,
  // });
  const [financials, dispatch] = useLocalStorageReducer(
    "financials",
    {
      income: initialIncomes,
      expense: initialExpenses,
      asset: initialAssets,
      liability: initialLiabilities,
    },
    FinancialsReducer
  );

  return (
    <FinancialsContext.Provider value={financials}>
      <DispatchContext.Provider value={dispatch}>{props.children}</DispatchContext.Provider>
    </FinancialsContext.Provider>
  );
}
