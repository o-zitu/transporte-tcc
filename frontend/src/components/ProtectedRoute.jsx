import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  // não logado
  if (!usuario) {
    return <Navigate to="/" />;
  }

  // 🚫 bloquear acesso ao admin
  if (window.location.pathname === "/admin" && usuario.role !== "ADMIN") {
    return <Navigate to="/onibus" />;
  }

  // 🚫 passageiro não entra no motorista
  if (
    window.location.pathname === "/motorista" &&
    usuario.role === "PASSAGEIRO"
  ) {
    return <Navigate to="/onibus" />;
  }

  return children;
}

export default ProtectedRoute;