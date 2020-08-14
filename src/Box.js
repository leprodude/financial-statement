import React, { Component } from "react";
import NewAssetForm from "./NewAssetForm.js";
import "./Box.css";

class Box extends Component {
  render() {
    const tableHead = (
      <tr>
        <th>Name</th>
        <th>Amount</th>
      </tr>
    );

    const entries = this.props.data.map((entry) => (
      <tr>
        <td>{entry.name}</td>
        <td style={this.props.title === "Expenses"? {color: "red"}: {}}>{entry.amount}</td>
      </tr>
    ));
    return (
      <div>
        <p>{this.props.title}</p>
        {/* <button onClick={this.props.add}>add</button> */}
        <table>
          {tableHead}
          {entries}
        </table>
      </div>
    );
  }
}

export default Box;
