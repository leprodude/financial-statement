import { Financial, IFinancials } from "../Financials";

export type Actions = 
  | { type: "ADD", financial: Financial}
  | { type: "REMOVE", financial: Financial}
  | { type: "EDIT", financial: Financial}

type State = IFinancials;

const reducer = (state: State, action: Actions) => {
  let financial: Financial = action.financial;

  switch (action.type) {
    case "ADD":
      return {
        ...state,
        [financial._type]: [...state[financial._type], {...financial}]
      };
    case "REMOVE":
      return {
        ...state,
        [financial._type]: (state[financial._type] as Financial[]).filter((f) => f._id !== financial._id),
      };
    case "EDIT":
      return {
        ...state,
        [financial._type]: (state[financial._type] as Financial[]).map((f) =>
          f._id === financial._id ? { ...financial } : f
        ),
      };
    default:
      return state;
  }
};

export default reducer;