import React from "react";
import useInputState from "./hooks/useInputState";
import "./NewInOutForm.css";

function NewInOutForm({ title, entry, add, remove, edit, closeModal, isEditing }) {
  const [name, handleChangeName, resetName] = useInputState(entry.name);
  const [amount, handleChangeAmount, resetAmount] = useInputState(entry.amount);
  const [id, handleChangeId, resetId] = useInputState(entry.id);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    isEditing ? edit(id, name, amount) : add(name, amount);
    closeModal();
  };

  const handleRemove = (evt) => {
    evt.preventDefault();
    remove(id);
    closeModal();
  }

  return (
    <>
      <form className="NewInOutForm" onSubmit={handleSubmit}>
        <div class="field is-inline-block">
          <label class="label">Name</label>

          <div className="control">
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
        </div>

        <div class="field is-inline-block">
          <label class="label">Amount</label>

          <div className="control">
            <input
              type="text"
              placeholder="e.g. 2000"
              id="amount"
              name="amount"
              value={amount}
              onChange={handleChangeAmount}
            />
          </div>
        </div>

        <div class="field is-inline-block">
          <div className="control">
            <button className="button submit is-dark is-small">
              {isEditing ? "Edit" : "Add"}{" "}
              {title === "Expense" ? "Expense" : "Income"}
            </button>
          </div>
        </div>
        {isEditing && (
          <div class="field is-inline-block">
            <div className="control has-text-right">
              <button onClick={handleRemove} className="button submit is-danger is-small">
                Delete {title === "Expense" ? "Expense" : "Income"}
              </button>
            </div>
          </div>
        )}
      </form>
    </>
  );
}

export default NewInOutForm;
