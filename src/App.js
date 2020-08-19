import React from "react";
import FinancialStatement from "./FinancialStatement.js";
import { FinancialsProvider } from "./contexts/FinancialsContext";
import { FormProvider } from "./contexts/FormContext";
import "./App.css";

function App() {
  return (
    <div className="App">
      <FinancialsProvider>
        <FormProvider>
          <FinancialStatement />
        </FormProvider>
      </FinancialsProvider>
    </div>
  );
}

export default App;
