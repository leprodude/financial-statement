import React, { useContext } from "react";
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

function InOutBox({ financialType, style, size = 6 }) {

  const financials = useContext(FinancialsContext);

  const { showModal, toggleShowModal, entry, setEntry } = useContext(
    FormContext
  );

  const getEntries = function (financialType, columnData) {

    const entries = financials[financialType].map((entry) => (
      <tr
        onClick={() => {
          setEntry({ ...entry, financialType });
          toggleShowModal();
        }}
      >
        <td>{entry.name}</td>
        <td
          className={
            (financialType === "expense" ||
              financialType === "liability") &&
            "has-text-danger"
          }
        >
          {entry[columnData]}
        </td>
      </tr>
    ));
    return entries;
  };

  const getTotal = function (financialType, columnData) {

    const total = financials[financialType].reduce(
      (total, d) =>
        d[columnData] !== undefined ? total + Number(d[columnData]) : total,
      0
    );
    return total;
  };

  let entries;
  if (financialType === "income") {
    entries = [
      ...getEntries("income", "amount"),
      ...getEntries("asset", "cashflow"),
    ];
  }
  if (financialType === "expense") {
    entries = [
      ...getEntries("expense", "amount"),
      ...getEntries("liability", "monthly"),
    ];
  }
  if (financialType === "asset") {
    entries = [...getEntries("asset", "cost")];
  }
  if (financialType === "liability") {
    entries = [...getEntries("liability", "principal")];
  }

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
              <Tag color="black">{financialType}</Tag>
              <Tag
                color={
                  financialType === "expense" || financialType === "liability"
                    ? "danger"
                    : "success"
                }
              >
                {financialType === "income" &&
                  getTotal("income", "amount") +
                    getTotal("asset", "cashflow")}
                {financialType === "expense" &&
                  getTotal("expense", "amount") +
                    getTotal("liability", "monthly")}
              </Tag>
            </Tag.Group>
          </Columns.Column>
          <Columns.Column
            className="InOutBox-hover has-text-right"
            size="2"
            onClick={() => {
              setEntry({ financialType });
              toggleShowModal();
            }}
          >
            <FontAwesomeIcon icon={faPlus} size="xs" />
          </Columns.Column>
        </Columns>

        {financials[financialType].length !== 0 && (
          <Container className="has-background-grey-lighter mb-4">
            <Table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>
                    {(financialType === "income" ||
                      financialType === "expense") &&
                      "Amount"}
                    {financialType === "asset" && "Cost"}
                    {financialType === "liability" && "Principal"}
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
                  {entry.financialType}
                </Heading>

                <NewInOutForm />
              </Container>
            </Section>
          </Modal.Content>
        </Modal>
      </Columns.Column>
    </>
  );
}

export default InOutBox;
