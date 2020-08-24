import React, { useContext } from "react";
import useInputState from "./hooks/useInputState";
import { DispatchContext } from "./contexts/FinancialsContext";
import { FormContext } from "./contexts/FormContext";
import NumberInput from "./NumberInput";
import "./NewInOutForm.css";

function NewInOutForm() {
  const dispatch = useContext(DispatchContext);

  const { toggleShowModal, entry } = useContext(FormContext);
  const { financialType } = entry;
  const isEditing = entry.id !== undefined;

  const [name, handleChangeName] = useInputState(entry.name);
  const [amount, handleChangeAmount] = useInputState(entry.amount);
  const [cost, handleChangeCost] = useInputState(entry.cost);
  const [downpay, handleChangeDownpay] = useInputState(entry.downpay);
  const [cashflow, handleChangeCashflow] = useInputState(entry.cashflow);
  const [principal, handleChangePrincipal] = useInputState(entry.principal);
  const [interest, handleChangeInterest] = useInputState(entry.interest);

  const [id] = useInputState(entry.id);

  const handleSubmit = (evt) => {
    evt.preventDefault();

    switch (financialType) {
      case "income":
      case "expense":
        isEditing
          ? dispatch({
              type: "EDIT",
              financialType: financialType,
              editedFinancial: { id, name, amount },
            })
          : dispatch({
              type: "ADD",
              financialType: financialType,
              newFinancial: {
                name,
                amount,
              },
            });
        break;
      case "asset":
        isEditing
          ? dispatch({
              type: "EDIT",
              financialType: financialType,
              editedFinancial: {
                id,
                name,
                cost,
                downpay,
                cashflow,
              },
            })
          : dispatch({
              type: "ADD",
              financialType: financialType,
              newFinancial: { name, cost, downpay, cashflow },
            });
        break;
      case "liability":
        isEditing
          ? dispatch({
              type: "EDIT",
              financialType: financialType,
              editedFinancial: {
                id,
                name,
                principal,
                interest,
                monthly: Number(((principal * interest) / 12).toFixed(2)),
              },
            })
          : dispatch({
              type: "ADD",
              financialType: financialType,
              newFinancial: {
                name,
                principal,
                interest,
                monthly: Number(((principal * interest) / 12).toFixed(2)),
              },
            });
        break;
      default:
        console.log("Title does not match Income/Expense/Asset/Liability...");
    }

    toggleShowModal();
  };

  const handleRemove = (evt) => {
    evt.preventDefault();
    dispatch({ type: "REMOVE", financialType: financialType, id: id });
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
              placeholder={financialType}
              id="name"
              name="name"
              value={name}
              onChange={handleChangeName}
              required
              autoFocus
            />
          </div>
        </div>

        {(financialType === "income" || financialType === "expense") && (
          <NumberInput
            label={"Amount"}
            name={"amount"}
            value={amount}
            onChange={handleChangeAmount}
          />
        )}

        {financialType === "asset" && (
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

        {financialType === "liability" && (
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
            <div class="field is-inline-block">
              <label class="label">Monthly</label>

              <div className="control">
                <label class="label">
                  {principal && interest
                    ? Number(((principal * interest) / 12).toFixed(2))
                    : "0"}
                </label>
              </div>
            </div>
          </>
        )}

        <div class="field is-inline-block">
          <div className="control">
            <button className="button submit is-dark is-small">
              {isEditing ? "Edit" : "Add"} {financialType}
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
                Delete {financialType}
              </button>
            </div>
          </div>
        )}
      </form>
    </>
  );
}

export default NewInOutForm;
