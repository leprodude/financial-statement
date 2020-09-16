import React from "react"
import { FinancialType, Financial, IBaseFinancial, IIncome, IExpense, IAsset, ILiability, IFinancials } from "./Financials"
import { v4 as uuidv4 } from "uuid";
import {
    Tag,
    //@ts-ignore
} from "react-bulma-components";

export function generateNewFinancial(type: FinancialType): Financial {
    let f: IBaseFinancial = {
        _type: type,
        _id: uuidv4(),
        name: "",
        cashflow: 0,
    }
    switch (type) {
        case FinancialType.ASSET:
            return {
                ...f,
                cost: 0,
                downpay: 0
            } as IAsset
        case FinancialType.LIABILITY:
            return {
                ...f,
                principal: 0,
                interest: 0
            } as ILiability
        default:
            return { ...f } as Financial
    }
}

export function generateTableData(financial: Financial, columnData: string, tags?: JSX.Element | JSX.Element[]): JSX.Element[] {
    let data: JSX.Element[] = [];
    data.push(<td key={uuidv4()}>{financial.name + " "}{tags}</td>);
    data.push(<td key={uuidv4()}
        className={
            (financial._type === FinancialType.EXPENSE || financial._type === FinancialType.LIABILITY) ?
                "has-text-danger" : undefined
        }
    >{financial[columnData as keyof Financial]}</td>);

    return data;
}

export function generateTableRows(p: GetTableEntriesProps, typeToGen: FinancialType): JSX.Element[];
export function generateTableRows(p: GetTableEntriesProps, typeToGen: FinancialType, columnData: keyof Financial): JSX.Element[];
export function generateTableRows(p: GetTableEntriesProps, typeToGen: FinancialType, tags: JSX.Element | JSX.Element[]): JSX.Element[];
export function generateTableRows(p: GetTableEntriesProps, typeToGen: FinancialType, columnData: keyof Financial, tags: JSX.Element | JSX.Element[]): JSX.Element[];
export function generateTableRows(p: GetTableEntriesProps, typeToGen: FinancialType, columnOrTags: any = "cashflow", tags?: JSX.Element | JSX.Element[]): JSX.Element[] {

    const { financials, toggleShowModal, setEntry, setIsEditing } = { ...p };

    let columnData: any;

    if (columnOrTags && typeof columnOrTags === "string") {
        columnData = columnOrTags;
    } else if (columnOrTags) {
        columnData = "cashflow";
        tags = columnOrTags
    }

    const rows = (financials[typeToGen] as Financial[]).map((f) => (
        <tr key={uuidv4()}
            onClick={() => {
                setIsEditing!(true);
                setEntry!(f);
                toggleShowModal!();
            }}
            className="InOutBox-hover"
        >
            {generateTableData(f, columnData, tags)}</tr>
    ));
    return rows;
};

interface GetTableEntriesProps {
    type: FinancialType,
    financials: IFinancials,
    toggleShowModal: (() => void) | undefined,
    setEntry: React.Dispatch<React.SetStateAction<IIncome | IExpense | IAsset | ILiability | undefined>> | undefined,
    setIsEditing: React.Dispatch<React.SetStateAction<boolean | undefined>> | undefined
}

export function assembleTableRows(props: GetTableEntriesProps): JSX.Element[] {
    switch (props.type) {
        case FinancialType.INCOME:
            return [
                ...generateTableRows(props, FinancialType.INCOME),
                ...generateTableRows(props, FinancialType.ASSET, "cashflow", <Tag className="InOutBox-passive-tag is-success is-light">passive</Tag>),
            ];
        case FinancialType.EXPENSE:
            return [
                ...generateTableRows(props, FinancialType.EXPENSE),
                ...generateTableRows(props, FinancialType.LIABILITY, <Tag className="InOutBox-passive-tag is-danger is-light">liability</Tag>),
            ];
        case FinancialType.ASSET:
            return [...generateTableRows(props, FinancialType.ASSET, "cost" as keyof Financial)];
        case FinancialType.LIABILITY:
            return [...generateTableRows(props, FinancialType.LIABILITY, "principal" as keyof Financial)];
    }
}

export function calculateTotal(financials: Financial[], columnData: keyof Financial = "cashflow"): number {
    const total = (financials).reduce(
        (total, f) =>
            f[columnData] !== undefined ? total + Number(f[columnData]) : total,
        0
    );
    return total;
};
