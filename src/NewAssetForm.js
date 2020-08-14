import React, { Component } from "react";
// import uuid from "uuid/v4";
// import "./NewAssetForm.css";

class NewAssetForm extends Component {
  constructor(props) {
    super(props);
    this.state = { name: "", cost: 0, downpay: 0, cashflow: 0 };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  }
  handleSubmit(evt) {
//     evt.preventDefault();
//     this.props.createTodo({ ...this.state, id: uuid(), completed: false });
//     this.setState({ task: "" });
  }
  render() {
    return (
      <form className="NewAssetForm" onSubmit={this.handleSubmit}>
        <label htmlFor="asset">New Asset</label>
        <input
          type="text"
          placeholder="New Asset"
          id="name"
          name="name"
          value={this.state.name}
          onChange={this.handleChange}
        />
        <button>Add Asset</button>
      </form>
    );
  }
}
export default NewAssetForm;
