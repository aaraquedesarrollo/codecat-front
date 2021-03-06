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
import { Loading } from "./components/Loading";
import { GeneralContextProvider } from "./context/GeneralContextProvider";
import { EjerciciosContextProvider } from "./context/EjerciciosContextProvider";
import { LoguedProtecion } from "./components/LoguedProtection";
import { TareaTemplate } from "./Paginas/TareaTemplate";

function App() {
  return (
    <>
      <Router>
        <AuthContextProvider>
          <GeneralContextProvider>
            <EjerciciosContextProvider>
              <Loading />
              <Switch>
                <Route path="/principal" exact>
                  <LoguedProtecion>
                    <PaginaPrincipal />
                  </LoguedProtecion>
                </Route>
                <Route path="/codecat" exact>
                  <CodeCat />
                </Route>
                <Route path="/" exact>
                  <Redirect to="/principal" />
                </Route>
                <Route path="/codecat/ejercicios/:idTrabajo/:indiceTarea" exact>
                  <TareaTemplate />
                </Route>
                <Route path="**" exact>
                  <PaginaNotFound />
                </Route>
              </Switch>
            </EjerciciosContextProvider>
          </GeneralContextProvider>
        </AuthContextProvider>
      </Router>
    </>
  );
}

export default App;
