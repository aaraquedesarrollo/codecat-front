import {
  Route,
  Switch,
  BrowserRouter as Router,
  Redirect,
} from "react-router-dom";
import { CodeCat } from "./Paginas/CodeCat";
import { PaginaNotFound } from "./Paginas/PaginaNotFound";
import { PaginaPrincipal } from "./Paginas/PaginaPrincipal";

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/principal" exact>
            <PaginaPrincipal />
          </Route>
          <Route path="/codecat" exact>
            <CodeCat />
          </Route>
          <Route path="/" exact>
            <Redirect to="/principal" />
          </Route>
          <Route path="**" exact>
            <PaginaNotFound />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
