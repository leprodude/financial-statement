import React, { Component } from "react";
import { v4 as uuidv4 } from "uuid";
import Box from "./Box.js";
import InOutBox from "./InOutBox.js";
import "./FinancialStatement.css";
import "./Icons.css";
import "react-bulma-components/dist/react-bulma-components.min.css";
import {
  Section,
  Hero,
  Heading,
  Columns,
  Container,
  Level,
} from "react-bulma-components";

class FinancialStatement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      income: [],
      expenses: [],
      assets: [],
      liabilities: [],
    };
    this.addAsset = this.addAsset.bind(this);
    this.addIncome = this.addIncome.bind(this);
    this.addExpense = this.addExpense.bind(this);
    this.updateIncome = this.updateIncome.bind(this);
    this.updateExpense = this.updateExpense.bind(this);
  }
  componentDidMount() {
    this.setState({
      income: [
        { name: "Programmieren", amount: 6000, id: uuidv4() },
        { name: "Musik", amount: 200, id: uuidv4() },
      ],
      expenses: [
        { name: "Lebenskosten", amount: 2000, id: uuidv4() },
        { name: "Spaß", amount: 200, id: uuidv4() },
      ],
      assets: [
        {
          name: "Campervan",
          cost: 40000,
          downpay: 40000,
          cashflow: 400,
        },
        {
          name: "Wohnung",
          cost: 80000,
          downpay: 20000,
          cashflow: 350,
        },
      ],
      liabilities: [
        {
          name: "Kredit Wohnung",
          principal: 60000,
          interest: 0.05,
        },
      ],
    });
  }
  addIncome(entry) {
    this.setState((st) => ({
      income: [...st.income, entry],
    }));
  }
  addExpense(entry) {
    this.setState((st) => ({
      expenses: [...st.expenses, entry],
    }));
  }

  updateIncome(id, updatedIncome) {
    const updatedIncomes = this.state.income.map((income) => {
      if (income.id === id) {
        return updatedIncome;
      }
      return income;
    });
    this.setState({ income: updatedIncomes });
  }
  updateExpense(id, updatedExpense) {
    const updatedExpenses = this.state.expenses.map((expense) => {
      if (expense.id === id) {
        return updatedExpense;
      }
      return expense;
    });
    this.setState({ expenses: updatedExpenses });
  }

  addAsset() {
    // let asset = {
    //   name: "Teststraße 15",
    //   cost: 4000,
    //   downpay: 4000,
    //   cashflow: 250,
    // };
    // this.setState((st) => ({
    //   assets: [...st.assets, asset],
    // }));
  }
  render() {
    const { income, expenses, assets, liabilities } = this.state;
    return (
      <div>
        {/* <Section className="has-background-white-ter">
          <Container>
            <Heading size={6}>Financial Statement</Heading>
          </Container>
        </Section> */}
        <Section className="has-background-white-ter hero is-fullheight">
          {/* <Container> */}
          <Columns centered breakpoint="tablet">
            <InOutBox
              title="Income"
              data={income}
              add={this.addIncome}
              update={this.updateIncome}
            ></InOutBox>
            <Columns.Column size="full"></Columns.Column>
            <InOutBox
              title="Expenses"
              data={expenses}
              add={this.addExpense}
              update={this.updateExpense}
            ></InOutBox>
          </Columns>
          {/* </Container> */}
        </Section>
      </div>

      //     <h2>Financial Statement</h2>
      //     <h3>Income Statement</h3>
      //     <Box title="Income" data={income} />
      //     <Box title="Expenses" data={expenses} />
      //     {/* <h3>Balance Sheet</h3>
      //     <Box title="Assets" data={assets} add={this.addAsset} />
      //     <Box title="Liabilities" data={liabilities} /> */}
      //   </div>
    );
  }
}

export default FinancialStatement;
