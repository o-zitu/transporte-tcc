import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState(false);

  const navigate = useNavigate();

  const registrar = () => {
    // Validação inicial
    if (!nome || !email || !senha) {
      setErro("Todos os campos são obrigatórios.");
      return;
    }

    fetch("http://localhost:8080/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome, email, senha })
    })
      .then(async res => {
        if (!res.ok) {
          const text = await res.text();
          throw new Error(text || "Erro ao cadastrar.");
        }
        return res.json();
      })
      .then(() => {
        setErro("");
        setSucesso(true);
        // Delay para o usuário ler a mensagem de sucesso
        setTimeout(() => navigate("/"), 1500);
      })
      .catch(err => {
        setSucesso(false);
        if (err.message.includes("Duplicate")) {
          setErro("Já existe uma conta com este e-mail.");
        } else {
          setErro("Erro ao cadastrar usuário. Tente novamente.");
        }
      });
  };

  // --- PADRÃO VISUAL "SANTA CRUZ" ---
  const styles = {
    wrapper: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      backgroundColor: "#f0f2f5",
      fontFamily: "'Segoe UI', Roboto, sans-serif"
    },
    card: {
      backgroundColor: "#ffffff",
      padding: "40px",
      borderRadius: "12px",
      boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
      width: "100%",
      maxWidth: "400px",
      textAlign: "center"
    },
    title: {
      color: "#1e293b",
      marginBottom: "25px",
      fontSize: "24px",
      fontWeight: "600"
    },
    input: {
      width: "100%",
      padding: "12px",
      marginBottom: "15px",
      borderRadius: "8px",
      border: "1px solid #ddd",
      fontSize: "15px",
      boxSizing: "border-box",
      outline: "none"
    },
    buttonCadastrar: {
      width: "100%",
      padding: "12px",
      backgroundColor: "#004a87",
      color: "white",
      border: "none",
      borderRadius: "8px",
      fontSize: "16px",
      fontWeight: "bold",
      cursor: "pointer",
      transition: "0.3s"
    },
    buttonVoltar: {
      marginTop: "15px",
      background: "none",
      border: "none",
      color: "#64748b",
      cursor: "pointer",
      fontSize: "14px",
      textDecoration: "underline"
    },
    errorBox: {
      backgroundColor: "#fee2e2",
      color: "#b91c1c",
      padding: "12px",
      borderRadius: "8px",
      marginBottom: "20px",
      fontSize: "14px",
      border: "1px solid #fecaca",
      textAlign: "left"
    },
    successBox: {
      backgroundColor: "#dcfce7",
      color: "#15803d",
      padding: "12px",
      borderRadius: "8px",
      marginBottom: "20px",
      fontSize: "14px",
      border: "1px solid #bbf7d0"
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <h1 style={styles.title}>Crie sua conta</h1>

        {/* Mensagens de feedback */}
        {erro && <div style={styles.errorBox}>⚠️ {erro}</div>}
        {sucesso && <div style={styles.successBox}>✅ Cadastro realizado com sucesso!</div>}

        <input
          style={styles.input}
          placeholder="Nome completo"
          value={nome}
          onChange={e => { setNome(e.target.value); setErro(""); }}
        />

        <input
          style={styles.input}
          placeholder="E-mail"
          type="email"
          value={email}
          onChange={e => { setEmail(e.target.value); setErro(""); }}
        />

        <input
          style={styles.input}
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={e => { setSenha(e.target.value); setErro(""); }}
        />

        <button 
          style={styles.buttonCadastrar} 
          onClick={registrar}
          onMouseOver={(e) => e.target.style.backgroundColor = "#003561"}
          onMouseOut={(e) => e.target.style.backgroundColor = "#004a87"}
        >
          Finalizar Cadastro
        </button>

        <button style={styles.buttonVoltar} onClick={() => navigate("/")}>
          Já tem conta? Voltar ao login
        </button>
      </div>
    </div>
  );
}

export default Register;