import { useState } from "react";

const API = "http://127.0.0.1:5000";

function Emettre() {
  const [nom, setNom] = useState("");
  const [type, setType] = useState("");
  const [hash, setHash] = useState("");
  const [message, setMessage] = useState(""); // nouvel état pour le message de succès

  const emettre = async () => {
    try {
      const res = await fetch(`${API}/emettre`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nom, type }),
      });
      const data = await res.json();
      
      if (res.ok) {
        setHash(data.hash);
        setMessage("Certificat émis avec succès !"); // message de succès
      } else {
        setMessage("Erreur lors de l'émission du certificat."); // message d'erreur
      }
    } catch (error) {
      setMessage("Erreur réseau : impossible de contacter le serveur.");
    }
  };

  return (
    <div className="card">
      <h3>Émettre un certificat</h3>

      <input placeholder="Nom du bénéficiaire" onChange={e => setNom(e.target.value)} />
      <input placeholder="Type de certificat" onChange={e => setType(e.target.value)} />

      <button onClick={emettre}>Émettre</button>

      {hash && <p><b>Hash :</b> {hash}</p>}
      {message && <p style={{ color: "green" }}>{message}</p>} {/* affichage du message */}
    </div>
  );
}

export default Emettre;

