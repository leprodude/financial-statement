import React, { createContext, useState } from "react";
import {
  initialIncomes,
  initialExpenses,
  initialAssets,
  initialLiabilities,
} from "../InitialFinancials.js";
import useFinancialState from "../hooks/useFinancialState.js";

export const FinancialsContext = createContext();

export function FinancialsProvider(props) {
    const incomes = useFinancialState("income", initialIncomes);
    const expenses = useFinancialState("expense", initialExpenses);
    const assets = useFinancialState("asset", initialAssets);
    const liabilities = useFinancialState("liability", initialLiabilities);

  return (
    <FinancialsContext.Provider value={{ incomes, expenses, assets, liabilities }}>
      {props.children}
    </FinancialsContext.Provider>
  );
}

// export const withFinancialsContext = (Component) => (props) => (
//   <FinancialsContext.Consumer>
//     {(value) => <Component financialsContext={{ ...this.state }} {...props} />}
//   </FinancialsContext.Consumer>
// );
