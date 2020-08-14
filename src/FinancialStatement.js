import React from "react";
import useFinancialState from "./hooks/useFinancialState.js";
import { v4 as uuidv4 } from "uuid";
import InOutBox from "./InOutBox.js";
import "./FinancialStatement.css";
import "./Icons.css";
import "react-bulma-components/dist/react-bulma-components.min.css";
import {
  Section,
  Columns,
} from "react-bulma-components";


function FinancialStatement() {
  const initialIncomes = [
    { name: "Programmieren", amount: 6000, id: uuidv4() },
    { name: "Musik", amount: 200, id: uuidv4() },
  ];
  const initialExpenses = [
    { name: "Lebenskosten", amount: 2000, id: uuidv4() },
    { name: "Spaß", amount: 200, id: uuidv4() },
  ];

  const [ incomes, addIncome, removeIncome, editIncome ] = useFinancialState(
    initialIncomes
  );
  const [expenses, addExpense, removeExpense, editExpense] = useFinancialState(
    initialExpenses
  );
  return (
    <>
      <Section className="has-background-white-ter hero is-fullheight">
        <Columns centered breakpoint="tablet">
          <InOutBox
            title="Income"
            data={incomes}
            add={addIncome}
            remove={removeIncome}
            edit={editIncome}
          ></InOutBox>
          <Columns.Column size="full"></Columns.Column>
          <InOutBox
            title="Expense"
            data={expenses}
            add={addExpense}
            remove={removeExpense}
            edit={editExpense}
          ></InOutBox>
        </Columns>
      </Section>
    </>
  );
}

export default FinancialStatement;



//        assets: [
//         {
//           name: "Campervan",
//           cost: 40000,
//           downpay: 40000,
//           cashflow: 400,
//         },
//         {
//           name: "Wohnung",
//           cost: 80000,
//           downpay: 20000,
//           cashflow: 350,
//         },
//       ],
//       liabilities: [
//         {
//           name: "Kredit Wohnung",
//           principal: 60000,
//           interest: 0.05,
//         },
//       ],