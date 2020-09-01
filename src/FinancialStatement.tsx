import React from "react";
import InOutBox from "./InOutBox";
import "./FinancialStatement.css";
import "./Icons.css";
import "react-bulma-components/dist/react-bulma-components.min.css";
// @ts-ignore
import { Section, Columns } from "react-bulma-components";
import { FinancialType } from "./FinancialTypes";


const FinancialStatement: React.FC = (props) => {
  return (
    <>
      <Section className="has-background-white-ter hero is-fullheight">
        <Columns centered className="is-multiline" breakpoint="tablet">

          <InOutBox financialType={FinancialType.INCOME}></InOutBox>
          <Columns.Column size="full"></Columns.Column>
          
          <InOutBox financialType={FinancialType.EXPENSE}></InOutBox>
          <Columns.Column size="full"></Columns.Column>

          <InOutBox financialType={FinancialType.ASSET} size={5}></InOutBox>
          <Columns.Column size="1"></Columns.Column>

          <InOutBox financialType={FinancialType.LIABILITY} size={5}></InOutBox>
        </Columns>
      </Section>
    </>
  );
}

export default FinancialStatement;
