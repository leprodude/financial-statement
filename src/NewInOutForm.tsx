import React, { useContext } from "react";
import useInputState from "./hooks/useInputState";
import { DispatchContext } from "./contexts/FinancialsContext";
import { FormContext } from "./contexts/FormContext";
import NumberInput from "./NumberInput";
import "css/NewInOutForm.scss";
import { Actions } from "./reducers/FinancialsReducer";
import { Financial, FinancialType, IAsset, ILiability } from "./Financials";
import { SubmitButton } from "./SubmitButton";
import { RemoveButton } from "./RemoveButton";

interface NewInOutFormProps {
  reset: () => void
}

const NewInOutForm: React.FC<NewInOutFormProps> = ({ reset }) => {
  const dispatch = useContext(DispatchContext) as React.Dispatch<Actions>;

  const { toggleShowModal, entry, setEntry, isEditing } = useContext(FormContext);
  const financialType = entry!._type;

  const [name, handleChangeName] = useInputState(entry!.name!);
  const [cashflow, handleChangeCashflow] = useInputState(entry!.cashflow!);
  const [cost, handleChangeCost] = useInputState((entry as IAsset).cost);
  const [downpay, handleChangeDownpay] = useInputState((entry as IAsset).downpay);
  const [principal, handleChangePrincipal] = useInputState((entry as ILiability).principal);
  const [interest, handleChangeInterest] = useInputState((entry as ILiability).interest);


  function handleSubmit(evt: React.FormEvent<HTMLFormElement>): void {
    evt.preventDefault();

    let newEntry: Financial = JSON.parse(JSON.stringify(entry!)); // clone entry

    newEntry.name = name as string;
    newEntry.cashflow = cashflow as number;

    if (newEntry?._type === FinancialType.ASSET) {
      newEntry.cost = cost as number;
      newEntry.downpay = downpay as number;
    }
    if (newEntry?._type === FinancialType.LIABILITY) {
      newEntry.cashflow = Number(-((principal as number * (interest as number)) / 12).toFixed(2));
      newEntry.principal = principal as number;
      newEntry.interest = interest as number;
    }

    setEntry!(newEntry);

    if (isEditing) {
      dispatch({ type: "EDIT", financial: newEntry })
    } else {
      dispatch({ type: "ADD", financial: newEntry })
    }

    reset();
    toggleShowModal!();
  };

  function handleRemove(evt: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
    evt.preventDefault();
    dispatch({ type: "REMOVE", financial: entry! });
    reset();
    toggleShowModal!();
  };

  return (
    <>
      <form className="NewInOutForm" onSubmit={handleSubmit}>
        <div className="field is-inline-block">
          <label className="label" htmlFor="name">Name</label>

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

        {financialType !== FinancialType.LIABILITY && (
          <NumberInput
            label={"Cashflow"}
            name={"cashflow"}
            value={cashflow}
            onChange={handleChangeCashflow}
          />
        )}

        {financialType === FinancialType.ASSET && (
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
          </>
        )}

        {financialType === FinancialType.LIABILITY && (
          <>
            <div className="field is-inline-block">
              <label className="label" htmlFor="cashflow">Cashflow</label>

              <div className="control">
                <label className="label" data-testid="cashflow-generated">
                  {principal && interest
                    ? Number(-((principal as number * (interest as number)) / 12).toFixed(2))
                    : "0"}
                </label>
              </div>
            </div>
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
          </>
        )}


        <SubmitButton text={(isEditing ? `Edit ${financialType}` : `Add ${financialType}`)} />

        {isEditing && (
          <RemoveButton text={`Remove ${financialType}`} handleRemove={handleRemove} />
        )}
      </form>
    </>
  );
}

export default NewInOutForm;
