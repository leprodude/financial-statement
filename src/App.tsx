import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import FinancialStatement from "./FinancialStatement";
import Navigation from './Navigation'
import { FinancialsProvider } from "./contexts/FinancialsContext";
import { FormProvider } from "./contexts/FormContext";
import CashflowPatterns from './CashflowPatterns'
import "./App.css";

interface AppProps {

}

export const App: React.FC<AppProps> = () => {
  return (
    <div className="App">
      <FinancialsProvider>
        <FormProvider>
          <Router>
            <Navigation />
            <Switch>
              <Route exact path="/" component={FinancialStatement} />
              <Route
                exact
                path="/patterns"
                component={CashflowPatterns}
              />
              {/* <Route
                exact
                path="/patterns/:name"
                component={CashflowPatterns}
              /> */}
              <Route render={() => <h1>You have found a way out!</h1>} />
            </Switch>
          </Router>
        </FormProvider>
      </FinancialsProvider>
    </div>
  );
}

export default App;
