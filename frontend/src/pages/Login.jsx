import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  const navigate = useNavigate();

  const logar = () => {
    if (!email || !senha) {
      setErro("Informe email e senha.");
      return;
    }

    fetch("http://localhost:8080/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, senha })
    })
      .then(async res => {
        if (!res.ok) {
          const text = await res.text();
          throw new Error(text || "Falha no login.");
        }
        return res.json();
      })
      .then(data => {
        setErro("");
        localStorage.setItem("usuario", JSON.stringify(data));
        window.location.href = "/onibus";
      })
      .catch(err => {
        setErro(err.message);
      });
  };

  // --- ESTILOS RÁPIDOS ---
  const styles = {
    wrapper: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      backgroundColor: "#f0f2f5", // Fundo claro como o da referência
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
      marginBottom: "30px",
      fontSize: "24px",
      fontWeight: "600"
    },
    input: {
      width: "100%",
      padding: "12px",
      marginBottom: "15px",
      borderRadius: "8px",
      border: "1px solid #ddd",
      fontSize: "16px",
      boxSizing: "border-box", // Garante que o padding não quebre a largura
      outline: "none"
    },
    buttonEntrar: {
      width: "100%",
      padding: "12px",
      backgroundColor: "#004a87", // Azul corporativo (estilo Santa Cruz)
      color: "white",
      border: "none",
      borderRadius: "8px",
      fontSize: "16px",
      fontWeight: "bold",
      cursor: "pointer",
      transition: "background 0.3s"
    },
    buttonRegistrar: {
      marginTop: "20px",
      background: "none",
      border: "none",
      color: "#004a87",
      cursor: "pointer",
      textDecoration: "underline",
      fontSize: "14px"
    },
    errorBox: {
      backgroundColor: "#fee2e2",
      color: "#b91c1c",
      padding: "10px",
      borderRadius: "6px",
      marginBottom: "20px",
      fontSize: "14px",
      border: "1px solid #fecaca"
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <h1 style={styles.title}>Acesse o Sistema</h1>

        {erro && <div style={styles.errorBox}>{erro}</div>}

        <input
          style={styles.input}
          placeholder="E-mail"
          type="email"
          value={email}
          onChange={e => {
            setEmail(e.target.value);
            setErro("");
          }}
        />

        <input
          style={styles.input}
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={e => {
            setSenha(e.target.value);
            setErro("");
          }}
        />

        <button 
          style={styles.buttonEntrar} 
          onClick={logar}
          onMouseOver={(e) => e.target.style.backgroundColor = "#003561"}
          onMouseOut={(e) => e.target.style.backgroundColor = "#004a87"}
        >
          Entrar
        </button>

        <button style={styles.buttonRegistrar} onClick={() => navigate("/register")}>
          Não tem uma conta? Criar conta
        </button>
      </div>
    </div>
  );
}

export default Login;