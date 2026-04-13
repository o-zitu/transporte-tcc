import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function GerenciarUsuariosPage() {
  const [usuarios, setUsuarios] = useState([]);
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    carregarUsuarios();
  }, []);

  const carregarUsuarios = () => {
    fetch("http://localhost:8080/usuarios")
      .then(res => res.json())
      .then(setUsuarios);
  };

  const deletarUsuario = (id) => {
    if (!window.confirm("Tem certeza que deseja excluir este usuário?")) return;

    fetch(`http://localhost:8080/usuarios/${id}`, {
      method: "DELETE"
    })
      .then(() => {
        setSucesso("Usuário removido com sucesso.");
        setErro("");
        carregarUsuarios();
      })
      .catch(() => setErro("Não foi possível excluir o usuário."));
  };

  const alterarRole = (id, roleAtual) => {
    let novaRole = "PASSAGEIRO";
    if (roleAtual === "PASSAGEIRO") novaRole = "MOTORISTA";
    else if (roleAtual === "MOTORISTA") novaRole = "ADMIN";
    else if (roleAtual === "ADMIN") novaRole = "PASSAGEIRO";

    fetch(`http://localhost:8080/usuarios/${id}/role`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role: novaRole })
    })
      .then(() => {
        setSucesso(`Nível de acesso alterado para ${novaRole}`);
        setErro("");
        carregarUsuarios();
      })
      .catch(() => setErro("Erro ao alterar o nível de acesso."));
  };

  const styles = {
    page: {
      backgroundColor: "#f0f2f5",
      minHeight: "100vh",
      padding: "40px 20px",
      fontFamily: "'Segoe UI', Roboto, sans-serif",
    },
    container: {
      maxWidth: "900px",
      margin: "0 auto",
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "30px"
    },
    btnVoltar: {
      backgroundColor: "#64748b",
      color: "white",
      border: "none",
      padding: "10px 20px",
      borderRadius: "6px",
      cursor: "pointer",
      fontWeight: "bold"
    },
    userCard: {
      backgroundColor: "#ffffff",
      borderRadius: "12px",
      padding: "20px",
      marginBottom: "15px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
    },
    userInfo: {
      textAlign: "left"
    },
    userActions: {
      display: "flex",
      gap: "10px"
    },
    btnRole: {
      backgroundColor: "#f1f5f9",
      color: "#0f172a",
      border: "1px solid #cbd5e1",
      padding: "8px 12px",
      borderRadius: "6px",
      cursor: "pointer",
      fontSize: "13px",
      fontWeight: "600"
    },
    btnDelete: {
      backgroundColor: "#fee2e2",
      color: "#b91c1c",
      border: "1px solid #fecaca",
      padding: "8px 12px",
      borderRadius: "6px",
      cursor: "pointer",
      fontSize: "13px",
      fontWeight: "600"
    },
    badge: (role) => {
      const colors = {
        ADMIN: { bg: "#dbeafe", text: "#1e40af" },
        MOTORISTA: { bg: "#fef3c7", text: "#92400e" },
        PASSAGEIRO: { bg: "#dcfce7", text: "#166534" }
      };
      const style = colors[role] || colors.PASSAGEIRO;
      return {
        backgroundColor: style.bg,
        color: style.text,
        padding: "4px 10px",
        borderRadius: "20px",
        fontSize: "11px",
        fontWeight: "bold",
        textTransform: "uppercase"
      };
    },
    errorBox: {
      backgroundColor: "#fee2e2",
      color: "#b91c1c",
      padding: "12px",
      borderRadius: "8px",
      marginBottom: "20px",
      border: "1px solid #fecaca"
    },
    successBox: {
      backgroundColor: "#dcfce7",
      color: "#15803d",
      padding: "12px",
      borderRadius: "8px",
      marginBottom: "20px",
      border: "1px solid #bbf7d0"
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.header}>
          <h1 style={{ color: "#1e293b", margin: 0 }}>Gestão de Usuários</h1>
          <button onClick={() => navigate("/onibus")} style={styles.btnVoltar}>
            ← Voltar
          </button>
        </div>

        {erro && <div style={styles.errorBox}>⚠️ {erro}</div>}
        {sucesso && <div style={styles.successBox}>✅ {sucesso}</div>}

        <div style={{ marginTop: "20px" }}>
          {usuarios.map(user => (
            <div key={user.id} style={styles.userCard}>
              <div style={styles.userInfo}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <h3 style={{ margin: 0, fontSize: "18px", color: "#1e293b" }}>{user.nome}</h3>
                  <span style={styles.badge(user.role)}>{user.role}</span>
                </div>
                <p style={{ margin: "5px 0 0 0", color: "#64748b", fontSize: "14px" }}>{user.email}</p>
              </div>

              <div style={styles.userActions}>
                <button 
                  style={styles.btnRole} 
                  onClick={() => alterarRole(user.id, user.role)}
                >
                  Alternar Role
                </button>
                <button 
                  style={styles.btnDelete} 
                  onClick={() => deletarUsuario(user.id)}
                >
                  Excluir
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default GerenciarUsuariosPage;