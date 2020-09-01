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
        id: uuidv4(),
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

interface GetTableEntriesProps {
    type: FinancialType,
    financials: IFinancials,
    toggleShowModal: (() => void) | undefined,
    setEntry: React.Dispatch<React.SetStateAction<IIncome | IExpense | IAsset | ILiability | undefined>> | undefined,
    setIsEditing: React.Dispatch<React.SetStateAction<boolean | undefined>> | undefined
}

export function getTableEntries(props: GetTableEntriesProps): JSX.Element[] {
    const { type, financials, toggleShowModal, setEntry, setIsEditing } = { ...props };

    function generateTableRows(type: FinancialType): JSX.Element[];
    function generateTableRows(type: FinancialType, columnData: keyof Financial): JSX.Element[];
    function generateTableRows(type: FinancialType, tags: JSX.Element | JSX.Element[]): JSX.Element[];
    function generateTableRows(type: FinancialType, columnData: keyof Financial, tags: JSX.Element | JSX.Element[]): JSX.Element[];
    function generateTableRows(type: FinancialType, columnOrTags: any = "cashflow", tags?: JSX.Element | JSX.Element[]): JSX.Element[] {

        let columnData: any;

        if (columnOrTags && typeof columnOrTags === "string") {
            columnData = columnOrTags;
        } else if (columnOrTags) {
            columnData = "cashflow";
            tags = columnOrTags
        }

        const rows = (financials[type] as Financial[]).map((f) => (
            <tr
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
    function generateTableData(financial: Financial, columnData: string, tags?: JSX.Element | JSX.Element[]): JSX.Element[] {
        let data: JSX.Element[] = [];
        data.push(<td>{financial.name} {tags}</td>);
        data.push(<td
            className={
                (financial._type === FinancialType.EXPENSE || financial._type === FinancialType.LIABILITY) ?
                    "has-text-danger" : undefined
            }
        >
            {financial[columnData as keyof Financial]}
        </td>);

        return data;
    }
    function generateTableEntries() {
        switch (type) {
            case FinancialType.INCOME:
                return [
                    ...generateTableRows(FinancialType.INCOME),
                    ...generateTableRows(FinancialType.ASSET, "cashflow", <Tag className="InOutBox-passive-tag is-success is-light">passive</Tag>),
                ];
            case FinancialType.EXPENSE:
                return [
                    ...generateTableRows(FinancialType.EXPENSE),
                    ...generateTableRows(FinancialType.LIABILITY, <Tag className="InOutBox-passive-tag is-danger is-light">liability</Tag>),
                ];
            case FinancialType.ASSET:
                return [...generateTableRows(FinancialType.ASSET, "cost" as keyof Financial)];
            case FinancialType.LIABILITY:
                return [...generateTableRows(FinancialType.LIABILITY, "principal" as keyof Financial)];
        }
    }

    return generateTableEntries();
}

export function calculateTotal(financials: Financial[], columnData: keyof Financial = "cashflow"): number {
    const total = (financials).reduce(
        (total, f) =>
            f[columnData] !== undefined ? total + Number(f[columnData]) : total,
        0
    );
    return total;
};
