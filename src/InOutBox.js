import React from "react";
import { useState } from "react";
import "./InOutBox.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import {
  Heading,
  Columns,
  Container,
  Table,
  Tag,
  Modal,
  Section,
} from "react-bulma-components";
import NewInOutForm from "./NewInOutForm.js";

function InOutBox({ title, data, add, remove, edit }) {
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [entry, setEntry] = useState({ name: "", amount: "", id: "" });

  const addEntry = () => {
    setIsEditing(false);
    setShowModal(true);
  };

  const editEntry = (entry) => {
    setEntry(entry);
    setIsEditing(true);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEntry("");
  };

  const entries = data.map((entry) => (
    <tr
      onClick={() => {
        editEntry(entry);
      }}
    >
      <td>{entry.name}</td>
      <td className={title === "Expense" && "has-text-danger"}>
        {entry.amount}
      </td>
    </tr>
  ));

  return (
    <>
      <Columns.Column size="6" className="has-background-white">
        <Columns className="is-mobile">
          <Columns.Column size="10" className="has-text-left">
            <Tag.Group gapless>
              <Tag color="black">{title}</Tag>
              <Tag color={title === "Expense" ? "danger" : "success"}>
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
            onClick={addEntry}
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
          show={showModal}
          onClose={closeModal}
          closeOnBlur={true}
          showClose={false}
        >
          <Modal.Content>
            <Section style={{ backgroundColor: "white" }}>
              <Container>
                <Heading size={5} renderAs="p">
                  {isEditing ? "Edit " : "New "}
                  {title === "Expense" ? "Expense" : "Income"}
                </Heading>

                <NewInOutForm
                  title={title}
                  entry={entry}
                  add={add}
                  edit={edit}
                  closeModal={closeModal}
                  isEditing={isEditing}
                />
              </Container>
            </Section>
          </Modal.Content>
        </Modal>
      </Columns.Column>
    </>
  );
}

export default InOutBox;
