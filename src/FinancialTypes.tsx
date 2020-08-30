export enum FinancialType {
    INCOME = "income",
    EXPENSE = "expense",
    ASSET = "asset",
    LIABILITY = "liability"
}

export type Income = {
    _type: FinancialType.INCOME,
    name: string,
    amount: number,
    id: string
}

export type Expense = {
    _type: FinancialType.EXPENSE,
    name: string,
    amount: number,
    id: string
}

export type Asset = {
    _type: FinancialType.ASSET,
    name: string,
    cost: number,
    downpay: number,
    cashflow: number,
    id: string
}

export type Liability = {
    _type: FinancialType.LIABILITY,
    name: string,
    principal: number,
    interest: number,
    monthly: number,
    id: string,
}

export type Financial = Income | Expense | Asset | Liability;

export type Financials = {
    "income": Income[],
    "expense": Expense[],
    "asset": Asset[],
    "liability": Liability[]
};