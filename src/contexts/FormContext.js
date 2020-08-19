import React, { useState, createContext } from "react";
import useToggle from "../hooks/useToggle";

export const FormContext = createContext();

export function FormProvider(props) {
  const [showModal, toggleShowModal] = useToggle(false);
  const [entry, setEntry] = useState({});

  return (
    <FormContext.Provider
      value={{ showModal, toggleShowModal, entry, setEntry }}
    >
      {props.children}
    </FormContext.Provider>
  );
}
