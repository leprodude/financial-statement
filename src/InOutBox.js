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

function InOutBox({
  title,
  data,
  add,
  remove,
  edit,
  style,
  size = 6,
  isIncome,
  isExpense,
  isAsset,
  isLiability,
}) {
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [entry, setEntry] = useState({});

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
    setEntry({});
  };

  const entries = data.map((entry) => (
    <tr
      onClick={() => {
        editEntry(entry);
      }}
    >
      <td>{entry.name}</td>
      <td className={(isExpense || isLiability) && "has-text-danger"}>
        {(isIncome || isExpense) && entry.amount}
        {isAsset && entry.cost}
        {isLiability && entry.principal}
      </td>
    </tr>
  ));

  const totalAmount = data.reduce(
    (total, d) => (d.amount !== undefined ? total + Number(d.amount) : total),
    0
  );

  return (
    <>
      <Columns.Column
        size={size}
        className="has-background-white"
        style={style}
      >
        <Columns className="is-mobile">
          <Columns.Column size="10" className="has-text-left">
            <Tag.Group gapless>
              <Tag color="black">{title}</Tag>
              <Tag color={isExpense || isLiability ? "danger" : "success"}>
                {(isIncome || isExpense) && totalAmount}
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

        {data.length !== 0 && (
          <Container className="has-background-grey-lighter mb-4">
            <Table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>
                    {(isIncome || isExpense) && "Amount"}
                    {isAsset && "Cost"}
                    {isLiability && "Principal"}
                  </th>
                </tr>
              </thead>
              <tbody>{entries}</tbody>
            </Table>
          </Container>
        )}

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
                  {title}
                </Heading>

                <NewInOutForm
                  title={title}
                  entry={entry}
                  add={add}
                  remove={remove}
                  edit={edit}
                  closeModal={closeModal}
                  isEditing={isEditing}
                  isIncome={isIncome}
                  isExpense={isExpense}
                  isAsset={isAsset}
                  isLiability={isLiability}
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
