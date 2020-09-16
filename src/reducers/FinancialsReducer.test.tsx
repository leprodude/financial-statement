import { IFinancials, IIncome, IExpense, IAsset, ILiability, FinancialType } from "../Financials"

import reducer from "./FinancialsReducer"

test("add an entry to the state", () => {
    let state: IFinancials = {
        income: [],
        expense: [],
        asset: [],
        liability: []
    };
    let newIncome: IIncome = { _id: "test-id-1", _type: FinancialType.INCOME, name: "A wonderful income", cashflow: 11000 };
    let newExpense: IExpense = { _id: "test-id-2", _type: FinancialType.EXPENSE, name: "A high expense", cashflow: -8200 };
    let newAsset: IAsset = { _id: "test-id-3", _type: FinancialType.ASSET, name: "A proper asset", cashflow: 5200, cost: 4000, downpay: 2000 };
    let newLiability: ILiability = { _id: "test-id-4", _type: FinancialType.LIABILITY, name: "A big liability", cashflow: -403, principal: 22000, interest: 0.1 };

    state = reducer(state, {type: "ADD", financial: newIncome});
    expect(state.income.length).toBe(1);
    expect(state.expense.length).toBe(0);
    expect(state.asset.length).toBe(0);
    expect(state.liability.length).toBe(0);
    expect(state.income[0]).toStrictEqual(newIncome);

    state = reducer(state, {type: "ADD", financial: newExpense});
    expect(state.income.length).toBe(1);
    expect(state.expense.length).toBe(1);
    expect(state.asset.length).toBe(0);
    expect(state.liability.length).toBe(0);
    expect(state.expense[0]).toStrictEqual(newExpense);
    
    state = reducer(state, {type: "ADD", financial: newAsset});
    expect(state.income.length).toBe(1);
    expect(state.expense.length).toBe(1);
    expect(state.asset.length).toBe(1);
    expect(state.liability.length).toBe(0);
    expect(state.asset[0]).toStrictEqual(newAsset);
    
    state = reducer(state, {type: "ADD", financial: newLiability});
    expect(state.income.length).toBe(1);
    expect(state.expense.length).toBe(1);
    expect(state.asset.length).toBe(1);
    expect(state.liability.length).toBe(1);
    expect(state.liability[0]).toStrictEqual(newLiability);
})

test("edit an entry in the state", () => {
    let income: IIncome = { _id: "test-id-1", _type: FinancialType.INCOME, name: "A wonderful income", cashflow: 11000 };
    let expense: IExpense = { _id: "test-id-2", _type: FinancialType.EXPENSE, name: "A high expense", cashflow: -8200 };
    let expense2: IExpense = { _id: "test-id-2.5", _type: FinancialType.EXPENSE, name: "Another expense", cashflow: -200 };
    let asset: IAsset = { _id: "test-id-3", _type: FinancialType.ASSET, name: "A proper asset", cashflow: 5200, cost: 4000, downpay: 2000 };
    let liability: ILiability = { _id: "test-id-4", _type: FinancialType.LIABILITY, name: "A big liability", cashflow: -200, principal: 22000, interest: 0.1 };

    let state: IFinancials = {
        income: [income],
        expense: [expense, expense2],
        asset: [asset],
        liability: [liability]
    };

    let editedIncome = JSON.parse(JSON.stringify(income)); // duplicate
    editedIncome.name = "A super income";
    editedIncome.cashflow = 4000;

    let editedExpense = JSON.parse(JSON.stringify(expense)); // duplicate
    editedIncome.name = "An expense";
    editedIncome.cashflow = -2400;

    let editedAsset = JSON.parse(JSON.stringify(asset)); // duplicate
    editedIncome.name = "A quick asset";
    editedIncome.cashflow = 2000;
    editedIncome.cost = 300;
    editedIncome.downpay = 140;

    let editedLiability = JSON.parse(JSON.stringify(liability)); // duplicate
    editedIncome.name = "A small liability";
    editedIncome.cashflow = -100;
    editedIncome.principal = 400;
    editedIncome.interest = 0.01;

    state = reducer(state, { type: "EDIT", financial: editedIncome});
    state = reducer(state, { type: "EDIT", financial: editedExpense});
    state = reducer(state, { type: "EDIT", financial: editedAsset});
    state = reducer(state, { type: "EDIT", financial: editedLiability});

    expect(state.income.length).toBe(1);
    expect(state.expense.length).toBe(2);
    expect(state.asset.length).toBe(1);
    expect(state.liability.length).toBe(1);

    expect(state.income[0]).toStrictEqual(editedIncome);
    expect(state.expense[0]).toStrictEqual(editedExpense);
    expect(state.expense[1]).toStrictEqual(expense2);
    expect(state.asset[0]).toStrictEqual(editedAsset);
    expect(state.liability[0]).toStrictEqual(editedLiability);
})

test("return state when trying to edit non-existing entry", () => {
    let income: IIncome = { _id: "test-id-1", _type: FinancialType.INCOME, name: "A wonderful income", cashflow: 11000 };
    let expense: IExpense = { _id: "test-id-2", _type: FinancialType.EXPENSE, name: "A high expense", cashflow: -8200 };

    let state: IFinancials = {
        income: [income],
        expense: [],
        asset: [],
        liability: []
    };

    let shouldBeState = reducer(state, { type: "EDIT", financial: expense });   
    
    expect(shouldBeState).toStrictEqual(state);
})

test("remove an entry from the state", () => {
    let income: IIncome = { _id: "test-id-1", _type: FinancialType.INCOME, name: "A wonderful income", cashflow: 11000 };

    let state: IFinancials = {
        income: [income],
        expense: [],
        asset: [],
        liability: []
    };

    expect(state.income.length).toBe(1);
    state = reducer(state, { type: "REMOVE", financial: income });
    expect(state.income.length).toBe(0);
})

test("return state when trying to dispatch non-existing action", () => {
    let asset: IAsset = { _id: "test-id-3", _type: FinancialType.ASSET, name: "A proper asset", cashflow: 5200, cost: 4000, downpay: 2000 };

    let state: IFinancials = {
        income: [],
        expense: [],
        asset: [asset],
        liability: []
    };

    let shouldBeState = reducer(state, { type: "DOESNT_EXIST", financial: asset });
    expect(shouldBeState).toStrictEqual(state);
})