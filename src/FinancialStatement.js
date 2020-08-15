import React from "react";
import useFinancialState from "./hooks/useFinancialState.js";
import { v4 as uuidv4 } from "uuid";
import InOutBox from "./InOutBox.js";
import "./FinancialStatement.css";
import "./Icons.css";
import "react-bulma-components/dist/react-bulma-components.min.css";
import { Section, Columns } from "react-bulma-components";

function FinancialStatement() {
  const initialIncomes = [
    { name: "Programmieren", amount: 6000, id: uuidv4() },
    { name: "Musik", amount: 200, id: uuidv4() },
  ];
  const initialExpenses = [
    { name: "Lebenskosten", amount: 2000, id: uuidv4() },
    { name: "Spaß", amount: 200, id: uuidv4() },
  ];
  const initialAssets = [
    {
      name: "Campervan",
      cost: 40000,
      downpay: 40000,
      cashflow: 400,
      id: uuidv4(),
    },
    {
      name: "Wohnung",
      cost: 80000,
      downpay: 20000,
      cashflow: 350,
      id: uuidv4(),
    },
  ];
  const initialLiabilities = [
    {
      name: "Car loans",
      principal: 11000,
      interest: 0.05,
      id: uuidv4(),
    },
  ];

  const [incomes, addIncome, removeIncome, editIncome] = useFinancialState("incomes",
    initialIncomes
  );
  const [expenses, addExpense, removeExpense, editExpense] = useFinancialState("expenses",
    initialExpenses
  );
  const [assets, addAsset, removeAsset, editAsset] = useFinancialState("assets",
    initialAssets
  );
  const [liabilities, addLiability, removeLiability, editLiability] = useFinancialState("liabilities",
    initialLiabilities
  );

  return (
    <>
      <Section className="has-background-white-ter hero is-fullheight">
        <Columns centered breakpoint="tablet">
          <InOutBox
            title="Income"
            isIncome
            data={incomes}
            add={addIncome}
            remove={removeIncome}
            edit={editIncome}
          ></InOutBox>
          <Columns.Column size="full"></Columns.Column>
          <InOutBox
            title="Expense"
            isExpense
            data={expenses}
            add={addExpense}
            remove={removeExpense}
            edit={editExpense}
          ></InOutBox>
          <Columns.Column size="full"></Columns.Column>
          <InOutBox
            title="Asset"
            isAsset
            data={assets}
            add={addAsset}
            remove={removeAsset}
            edit={editAsset}
            style={{ marginRight: "2rem" }}
            size={5}
          ></InOutBox>
          <InOutBox
            title="Liability"
            isLiability
            data={liabilities}
            add={addLiability}
            remove={removeLiability}
            edit={editLiability}
            size={5}
          ></InOutBox>
        </Columns>
      </Section>
    </>
  );
}

export default FinancialStatement;