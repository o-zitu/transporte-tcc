import React from "react";
import { Link } from "react-router-dom";

function HomePage() {
  const styles = {
    container: {
      fontFamily: "'Inter', sans-serif",
      color: "#1e293b",
      backgroundColor: "#ffffff",
      minHeight: "100vh",
    },
    navbar: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "20px 5%",
      borderBottom: "1px solid #f1f5f9",
    },
    hero: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
      padding: "100px 10%",
      background: "linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)",
    },
    badge: {
      backgroundColor: "#ebf5ff",
      color: "#004a87",
      padding: "6px 16px",
      borderRadius: "20px",
      fontSize: "13px",
      fontWeight: "bold",
      marginBottom: "24px",
      textTransform: "uppercase",
      letterSpacing: "1px"
    },
    gridFeatures: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
      gap: "30px",
      padding: "60px 10%",
    },
    featureCard: {
      padding: "30px",
      borderRadius: "15px",
      backgroundColor: "#f8fafc",
      border: "1px solid #e2e8f0",
      textAlign: "center",
    },
    btnPrimary: {
      backgroundColor: "#004a87",
      color: "white",
      padding: "14px 28px",
      borderRadius: "8px",
      textDecoration: "none",
      fontWeight: "bold",
      fontSize: "16px",
      boxShadow: "0 4px 10px rgba(0,74,135,0.2)",
    }
  };

  return (
    <div style={styles.container}>
      {/* Navegação */}
      <nav style={styles.navbar}>
        <div style={{ fontWeight: "900", fontSize: "24px", color: "#004a87", letterSpacing: "-1px" }}>
          Z<span style={{ color: "#1e293b" }}>TRANSPORTES</span>
        </div>
        <Link to="/login" style={{ textDecoration: "none", color: "#004a87", fontWeight: "bold" }}>
          Entrar no Sistema
        </Link>
      </nav>

      {/* Hero Section */}
      <header style={styles.hero}>
        <div style={styles.badge}>Transporte Rodoviário Inteligente</div>
        <h1 style={{ fontSize: "52px", fontWeight: "800", margin: "0 0 20px 0", lineHeight: "1.1" }}>
          Sua viagem planejada, <br />
          <span style={{ color: "#004a87" }}>do início ao fim.</span>
        </h1>
        <p style={{ fontSize: "18px", color: "#64748b", maxWidth: "600px", marginBottom: "40px" }}>
          Reserve seus assentos, acompanhe frotas em tempo real e gerencie seus bilhetes de forma simples e segura.
        </p>
        <div style={{ display: "flex", gap: "15px" }}>
          <Link to="/register" style={styles.btnPrimary}>Criar minha conta</Link>
          <Link to="/login" style={{ ...styles.btnPrimary, backgroundColor: "white", color: "#1e293b", border: "1px solid #e2e8f0", boxShadow: "none" }}>Ver Horários</Link>
        </div>
      </header>

      {/* Features */}
      <section style={styles.gridFeatures}>
        <div style={styles.featureCard}>
          <div style={{ fontSize: "30px", marginBottom: "15px" }}>🚍</div>
          <h3 style={{ margin: "0 0 10px 0" }}>Reserva de Assentos</h3>
          <p style={{ color: "#64748b", fontSize: "14px" }}>Visualize o mapa do ônibus e escolha sua poltrona preferida em tempo real.</p>
        </div>
        <div style={styles.featureCard}>
          <div style={{ fontSize: "30px", marginBottom: "15px" }}>📍</div>
          <h3 style={{ margin: "0 0 10px 0" }}>Localização GPS</h3>
          <p style={{ color: "#64748b", fontSize: "14px" }}>Saiba exatamente onde o veículo está e acompanhe o trajeto pelo mapa.</p>
        </div>
        <div style={styles.featureCard}>
          <div style={{ fontSize: "30px", marginBottom: "15px" }}>🎫</div>
          <h3 style={{ margin: "0 0 10px 0" }}>Vouchers Digitais</h3>
          <p style={{ color: "#64748b", fontSize: "14px" }}>Seus bilhetes sempre disponíveis no celular, sem necessidade de papel.</p>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ textAlign: "center", padding: "40px", color: "#94a3b8", fontSize: "12px", borderTop: "1px solid #f1f5f9" }}>
        © 2026 ZTransportes — Sistema de Gestão Acadêmica — Desenvolvido por Vitor
      </footer>
    </div>
  );
}

export default HomePage;