import React, { useEffect } from "react";
import InOutBox from "./InOutBox";
import { FormModal } from "./FormModal";
import "./FinancialStatement.css";
import "./Icons.css";
import { revealElements } from "./FinancialStatementAnimation"
import "react-bulma-components/dist/react-bulma-components.min.css";
// @ts-ignore
import { Section, Columns } from "react-bulma-components";
import { FinancialType } from "./FinancialTypes";


const FinancialStatement: React.FC = (props) => {
  useEffect(() => {
    revealElements();
  }, []);
  return (
    <>
      <Section className="FinancialStatement-hero has-background-white-ter hero is-fullheight-with-navbar">
        <Columns className="is-multiline FinancialStatementColumns" breakpoint="tablet">

          <InOutBox financialType={FinancialType.INCOME} size={6}></InOutBox>
          {/* <Columns.Column><h2>Column</h2></Columns.Column>
          <Columns.Column><h2>Column</h2></Columns.Column>
          <Columns.Column><h2>Column</h2></Columns.Column>
          <Columns.Column><h2>Column</h2></Columns.Column> */}

          <InOutBox financialType={FinancialType.EXPENSE} size={6}></InOutBox>
          {/* <Columns.Column size="full"></Columns.Column> */}

          <InOutBox financialType={FinancialType.ASSET} size={6}></InOutBox>
          {/* <Columns.Column size="1"></Columns.Column> */}

          <InOutBox financialType={FinancialType.LIABILITY} size={6}></InOutBox>
        </Columns>
      </Section>
      <FormModal />
    </>
  );
}

export default FinancialStatement;
