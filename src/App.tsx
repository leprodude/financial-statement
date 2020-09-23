import React from "react";
import { Route, Switch } from "react-router-dom";
import FinancialStatement from "./FinancialStatement";
import CashflowPatterns from './CashflowPatterns'
import Navigation from './Navigation'
import "css/App.scss";

interface AppProps {

}

export const App: React.FC<AppProps> = () => {
  return (
    <div className="App">
      <Navigation />
      <Switch>
        <Route exact path="/" component={FinancialStatement} />
        <Route
          exact
          path="/patterns"
          component={CashflowPatterns}
        />
        <Route render={() => <h1>You have found a way out!</h1>} />
      </Switch>
    </div>
  );
}

export default App;
