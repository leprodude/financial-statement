import React from "react";
import InOutBox from "./InOutBox.js";
import "./FinancialStatement.css";
import "./Icons.css";
import "react-bulma-components/dist/react-bulma-components.min.css";
import { Section, Columns } from "react-bulma-components";

function FinancialStatement() {
  
  return (
    <>
      <Section className="has-background-white-ter hero is-fullheight">
        <Columns centered breakpoint="tablet">
          <InOutBox financialType="income"></InOutBox>
          <Columns.Column size="full"></Columns.Column>
          <InOutBox financialType="expense"></InOutBox>
          <Columns.Column size="full"></Columns.Column>
          <InOutBox
            financialType="asset"
            style={{ marginRight: "2rem" }}
            size={5}
          ></InOutBox>
          <InOutBox financialType="liability" size={5}></InOutBox>
        </Columns>
      </Section>
    </>
  );
}

export default FinancialStatement;
