import { v4 as uuidv4 } from "uuid";
import { FinancialType, IFinancials } from "./Financials";

const InitialFinancials: IFinancials = {
  income: [
    { _type: FinancialType.INCOME, name: "Lawyer Salary", cashflow: 6000, _id: uuidv4() },
    { _type: FinancialType.INCOME, name: "Music", cashflow: 200, _id: uuidv4() },
  ],
  expense: [
    { _type: FinancialType.EXPENSE, name: "Living Expenses", cashflow: -2000, _id: uuidv4() },
    { _type: FinancialType.EXPENSE, name: "Fun", cashflow: -200, _id: uuidv4() },
  ],
  asset: [
    {
      _type: FinancialType.ASSET,
      name: "Campervan",
      cost: 40000,
      downpay: 40000,
      cashflow: 400,
      _id: uuidv4(),
    },
    {
      _type: FinancialType.ASSET,
      name: "Flat",
      cost: 80000,
      downpay: 20000,
      cashflow: 350,
      _id: uuidv4(),
    },
  ],
  liability: [
    {
      _type: FinancialType.LIABILITY,
      name: "Car loans",
      principal: 11000,
      interest: 0.05,
      cashflow: -45.83,
      _id: uuidv4(),
    },
  ]
}

export default InitialFinancials