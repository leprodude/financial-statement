import React, { Component } from "react";
import "./InOutBox.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCoffee,
  faCheckSquare,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import {
  Heading,
  Columns,
  Container,
  Table,
  Icon,
  Tag,
  Modal,
  Section,
  Button,
  Field,
  Label,
  Control,
  Input,
  Form,
} from "react-bulma-components";
import NewInOutForm from "./NewInOutForm.js";

class InOutBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      entry: { name: "", amount: "", id:"" },
      isEditing: false
    };
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    // this.add = this.add.bind(this);
  }

//   open() {
//     this.setState({ show: true });
//   }
  open(entry, isEditing) {
    this.setState({ show: true, entry: entry, isEditing: isEditing });
  }
  close() {
    this.setState({ show: false });
  }

  //   handleChange(){

  //   }

  //   handleSubmit(){

  //   }

  render() {
    const { title, data, add, update } = this.props;

    const entries = data.map((entry) => (
      <tr onClick={this.open.bind(this, entry, true)}>
        <td>{entry.name}</td>
        <td className={title === "Expenses" ? "has-text-danger" : {}}>
          {entry.amount}
        </td>
      </tr>
    ));

    return (
      <Columns.Column size="6" className="has-background-white">
        <Columns className="is-mobile">
          <Columns.Column size="10" className="has-text-left">
            <Tag.Group gapless>
              <Tag color="black">{title}</Tag>
              <Tag color={title === "Expenses" ? "danger" : "success"}>
                {data.reduce(
                  (total, d) =>
                    d.amount !== undefined ? total + Number(d.amount) : total,
                  0
                )}
              </Tag>
            </Tag.Group>
          </Columns.Column>
          <Columns.Column
            className="InOutBox-hover has-text-right"
            size="2"
            onClick={this.open.bind(
              this,
              { name: "", amount: "", id: "" },
              false
            )}
          >
            <FontAwesomeIcon icon={faPlus} size="xs" />
          </Columns.Column>
        </Columns>
        <Container className="has-background-grey-lighter mb-4">
          <Table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>{entries}</tbody>
          </Table>
        </Container>

        <Modal
          show={this.state.show}
          onClose={this.close}
          closeOnBlur={true}
          showClose={false}
        >
          <Modal.Content>
            <Section style={{ backgroundColor: "white" }}>
              <Container>
                <Heading size={5} renderAs="p">
                  {this.state.isEditing ? "Edit " : "New "}
                  {title === "Expenses" ? "Expense" : "Income"}
                </Heading>

                <NewInOutForm
                  title={title}
                  add={add}
                  update={update}
                  close={this.close}
                  entry={this.state.entry}
                  isEditing={this.state.isEditing}
                />
              </Container>
              {/* <Form>

              <Field>
                <Label>Name</Label>
                <Control>
                  <Input
                    // onChange={this.handleChange}
                    name="name"
                    type="text"
                    placeholder="Job Title / Source of Income"
                    // value={name}
                    />
                </Control>
              </Field>
                    </Form> */}
            </Section>
          </Modal.Content>
        </Modal>
      </Columns.Column>
    );
  }
}

export default InOutBox;
