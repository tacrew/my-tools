import * as React from "react";
import { Route, Switch } from "react-router-dom";

import * as routes from "./constants/routes";
import ContrastChecker from "./pages/ContrastChecker";

const App: React.FC = () => {
    return (
        <Switch>
            <Route exact={true} path={routes.CONTRAST_CHECK} component={ContrastChecker} />
        </Switch>
    );
};

export default App;
