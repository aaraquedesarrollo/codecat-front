import {
  Route,
  Switch,
  BrowserRouter as Router,
  Redirect,
} from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContextProvider";
import { CodeCat } from "./Paginas/CodeCat";
import { PaginaNotFound } from "./Paginas/PaginaNotFound";
import { PaginaPrincipal } from "./Paginas/PaginaPrincipal";

function App() {
  return (
    <>
      <Router>
        <AuthContextProvider>
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
        </AuthContextProvider>
      </Router>
    </>
  );
}

export default App;
