import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default (initialFinancials) => {
  const [financials, setFinancials] = useState(initialFinancials);

  const addFinancial = (name, amount) => {
    setFinancials([
      ...financials,
      {
        name: name,
        amount: amount,
        id: uuidv4(),
      },
    ]);
  };
  
  const removeFinancial = (id) => {
    setFinancials(financials.filter((f) => f.id !== id));
  };
  
  const editFinancial = (id, newName, newAmount) => {
    setFinancials(
      financials.map((f) =>
        f.id === id ? { ...f, name: newName, amount: newAmount } : f
      )
    );
  };

  return [financials, addFinancial, removeFinancial, editFinancial];
};
