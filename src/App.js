import React from "react";
import { Route, Switch, NavLink } from "react-router-dom";
import FinancialStatement from "./FinancialStatement.js";
import { FinancialsProvider } from "./contexts/FinancialsContext";
import { FormProvider } from "./contexts/FormContext";
import Statistics from "./Statistics";
import Contact from "./Contact";
import "./App.css";


function App() {
  return (
    <div className="App">
      <nav className="App-nav">
        <NavLink exact activeClassName="active-link" to="/">
          Financial Statement
        </NavLink>
        <NavLink exact activeClassName="active-link" to="/statistics">
          Statistics
        </NavLink>
        <NavLink exact activeClassName="active-link" to="/contact">
          Contact
        </NavLink>
      </nav>
      <FinancialsProvider>
        <FormProvider>
          <Switch>
            <Route exact path="/" component={FinancialStatement} />
            <Route
              exact
              path="/statistics"
              render={(routeProps) => <Statistics {...routeProps} />}
            />
            <Route
              exact
              path="/statistics/:name"
              render={(routeProps) => <Statistics {...routeProps} />}
            />
            <Route exact path="/contact" component={Contact} />
            <Route render={() => <h1>ERRROTT NOT FOUND</h1>} />
          </Switch>
        </FormProvider>
      </FinancialsProvider>
    </div>
  );
}

export default App;
