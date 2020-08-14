import React, { Component } from "react";
import { v4 as uuidv4 } from "uuid";
import "./NewInOutForm.css";
import {
  Button,
  Modal,
  Field,
  Control,
  Label,
  Input,
} from "react-bulma-components";

class NewInOutForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.entry.name,
      amount: this.props.entry.amount,
      id: this.props.entry.id,
      isEditing: this.props.isEditing
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(evt) {
    const value = evt.target.value;
    this.setState({
      [evt.target.name]: value,
    });
  }

  handleSubmit(evt) {
    evt.preventDefault();

    const { name, amount, id, isEditing } = this.state;
    if(isEditing){
      this.props.update(id, {name: name, amount:amount, id:id});
    }else{
      this.props.add({ name: name, amount: Number(amount), id: (id || uuidv4()) });
    }

    this.setState({ name: "", amount: "", id:"", isEditing:false });
    this.props.close();
  }

  render() {
    const { name, amount, id, isEditing } = this.state;
    const isIncome = this.props.title === "Income";
    return (
      <form className="NewInOutForm" onSubmit={this.handleSubmit}>
        <div className="control is-inline-block">
          <input
            type="text"
              placeholder={
            isIncome
              ? "Job Title / Source of Income"
              : "Expense Name"
              }
            id="name"
            name="name"
              value={name}
            onChange={this.handleChange}
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
            onChange={this.handleChange}
          />
        </div>
        <div className="control">
          <button className="button submit is-dark is-small">
            {isEditing ? "Edit" : "Add" } {isIncome ? "Income" : "Expense"}
          </button>
        </div>
      </form>
    );
  }
}

export default NewInOutForm;
