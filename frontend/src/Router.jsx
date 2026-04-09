import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import OnibusPage from "./pages/OnibusPage";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminPage from "./pages/AdminPage";
import MotoristaPage from "./pages/MotoristaPage";
import CriarOnibusPage from "./pages/CriarOnibusPage";
import CriarUsuarioPage from "./pages/CriarUsuarioPage";
import GerenciarUsuariosPage from "./pages/GerenciarUsuariosPage";

function Router() {
  return (
    <BrowserRouter>
      <Routes>

        {/* públicas */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* admin separado */}
        <Route
          path="/admin/onibus"
          element={
            <ProtectedRoute>
              <AdminPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/criar-onibus"
          element={
            <ProtectedRoute>
              <CriarOnibusPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/criar-usuario"
          element={
            <ProtectedRoute>
              <CriarUsuarioPage />
            </ProtectedRoute>
          }
        />

        <Route path="/admin/usuarios" element={
  <ProtectedRoute>
    <GerenciarUsuariosPage />
  </ProtectedRoute>
} />

        {/* rota inteligente */}
        <Route
          path="/onibus"
          element={
            <ProtectedRoute>
              {(() => {
                const usuario = JSON.parse(localStorage.getItem("usuario"));

                if (usuario?.role === "ADMIN") return <AdminPage />;
                if (usuario?.role === "MOTORISTA") return <MotoristaPage />;
                return <OnibusPage />;
              })()}
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default Router;