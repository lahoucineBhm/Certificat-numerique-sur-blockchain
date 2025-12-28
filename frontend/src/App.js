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
        <h2>🎓 Certificat Blockchain</h2>
        <ul>
          <li onClick={() => setPage("emettre")}>Émettre</li>
          <li onClick={() => setPage("verifier")}>Vérifier</li>
          <li onClick={() => setPage("historique")}>Historique</li>
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
