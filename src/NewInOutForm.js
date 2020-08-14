import React from "react";
import useInputState from "./hooks/useInputState";
import "./NewInOutForm.css";

function NewInOutForm({ title, entry, add, edit, closeModal, isEditing }) {
  const [name, handleChangeName, resetName] = useInputState(entry.name);
  const [amount, handleChangeAmount, resetAmount] = useInputState(entry.amount);
  const [id, handleChangeId, resetId] = useInputState(entry.id);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    isEditing ? edit(id, name, amount) : add(name, amount);
    closeModal();
  }

  return (
    <>
      <form
        className="NewInOutForm"
        onSubmit={handleSubmit}
      >
        <div className="control is-inline-block">
          <input
            type="text"
            placeholder={
              title === "Expense"
                ? "Expense Name"
                : "Job Title / Source of Income"
            }
            id="name"
            name="name"
            value={name}
            onChange={handleChangeName}
            autoFocus
          />
        </div>
        <div className="control is-inline-block">
          <input
            type="text"
            placeholder="e.g. 2000"
            id="amount"
            name="amount"
            value={amount}
            onChange={handleChangeAmount}
          />
        </div>
        <div className="control">
          <button className="button submit is-dark is-small">
            {isEditing ? "Edit" : "Add"} {title === "Expense" ? "Expense" : "Income"}
          </button>
        </div>
      </form>
    </>
  );
}

export default NewInOutForm;