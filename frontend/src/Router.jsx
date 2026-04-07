import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import OnibusPage from "./pages/OnibusPage";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminPage from "./pages/AdminPage";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {/* rotas públicas */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* rota protegida */}
        <Route
  
  path="/onibus"
  element={
    <ProtectedRoute>
      {(() => {
        const usuario = JSON.parse(localStorage.getItem("usuario"));

        if (usuario?.role === "ADMIN") return <AdminPage />;
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