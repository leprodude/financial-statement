export enum FinancialType {
    INCOME = "income",
    EXPENSE = "expense",
    ASSET = "asset",
    LIABILITY = "liability"
}

export interface IBaseFinancial {
    readonly _type: FinancialType,
    readonly id: string,
    name: string
    cashflow: number,
}

export interface IIncome extends IBaseFinancial {
    _type: FinancialType.INCOME
};
export interface IExpense extends IBaseFinancial {
    _type: FinancialType.EXPENSE
};

export interface IAsset extends IBaseFinancial {
    _type: FinancialType.ASSET,
    cost: number,
    downpay: number
}

export interface ILiability extends IBaseFinancial {
    _type: FinancialType.LIABILITY,
    principal: number,
    interest: number
}

export type Financial = IIncome | IExpense | IAsset | ILiability

export interface IFinancials {
    [FinancialType.INCOME]: IIncome[],
    [FinancialType.EXPENSE]: IExpense[],
    [FinancialType.ASSET]: IAsset[],
    [FinancialType.LIABILITY]: ILiability[]
}

export enum IncomeType {
    SALARY = "salary", INTEREST = "interest", DIVIDEND = "dividend", ROYALTY = "royalty", REAL_ESTATE = "real estate", BUSINESS = "business"
}
export enum ExpenseType {
    LIABILITY = "liability"
}
export enum AssetType {
    BUSINESS = "business", STOCK = "stock", REAL_ESTATE = "real estate"
}

export interface IFinancialStatement {
    getCashflow(type: FinancialType): number,
    getTotalIncome(): number,
    getTotalExpense(): number,
    getPassiveIncome(): number
}