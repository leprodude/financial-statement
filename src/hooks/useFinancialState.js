import useLocalStorageState from "./useLocalStorageState";
import { v4 as uuidv4 } from "uuid";

export default (key, initialFinancials) => {
  const [financials, setFinancials] = useLocalStorageState(key, initialFinancials);

  const addFinancial = (newFinancial) => {
    setFinancials([
      ...financials,
      {
        id: uuidv4(),
        // destructuring only uses arguments that get passed in
        // different for income/asset/liability --> makes it awesomely general
        ...newFinancial, 
      },
    ]);
  };

  const removeFinancial = (id) => {
    setFinancials(financials.filter((f) => f.id !== id));
  };

  const editFinancial = (editedFinancial) => {
    setFinancials(
      financials.map((financial) =>
        financial.id === editedFinancial.id ? { ...editedFinancial } : financial
      )
    );
  };

  return [financials, addFinancial, removeFinancial, editFinancial];
};
