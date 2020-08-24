import { v4 as uuidv4 } from "uuid";

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
    monthly: 45.83,
    id: uuidv4(),
  },
];

export {
  initialIncomes,
  initialExpenses,
  initialAssets,
  initialLiabilities,
};