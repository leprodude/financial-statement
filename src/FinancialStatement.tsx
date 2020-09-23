import React, { useEffect } from "react";
import InOutBox from "./InOutBox";
import { FormModal } from "./FormModal";
import "css/FinancialStatement.scss";
import "css/Icons.scss";
import { revealElements } from "./FinancialStatementAnimation"
import "react-bulma-components/dist/react-bulma-components.min.css";
// @ts-ignore
import { Section, Columns } from "react-bulma-components";
import { FinancialType } from "./Financials";


const FinancialStatement: React.FC = (props) => {
  useEffect(() => {
    revealElements();
  }, []);
  return (
    <>
      <Section className="FinancialStatement-hero has-background-white-ter hero is-fullheight-with-navbar">
        <Columns className="is-multiline FinancialStatementColumns" breakpoint="tablet">
          <InOutBox data-testid="income-box" financialType={FinancialType.INCOME} size={6}></InOutBox>
          <InOutBox data-testid="expense-box" financialType={FinancialType.EXPENSE} size={6}></InOutBox>
          <InOutBox data-testid="asset-box" financialType={FinancialType.ASSET} size={6}></InOutBox>
          <InOutBox data-testid="liability-box" financialType={FinancialType.LIABILITY} size={6}></InOutBox>
        </Columns>
      </Section>
      <FormModal />
    </>
  );
}

export default FinancialStatement;
