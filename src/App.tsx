import React from "react";
// import { Route, Switch } from "react-router-dom";
import FinancialStatement from "./FinancialStatement";
import { FormModal } from "./FormModal";
import { FinancialsProvider } from "./contexts/FinancialsContext";
import { FormProvider } from "./contexts/FormContext";
// import Statistics from "./Statistics";
// import Contact from "./Contact";
import "./App.css";

interface AppProps {
  
}

export const App: React.FC<AppProps> = () => {
    return (
      <div className="App">
        <FinancialsProvider>
          <FormProvider>
            <FinancialStatement/>
            <FormModal />
            {/* <Switch>
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
              <Route render={() => <h1>ERROR NOT FOUND</h1>} />
            </Switch> */}
          </FormProvider>
        </FinancialsProvider>
      </div>
    );
}

export default App;
