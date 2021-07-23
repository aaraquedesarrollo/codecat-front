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
import { Tarea } from "./Paginas/Tarea";
import { useState } from "react";

function App() {
  const [abrirEjercicios, setAbrirEjercicios] = useState(false);
  const toggleAbrirEjercicios = () => {
    setAbrirEjercicios(!abrirEjercicios);
  };
  return (
    <>
      <Router>
        <AuthContextProvider>
          <GeneralContextProvider>
            <EjerciciosContextProvider>
              <Loading />
              <Switch>
                <Route path="/principal" exact>
                  <PaginaPrincipal />
                </Route>
                <Route path="/codecat" exact>
                  <CodeCat
                    abrirEjercicios={abrirEjercicios}
                    setAbrirEjercicios={setAbrirEjercicios}
                    toggleAbrirEjercicios={toggleAbrirEjercicios}
                  />
                </Route>
                <Route path="/" exact>
                  <Redirect to="/principal" />
                </Route>
                <Route path="/codecat/ejercicios/:idTrabajo" exact>
                  <Tarea toggleAbrirEjercicios={toggleAbrirEjercicios} />
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
