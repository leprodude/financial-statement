import { FinancialType, Financial, Financials } from "../FinancialTypes";

export type Actions = 
  | { type: "ADD", financialType: FinancialType, newFinancial: Financial}
  | { type: "REMOVE", financialType: FinancialType, id: string}
  | { type: "EDIT", financialType: FinancialType, editedFinancial: Financial}

type State = Financials;

const reducer = (state: State, action: Actions) => {

  let financialType: FinancialType = action.financialType;
  switch (action.type) {
    case "ADD":
      const newFinancial: Financial = action.newFinancial as Financial;
      return {
        ...state,
        [financialType]: [
          ...state[financialType],
          {
            // destructuring only uses arguments that get passed in
            // different for income/asset/liability --> makes it awesomely general
            ...newFinancial,
          },
        ],
      };
    case "REMOVE":
      return {
        ...state,
        [financialType]: (state[financialType] as Financial[]).filter((d) => d.id !== action.id),
      };
    case "EDIT":
      const editedFinancial = action.editedFinancial;
      return {
        ...state,
        [financialType]: (state[financialType] as Financial[]).map((d: Financial) =>
          d.id === editedFinancial.id ? { ...editedFinancial } : d
        ),
      };
    default:
      return state;
  }
};

export default reducer;