import { v4 as uuidv4 } from "uuid";
import { FinancialType, IFinancials } from "./Financials";

export const initialFinancials: IFinancials = {
  income: [
    { _type: FinancialType.INCOME, name: "Programmieren", cashflow: 6000, id: uuidv4() },
    { _type: FinancialType.INCOME, name: "Musik", cashflow: 200, id: uuidv4() },
  ],
  expense: [
    { _type: FinancialType.EXPENSE, name: "Lebenskosten", cashflow: -2000, id: uuidv4() },
    { _type: FinancialType.EXPENSE, name: "Spaß", cashflow: -200, id: uuidv4() },
  ],
  asset: [
    {
      _type: FinancialType.ASSET,
      name: "Campervan",
      cost: 40000,
      downpay: 40000,
      cashflow: 400,
      id: uuidv4(),
    },
    {
      _type: FinancialType.ASSET,
      name: "Wohnung",
      cost: 80000,
      downpay: 20000,
      cashflow: 350,
      id: uuidv4(),
    },
  ],
  liability: [
    {
      _type: FinancialType.LIABILITY,
      name: "Car loans",
      principal: 11000,
      interest: 0.05,
      cashflow: -45.83,
      id: uuidv4(),
    },
  ]

}