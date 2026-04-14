import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import OnibusPage from "./pages/OnibusPage";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminPage from "./pages/AdminPage";
import MotoristaPage from "./pages/MotoristaPage";
import CriarOnibusPage from "./pages/CriarOnibusPage";
import CriarUsuarioPage from "./pages/CriarUsuarioPage";
import GerenciarUsuariosPage from "./pages/GerenciarUsuariosPage";
import HomePage from "./pages/HomePage"; // 1. Importa a nova página inicial

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {/* --- PÚBLICAS --- */}
        
        {/* Agora a raiz "/" é a Landing Page explicativa */}
        <Route path="/" element={<HomePage />} />
        
        {/* O Login agora fica em uma rota específica */}
        <Route path="/login" element={<Login />} />
        
        <Route path="/register" element={<Register />} />

        {/* --- ADMIN SEPARADO --- */}
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

        {/* --- ROTA INTELIGENTE --- */}
        {/* Esta é a rota para onde o usuário é mandado após o login */}
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

        {/* Redirecionamento de segurança para rotas inexistentes */}
        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
    </BrowserRouter>
  );
}

export default Router;