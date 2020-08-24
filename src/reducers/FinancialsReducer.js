import { v4 as uuidv4 } from "uuid";

const reducer = (state, action) => {
  const financialType = action.financialType;
  switch (action.type) {
    case "ADD":
      const newFinancial = action.newFinancial;
      return {
        ...state,
        [financialType]: [
          ...state[financialType],
          {
            id: uuidv4(),
            // destructuring only uses arguments that get passed in
            // different for income/asset/liability --> makes it awesomely general
            ...newFinancial,
          },
        ],
      };
    case "REMOVE":
      console.log("REMOVE");
      return {
        ...state,
        [financialType]: state[financialType].filter((d) => d.id !== action.id),
      };
    case "EDIT":
      const editedFinancial = action.editedFinancial;
      return {
        ...state,
        [financialType]: state[financialType].map((d) =>
          d.id === editedFinancial.id ? { ...editedFinancial } : d
        ),
      };
    default:
      return state;
  }
};

export default reducer;

// export default (key, initialFinancials) => {
//   const [financials, setFinancials] = useLocalStorageState(
//     key,
//     initialFinancials
//   );

//   //   return [financials, addFinancial, removeFinancial, editFinancial];
//   return {
//     type: key,
//     data: financials,
//     add: addFinancial,
//     remove: removeFinancial,
//     edit: editFinancial,
//   };
// };
