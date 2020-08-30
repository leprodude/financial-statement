import React, { useContext } from "react";
import { FinancialsContext} from "./contexts/FinancialsContext";
import { FinancialType, Financial } from "./FinancialTypes";
import { FormContext } from "./contexts/FormContext";
import NewInOutForm from "./NewInOutForm";
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
  //@ts-ignore
} from "react-bulma-components";


interface InOutBoxProps {
  financialType: FinancialType,
  style: Object,
  size: number
}


const InOutBox: React.FC<InOutBoxProps> = ({ financialType, style, size = 6 }) => {

  const financials = useContext(FinancialsContext);

  const { showModal, toggleShowModal, entry, setEntry } = useContext(
    FormContext
  );

  const getEntries = function (financialType: FinancialType, columnData: string) {
    const entries = (financials[financialType] as Financial[]).map((entry) => (
      <tr
        onClick={() => {
          setEntry!({ ...entry });
          toggleShowModal!();
        }}
        className="InOutBox-hover"
      >
        <td>
          {entry.name}
          {columnData === "cashflow" && (
            <Tag className="InOutBox-passive-tag is-success is-light">passive</Tag>
          )}
          {columnData === "monthly" && (
            <Tag className="InOutBox-passive-tag is-danger is-light">liability</Tag>
          )}
        </td>
        <td
          className={
            (financialType === "expense" || financialType === "liability") ?
            "has-text-danger" : undefined
          }
        >
          {entry[columnData as keyof Financial]}
        </td>
      </tr>
    ));
    return entries;
  };

  const getTotal = function (financialType: FinancialType, columnData:string) {
    const total = (financials[financialType] as Financial[]).reduce(
      (total, d) =>
        d[columnData as keyof Financial] !== undefined ? total + Number(d[columnData as keyof Financial]) : total,
      0
    );
    return total;
  };

  let entries;
  if (financialType === FinancialType.INCOME) {
    entries = [
      ...getEntries(FinancialType.INCOME, "amount"),
      ...getEntries(FinancialType.ASSET, "cashflow"),
    ];
  }
  if (financialType === FinancialType.EXPENSE) {
    entries = [
      ...getEntries(FinancialType.EXPENSE, "amount"),
      ...getEntries(FinancialType.LIABILITY, "monthly"),
    ];
  }
  if (financialType === FinancialType.ASSET) {
    entries = [...getEntries(FinancialType.ASSET, "cost")];
  }
  if (financialType === FinancialType.LIABILITY) {
    entries = [...getEntries(FinancialType.LIABILITY, "principal")];
  }

  return (
    <>
      <Columns.Column
        size={size}
        className="has-background-white"
        style={style}
      >
        <Columns className="is-mobile">
          <Columns.Column size="auto" className="has-text-left">
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
                  getTotal(FinancialType.INCOME, "amount") + getTotal(FinancialType.ASSET, "cashflow")}
                {financialType === "expense" &&
                  getTotal(FinancialType.EXPENSE, "amount") +
                getTotal(FinancialType.LIABILITY, "monthly")}
              </Tag>
            </Tag.Group>
          </Columns.Column>
          <Columns.Column
            className="InOutBox-hover has-text-center"
            size="1"
            style={{ width: "48px" }}
            onClick={() => {
              setEntry!({ _type: financialType });
              toggleShowModal!();
            }}
          >
            <FontAwesomeIcon icon={faPlus} size="xs" />
          </Columns.Column>
        </Columns>

        {(financials[financialType] as Financial[]).length !== 0 && (
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
            setEntry!({});
            toggleShowModal!();
          }}
          closeOnBlur={true}
          showClose={false}
        >
          <Modal.Content>
            <Section style={{ backgroundColor: "white" }}>
              <Container>
                <Heading size={5} renderAs="p" style={{ padding: "0 2.5%" }}>
                  {entry!.id ? "Edit " : "New "}
                  {entry!._type}
                  <Tag
                    remove
                    className="InOutBox-close-modal is-pulled-right"
                    onClick={() => {
                      setEntry!({});
                      toggleShowModal!();
                    }}
                  ></Tag>
                </Heading>

                <NewInOutForm reset={setEntry!}/>
              </Container>
            </Section>
          </Modal.Content>
        </Modal>
      </Columns.Column>
    </>
  );
}

export default InOutBox;
