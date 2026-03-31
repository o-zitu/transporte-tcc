import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Login from "./Login";
import App from "./App";

function Router() {
  const [usuario, setUsuario] = useState(
    JSON.parse(localStorage.getItem("usuario"))
  );

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login setUsuario={setUsuario} />} />
        <Route
          path="/onibus"
          element={<App usuario={usuario} setUsuario={setUsuario} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;