import React, { useContext } from "react";
import useInputState from "./hooks/useInputState";
import { DispatchContext } from "./contexts/FinancialsContext";
import { FormContext } from "./contexts/FormContext";
import NumberInput from "./NumberInput";
import "./NewInOutForm.css";
import { v4 as uuidv4 } from "uuid";
import { Actions } from "./reducers/FinancialsReducer";

interface NewInOutFormProps {
  reset: React.Dispatch<React.SetStateAction<{}>>
}

const NewInOutForm: React.FC<NewInOutFormProps> = ({reset}) => {
  const dispatch = useContext(DispatchContext) as React.Dispatch<Actions>;

  const { toggleShowModal, entry } = useContext(FormContext);
  const financialType = entry!._type;

  const isEditing = (entry!.id !== undefined);
  // console.log("isEditing: " + isEditing);


  const [name, handleChangeName] = useInputState(entry!.name!);
  const [amount, handleChangeAmount] = useInputState(entry!.amount!);
  const [cost, handleChangeCost] = useInputState(entry!.cost!);
  const [downpay, handleChangeDownpay] = useInputState(entry!.downpay!);
  const [cashflow, handleChangeCashflow] = useInputState(entry!.cashflow!);
  const [principal, handleChangePrincipal] = useInputState(entry!.principal!);
  const [interest, handleChangeInterest] = useInputState(entry!.interest!);

  let id: string;
  if (entry!.id !== undefined) {
    id = entry!.id;
  } else {
    id = uuidv4();
  }

  function handleSubmit(evt: React.FormEvent<HTMLFormElement>): void {
    evt.preventDefault();

    switch (financialType) {
      case "income":
      case "expense":
        isEditing
          ? dispatch({
            type: "EDIT",
            financialType: financialType,
            editedFinancial: {
              _type: financialType,
              id: id,
              name: name as string,
              amount: amount as number
            },
          })
          : dispatch({
            type: "ADD",
            financialType: financialType,
            newFinancial: {
              _type: financialType,
              id: uuidv4(),
              name: name as string,
              amount: amount as number
            },
          });
        break;
      case "asset":
        isEditing
          ? dispatch({
            type: "EDIT",
            financialType: financialType,
            editedFinancial: {
              _type: financialType,
              id: id,
              name: name as string,
              cost: cost as number,
              downpay: downpay as number,
              cashflow: cashflow as number
            },
          },
          )
          : dispatch({
            type: "ADD",
            financialType: financialType,
            newFinancial: {
              _type: financialType,
              id: uuidv4(),
              name: name as string,
              cost: cost as number,
              downpay: downpay as number,
              cashflow: cashflow as number,
            },
          });
        break;
      case "liability":
        isEditing
          ? dispatch({
            type: "EDIT",
            financialType: financialType,
            editedFinancial: {
              _type: financialType,
              id: id,
              name: name as string,
              principal: principal as number,
              interest: interest as number,
              monthly: Number(((principal as number * (interest as number)) / 12).toFixed(2)),
            },
          })
          : dispatch({
            type: "ADD",
            financialType: financialType,
            newFinancial: {
              _type: financialType,
              id: id,
              name: name as string,
              principal: principal as number,
              interest: interest as number,
              monthly: Number(((principal as number * (interest as number)) / 12).toFixed(2)),
            },
          });
        break;
      default:
        console.log("Title does not match Income/Expense/Asset/Liability...");
    }
    reset({});
    toggleShowModal!();
  };

  function handleRemove(evt: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
    evt.preventDefault();
    dispatch({ type: "REMOVE", financialType: financialType!, id: id });
    reset({});
    toggleShowModal!();
  };

  return (
    <>
      <form className="NewInOutForm" onSubmit={handleSubmit}>
        <div className="field is-inline-block">
          <label className="label">Name</label>

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
            <div className="field is-inline-block">
              <label className="label">Monthly</label>

              <div className="control">
                <label className="label">
                  {principal && interest
                    ? Number(((principal as number * (interest as number)) / 12).toFixed(2))
                    : "0"}
                </label>
              </div>
            </div>
          </>
        )}

        <div className="field is-inline-block">
          <div className="control">
            <button className="button submit is-dark is-small">
              {isEditing ? "Edit" : "Add"} {financialType}
            </button>
          </div>
        </div>
        {isEditing && (
          <div className="field is-inline-block">
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
