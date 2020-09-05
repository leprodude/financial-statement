import React, { useContext } from "react";
import { FinancialsContext } from "./contexts/FinancialsContext";
import { FormContext } from "./contexts/FormContext";
import { FinancialType, Financial, IFinancials } from "./Financials";
import { getTableEntries, generateNewFinancial, calculateTotal } from "./helpers"
import "./InOutBox.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import {
  Columns,
  Container,
  Table,
  Tag,
  //@ts-ignore
} from "react-bulma-components";


interface InOutBoxProps {
  financialType: FinancialType,
  style?: Object,
  offset?: number,
  size?: number
}


const InOutBox: React.FC<InOutBoxProps> = ({ financialType, style, size = 6, offset = 0 }) => {

  const financials = useContext(FinancialsContext);
  const { toggleShowModal, setEntry, setIsEditing } = useContext(
    FormContext
  );

  function generateInOutBoxHeader(): JSX.Element {
    return (<Columns className="is-mobile">
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
              calculateTotal(financials[FinancialType.INCOME] as Financial[]) + calculateTotal(financials[FinancialType.ASSET] as Financial[])}
            {financialType === "expense" &&
              calculateTotal(financials[FinancialType.EXPENSE] as Financial[]) +
              calculateTotal(financials[FinancialType.LIABILITY] as Financial[])}
          </Tag>
        </Tag.Group>
      </Columns.Column>
      <Columns.Column
        className="InOutBox-hover has-text-center"
        size="1"
        style={{ width: "48px" }}
        onClick={() => {
          setEntry!(generateNewFinancial(financialType));
          toggleShowModal!();
        }}
      >
        <FontAwesomeIcon icon={faPlus} size="xs" />
      </Columns.Column>
    </Columns>)
  }

  return (
    <>
      <Columns.Column
        size={size}
        className="has-background-white"
        style={style}
        offset={offset}
      >

        {generateInOutBoxHeader()}

        {(financials[financialType] as Financial[]).length !== 0 && (
          <Container className="has-background-grey-lighter mb-4">
            <Table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>
                    {(financialType === FinancialType.INCOME ||
                      financialType === FinancialType.EXPENSE) && "Cashflow"}
                    {financialType === FinancialType.ASSET && "Cost"}
                    {financialType === FinancialType.LIABILITY && "Principal"}
                  </th>
                </tr>
              </thead>
              <tbody>{getTableEntries({ type: financialType, financials: financials as IFinancials, toggleShowModal, setEntry, setIsEditing })}</tbody>
            </Table>
          </Container>
        )}

      </Columns.Column>
    </>
  );
}

export default InOutBox;
