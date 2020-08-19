import React, { useContext } from "react";
import useInputState from "./hooks/useInputState";
import { FinancialsContext } from "./contexts/FinancialsContext";
import { FormContext } from "./contexts/FormContext";
import NumberInput from "./NumberInput";
import "./NewInOutForm.css";

function NewInOutForm() {
  const { incomes, expenses, assets, liabilities } = useContext(
    FinancialsContext
  );
  const { showModal, toggleShowModal, entry, setEntry } = useContext(
    FormContext
  );
  const {type} = entry;
  const isEditing = entry.id !== undefined;

  const [name, handleChangeName, resetName] = useInputState(entry.name);
  const [amount, handleChangeAmount, resetAmount] = useInputState(entry.amount);
  const [cost, handleChangeCost, resetCost] = useInputState(entry.cost);
  const [downpay, handleChangeDownpay, resetDownpay] = useInputState(
    entry.downpay
  );
  const [cashflow, handleChangeCashflow, resetCashflow] = useInputState(
    entry.cashflow
  );
  const [principal, handleChangePrincipal, resetPrincipal] = useInputState(
    entry.principal
  );
  const [interest, handleChangeInterest, resetInterest] = useInputState(
    entry.interest
  );
  const [id, handleChangeId, resetId] = useInputState(entry.id);

  const handleSubmit = (evt) => {
    evt.preventDefault();

    switch (type) {
      case "income":
        isEditing
          ? incomes.edit({ id, name, amount })
          : incomes.add({ name, amount });
        break;
      case "expense":
        isEditing
          ? expenses.edit({ id, name, amount })
          : expenses.add({ name, amount });
        break;
      case "asset":
        isEditing
          ? assets.edit({ id, name, cost, downpay, cashflow })
          : assets.add({ name, cost, downpay, cashflow });
        break;
      case "liability":
        isEditing
          ? liabilities.edit({ id, name, principal, interest })
          : liabilities.add({ name, principal, interest });
        break;
      default:
        console.log("Title does not match Income/Expense/Asset/Liability...");
    }

    toggleShowModal();
  };

  const handleRemove = (evt) => {
    evt.preventDefault();

    switch (type) {
      case "income":
        incomes.remove(entry.id);
        break;
      case "expense":
        expenses.remove(entry.id);
        break;
      case "asset":
       assets.remove(entry.id);
        break;
      case "liability":
        liabilities.remove(entry.id);
        break;
      default:
        console.log("Title does not match Income/Expense/Asset/Liability...");
    }


    toggleShowModal();
  };

  return (
    <>
      <form className="NewInOutForm" onSubmit={handleSubmit}>
        <div class="field is-inline-block">
          <label class="label">Name</label>

          <div className="control">
            <input
              type="text"
              placeholder={type}
              id="name"
              name="name"
              value={name}
              onChange={handleChangeName}
              required
              autoFocus
            />
          </div>
        </div>

        {(type === "income" || type === "expense") && (
          <NumberInput
            label={"Amount"}
            name={"amount"}
            value={amount}
            onChange={handleChangeAmount}
          />
        )}

        {type === "asset" && (
          <>
            <NumberInput
              label="Cost"
              name="cost"
              value={cost}
              onChange={handleChangeCost}
            />
            <NumberInput
              label="Downpay"
              name="downpay"
              value={downpay}
              onChange={handleChangeDownpay}
            />
            <NumberInput
              label="Cashflow"
              name="cashflow"
              value={cashflow}
              onChange={handleChangeCashflow}
            />
          </>
        )}

        {type === "liability" && (
          <>
            <NumberInput
              label="Principal"
              name="principal"
              value={principal}
              onChange={handleChangePrincipal}
            />
            <NumberInput
              label="Interest"
              pattern="[0-1]{1}[.]?[0-9]{0,2}"
              placeholder="e.g. 0.12"
              name="interest"
              value={interest}
              onChange={handleChangeInterest}
            />
            <NumberInput visible={false} />
          </>
        )}

        <div class="field is-inline-block">
          <div className="control">
            <button className="button submit is-dark is-small">
              {isEditing ? "Edit" : "Add"} {type}
            </button>
          </div>
        </div>
        {isEditing && (
          <div class="field is-inline-block">
            <div className="control has-text-right">
              <button
                onClick={handleRemove}
                className="button submit is-danger is-small"
              >
                Delete {type}
              </button>
            </div>
          </div>
        )}
      </form>
    </>
  );
}

export default NewInOutForm;
