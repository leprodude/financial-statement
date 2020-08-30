import React, { createContext } from "react";
import FinancialsReducer from "../reducers/FinancialsReducer";
import useLocalStorageReducer from "../hooks/useLocalStorageReducer";
import { initialFinancials } from "../InitialFinancials";
import { Financials} from "../FinancialTypes";
import { Actions } from "../reducers/FinancialsReducer";

export const FinancialsContext = createContext<Partial<Financials>>({});
export const DispatchContext = createContext<Partial<React.Dispatch<Actions>>>({});

export const FinancialsProvider: React.FC = (props) => {
  const [financials, dispatch] = useLocalStorageReducer(
    "financials",
    JSON.stringify(initialFinancials),
    FinancialsReducer
  );

  return (
    <FinancialsContext.Provider value={financials}>
      <DispatchContext.Provider value={dispatch}>
        {props.children}
      </DispatchContext.Provider>
    </FinancialsContext.Provider>
  );
}
