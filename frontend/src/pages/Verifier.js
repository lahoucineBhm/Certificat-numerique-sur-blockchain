import { useState } from "react";

const API = "http://127.0.0.1:5000";

function Verifier() {
  const [hash, setHash] = useState("");
  const [result, setResult] = useState(null);

  const verifier = async () => {
    const res = await fetch(`${API}/verifier/${hash}`);
    const data = await res.json();
    setResult(data);
  };

  return (
        <div className="card">
          <h2>Vérifier un certificat</h2>
          <input
            placeholder="Hash du certificat"
            onChange={(e) => setHash(e.target.value)}
          />
          <button onClick={verifier}>Vérifier</button>

          {result && result.valide && (
            <div className="result success">
              <p><b>Nom :</b> {result.nom}</p>
              <p><b>Type :</b> {result.type}</p>
              <p><b>Date :</b> {new Date(result.date * 1000).toLocaleString()}</p>
              <p><b>Émetteur :</b> {result.emetteur}</p>
            </div>
          )}

          {result && !result.valide && (
            <div className="result error">
              ❌ Certificat invalide
            </div>
          )}
        </div>
  );
}

export default Verifier;
