import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminPage() {
  const [onibus, setOnibus] = useState([]);
  const navigate = useNavigate();
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  const logout = () => {
    localStorage.removeItem("usuario");
    window.location.href = "/";
  };

  useEffect(() => {
    carregarOnibus();
  }, []);

  const carregarOnibus = () => {
    fetch("http://localhost:8080/onibus")
      .then(res => res.json())
      .then(setOnibus);
  };

  const deletarOnibus = (id) => {
    if (!window.confirm("Deseja realmente excluir este ônibus?")) return;

    fetch(`http://localhost:8080/onibus/${id}`, {
      method: "DELETE"
    }).then(() => carregarOnibus());
  };

  const styles = {
    page: {
      backgroundColor: "#f0f2f5",
      minHeight: "100vh",
      fontFamily: "'Segoe UI', Roboto, sans-serif",
    },
    navbar: {
      backgroundColor: "#ffffff",
      padding: "15px 5%",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      marginBottom: "30px"
    },
    content: {
      maxWidth: "1000px",
      margin: "0 auto",
      padding: "0 20px"
    },
    actionsGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
      gap: "15px",
      marginBottom: "40px"
    },
    btnAction: {
      padding: "15px",
      backgroundColor: "#ffffff",
      color: "#004a87",
      border: "1px solid #004a87",
      borderRadius: "10px",
      cursor: "pointer",
      fontWeight: "600",
      fontSize: "15px",
      transition: "0.3s",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "10px"
    },
    busGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
      gap: "20px"
    },
    busCard: {
      backgroundColor: "#ffffff",
      borderRadius: "12px",
      padding: "20px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
      textAlign: "left",
      borderTop: "4px solid #004a87"
    },
    busTitle: {
      margin: "0 0 10px 0",
      fontSize: "18px",
      color: "#1e293b"
    },
    busInfo: {
      fontSize: "14px",
      color: "#64748b",
      margin: "5px 0"
    },
    btnDelete: {
      marginTop: "15px",
      width: "100%",
      padding: "8px",
      backgroundColor: "#fee2e2",
      color: "#b91c1c",
      border: "1px solid #fecaca",
      borderRadius: "6px",
      cursor: "pointer",
      fontWeight: "bold"
    },
    btnLogout: {
      padding: "8px 16px",
      backgroundColor: "#fee2e2",
      color: "#b91c1c",
      border: "1px solid #fecaca",
      borderRadius: "6px",
      cursor: "pointer",
      fontWeight: "bold"
    }
  };

  return (
    <div style={styles.page}>
      <nav style={styles.navbar}>
        <h2 style={{ color: "#004a87", margin: 0 }}>Gestão Administrativa</h2>
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <span style={{ fontSize: "14px", fontWeight: "500" }}>👤 ADMIN</span>
          <button onClick={logout} style={styles.btnLogout}>Sair</button>
        </div>
      </nav>

      <div style={styles.content}>
        <h3 style={{ marginBottom: "20px", color: "#1e293b" }}>Ações Rápidas</h3>
        <div style={styles.actionsGrid}>
          <button 
            style={styles.btnAction} 
            onClick={() => navigate("/admin/criar-onibus")}
            onMouseOver={(e) => { e.target.style.backgroundColor = "#004a87"; e.target.style.color = "white"; }}
            onMouseOut={(e) => { e.target.style.backgroundColor = "white"; e.target.style.color = "#004a87"; }}
          >
            ➕ Criar Ônibus
          </button>
          <button 
            style={styles.btnAction} 
            onClick={() => navigate("/admin/criar-usuario")}
            onMouseOver={(e) => { e.target.style.backgroundColor = "#004a87"; e.target.style.color = "white"; }}
            onMouseOut={(e) => { e.target.style.backgroundColor = "white"; e.target.style.color = "#004a87"; }}
          >
            👤 Novo Usuário
          </button>
          <button 
            style={styles.btnAction} 
            onClick={() => navigate("/admin/usuarios")}
            onMouseOver={(e) => { e.target.style.backgroundColor = "#004a87"; e.target.style.color = "white"; }}
            onMouseOut={(e) => { e.target.style.backgroundColor = "white"; e.target.style.color = "#004a87"; }}
          >
            ⚙️ Gerenciar Equipe
          </button>
        </div>

        <h3 style={{ marginBottom: "20px", color: "#1e293b" }}>Frotas Cadastradas</h3>
        <div style={styles.busGrid}>
          {onibus.map(bus => (
            <div key={bus.id} style={styles.busCard}>
              <h3 style={styles.busTitle}>{bus.nome}</h3>
              <p style={styles.busInfo}>🕒 Saída: <strong>{bus.horarioSaida}</strong></p>
              <p style={styles.busInfo}>💺 Capacidade: <strong>{bus.quantidadeAssentos} assentos</strong></p>

              <button 
                style={styles.btnDelete} 
                onClick={() => deletarOnibus(bus.id)}
              >
                Excluir Veículo
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminPage;