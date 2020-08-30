import React, { useState, createContext } from "react";
import { FinancialType, Financials } from "../FinancialTypes";
import useToggle from "../hooks/useToggle";

interface FormProps {
  showModal: boolean,
  toggleShowModal: (() => void),
  entry: {
    _type?: FinancialType,
    id?: string,
    // financialType?: FinancialType
    name?: string,
    amount?: number,
    cost?: number,
    cashflow?: number,
    principal?: number,
    downpay?: number,
    interest?: number,
    monthly?: number
  },
  setEntry: React.Dispatch<React.SetStateAction<{}>>
}

export const FormContext = createContext<Partial<FormProps>>({});

export const FormProvider: React.FC = (props) => {
  const { state, toggle } = useToggle(false);
  const showModal = state;
  const toggleShowModal = toggle;

  const [entry, setEntry] = useState({});

  return (
    <FormContext.Provider
      value={{ showModal, toggleShowModal, entry, setEntry }}
    >
      {props.children}
    </FormContext.Provider>
  );
}
