import React, { useState, createContext } from "react";
import { Financial } from "../Financials";
import useToggle from "../hooks/useToggle";

interface FormProps {
  showModal: boolean,
  toggleShowModal: (() => void),
  entry: Financial,
  setEntry: React.Dispatch<React.SetStateAction<Financial | undefined>>,
  isEditing: boolean,
  setIsEditing: React.Dispatch<React.SetStateAction<boolean | undefined>>
}

export const FormContext = createContext<Partial<FormProps>>({});

export const FormProvider: React.FC = (props) => {
  const { state, toggle } = useToggle(false);
  const showModal = state;
  const toggleShowModal = toggle;

  const [entry, setEntry] = useState<Financial>();
  const [isEditing, setIsEditing] = useState<boolean>();

  return (
    <FormContext.Provider
      value={{ showModal, toggleShowModal, entry, setEntry, isEditing, setIsEditing }}
    >
      {props.children}
    </FormContext.Provider>
  );
}
