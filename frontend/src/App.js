import { useState } from "react";
import Emettre from "./pages/Emettre";
import Verifier from "./pages/Verifier";
import Historique from "./pages/Historique";
import "./App.css";

function App() {
  const [page, setPage] = useState("emettre");

  return (
    <div>
      <nav className="navbar">
        <h2 className="brand">🎓 Certificat Blockchain</h2>

        <ul className="nav-links">
          <li
            className={`nav-item ${page === "emettre" ? "active" : ""}`}
            onClick={() => setPage("emettre")}
          >
            Émettre
          </li>

          <li
            className={`nav-item ${page === "verifier" ? "active" : ""}`}
            onClick={() => setPage("verifier")}
          >
            Vérifier
          </li>

          <li
            className={`nav-item ${page === "historique" ? "active" : ""}`}
            onClick={() => setPage("historique")}
          >
            Historique
          </li>
        </ul>
      </nav>

      <div className="content">
        {page === "emettre" && <Emettre />}
        {page === "verifier" && <Verifier />}
        {page === "historique" && <Historique />}
      </div>
    </div>
  );
}

export default App;
