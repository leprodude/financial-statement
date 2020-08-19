import React, { useState, useContext } from "react";
import { FinancialsContext } from "./contexts/FinancialsContext";
import { FormContext } from "./contexts/FormContext";
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
  financials,
  style,
  size = 6,
}) {
  const { incomes, expenses, assets, liabilities } = useContext(
    FinancialsContext
  );

  const { showModal, toggleShowModal, entry, setEntry } = useContext(
    FormContext
  );

  const { type, data, add, remove, edit } = financials;
  
  const getEntries = function (financials) {
    const type = financials.type;
    const entries = financials.data.map((entry) => (
      <tr
        onClick={() => {
            setEntry({ ...entry, type });
            toggleShowModal();
        }}
      >
        <td>{entry.name}</td>
        <td
          className={
            (financials.type === "expense" ||
              financials.type === "liability") &&
            "has-text-danger"
          }
        >
          {(financials.type === "income" || financials.type === "expense") &&
            entry.amount}
          {financials.type === "asset" && entry.cost}
          {financials.type === "liability" && entry.principal}
        </td>
      </tr>
    ));
    return entries;
  };

  const entries = [...getEntries(financials)];

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
              <Tag color="black">{type}</Tag>
              <Tag
                color={
                  type === "expense" ||
                  type === "liability"
                    ? "danger"
                    : "success"
                }
              >
                {(type === "income" ||
                  type === "expense") &&
                  totalAmount}
              </Tag>
            </Tag.Group>
          </Columns.Column>
          <Columns.Column
            className="InOutBox-hover has-text-right"
            size="2"
            onClick={() => {
              setEntry({ type });
              toggleShowModal();
            }}
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
                    {(type === "income" ||
                      type === "expense") &&
                      "Amount"}
                    {type === "asset" && "Cost"}
                    {type === "liability" && "Principal"}
                  </th>
                </tr>
              </thead>
              <tbody>{entries}</tbody>
            </Table>
          </Container>
        )}

        <Modal
          show={showModal}
          onClose={() => {
            setEntry({});
            toggleShowModal();
          }}
          closeOnBlur={true}
          showClose={false}
        >
          <Modal.Content>
            <Section style={{ backgroundColor: "white" }}>
              <Container>
                <Heading size={5} renderAs="p">
                  {entry.id ? "Edit " : "New "}
                  {entry.type}
                </Heading>

                <NewInOutForm/>
              </Container>
            </Section>
          </Modal.Content>
        </Modal>
      </Columns.Column>
    </>
  );
}

export default InOutBox;
