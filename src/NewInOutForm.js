import React from "react";
import useInputState from "./hooks/useInputState";
import NumberInput from "./NumberInput";
import "./NewInOutForm.css";

function NewInOutForm({
  title,
  entry,
  add,
  remove,
  edit,
  closeModal,
  isEditing,
  isIncome,
  isExpense,
  isAsset,
  isLiability,
}) {
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

    switch (title) {
      case "Income":
      case "Expense":
        console.log("in Income Expense title switch: " + title, name, amount);
        isEditing ? edit({id, name, amount}) : add({name, amount});
        break;
      case "Asset":
        isEditing
          ? edit({id, name, cost, downpay, cashflow})
          : add({name, cost, downpay, cashflow});
        break;
      case "Liability":
        isEditing
          ? edit({id, name, principal, interest})
          : add({name, principal, interest});
        break;
      default: console.log("Title does not match Income/Expense/Asset/Liability...");
    }

    closeModal();
  };

  const handleRemove = (evt) => {
    evt.preventDefault();
    remove(id);
    closeModal();
  };

  return (
    <>
      <form className="NewInOutForm" onSubmit={handleSubmit}>
        <div class="field is-inline-block">
          <label class="label">Name</label>

          <div className="control">
            <input
              type="text"
              placeholder={title}
              id="name"
              name="name"
              value={name}
              onChange={handleChangeName}
              required
              autoFocus
            />
          </div>
        </div>

        {(isIncome || isExpense) && (
          <NumberInput
            label={"Amount"}
            name={"amount"}
            value={amount}
            onChange={handleChangeAmount}
          />
        )}

        {isAsset && (
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

        {isLiability && (
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
              {isEditing ? "Edit" : "Add"} {title}
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
                Delete {title}
              </button>
            </div>
          </div>
        )}
      </form>
    </>
  );
}

export default NewInOutForm;
