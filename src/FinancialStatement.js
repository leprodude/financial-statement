import React, { useContext } from "react";
import { FinancialsContext } from "./contexts/FinancialsContext";
import { FormContext } from "./contexts/FormContext";
import InOutBox from "./InOutBox.js";
import "./FinancialStatement.css";
import "./Icons.css";
import "react-bulma-components/dist/react-bulma-components.min.css";
import { Section, Columns } from "react-bulma-components";

function FinancialStatement() {
  const { incomes, expenses, assets, liabilities } = useContext(
    FinancialsContext
  );

  return (
    <>
      <Section className="has-background-white-ter hero is-fullheight">
        <Columns centered breakpoint="tablet">
          <InOutBox financials={incomes}></InOutBox>
          <Columns.Column size="full"></Columns.Column>
          <InOutBox financials={expenses}></InOutBox>
          <Columns.Column size="full"></Columns.Column>
          <InOutBox
            financials={assets}
            style={{ marginRight: "2rem" }}
            size={5}
          ></InOutBox>
          <InOutBox financials={liabilities} size={5}></InOutBox>
        </Columns>
      </Section>
    </>
  );
}

export default FinancialStatement;
