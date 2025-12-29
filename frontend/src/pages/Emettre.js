import { useState } from "react";

const API_BASE = "http://127.0.0.1:5000";

export default function Emettre() {
  const [nom, setNom] = useState("");
  const [type, setType] = useState("");
  const [dureeJours, setDureeJours] = useState(365);

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const formatDate = (ts) => (ts ? new Date(ts * 1000).toLocaleString() : "-");

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setResult(null);

    if (!nom.trim() || !type.trim()) {
      setError("Veuillez remplir Nom et Type.");
      return;
    }

    const d = Number(dureeJours);
    if (!Number.isFinite(d) || d <= 0) {
      setError("Durée (jours) doit être > 0.");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/emettre`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nom: nom.trim(),
          type: type.trim(),
          dureeJours: d,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Erreur émission.");

      setResult(data);
    } catch (err) {
      setError(err.message || "Erreur inconnue.");
    } finally {
      setLoading(false);
    }
  };

  const copy = async (text) => {
    try { await navigator.clipboard.writeText(text); } catch {}
  };

  return (
    <div>
      <h3 className="page-title">Émettre</h3>

      <div className="card">
        <h4>Informations du certificat</h4>

        <form onSubmit={onSubmit}>
          <div className="grid-2">
            <div>
              <label>Nom</label>
              <input value={nom} onChange={(e) => setNom(e.target.value)}  />
            </div>
            <div>
              <label>Type</label>
              <input value={type} onChange={(e) => setType(e.target.value)} />
            </div>
          </div>

          <label>Durée (jours)</label>
          <input type="number" value={dureeJours} onChange={(e) => setDureeJours(e.target.value)} min={1} />

          <div className="actions">
            <button className="btn" disabled={loading}>
              {loading ? "Émission..." : "Émettre le certificat"}
            </button>
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => { setNom(""); setType(""); setDureeJours(365); setResult(null); setError(""); }}
              disabled={loading}
            >
              Réinitialiser
            </button>
          </div>

        </form>

        {error && <div className="alert error">❌ {error}</div>}
        {result && (
          <div className="alert ok">
            ✅ Certificat émis. Transaction envoyée.
          </div>
        )}
      </div>

      {result && (
        <div className="card">
          <h4>Résumé</h4>

          <div className="kv-grid">
            <div className="kv">
              <div className="k">Hash</div>
              <div className="v mono">{result.hash}</div>
              <div className="row-actions" style={{ marginTop: 8 }}>
                <button className="mini-btn" onClick={() => copy(result.hash)}>Copier</button>
              </div>
            </div>

            <div className="kv">
              <div className="k">Transaction</div>
              <div className="v mono">{result.transaction}</div>
              <div className="row-actions" style={{ marginTop: 8 }}>
                <button className="mini-btn" onClick={() => copy(result.transaction)}>Copier</button>
              </div>
            </div>

            <div className="kv">
              <div className="k">Date émission</div>
              <div className="v">{formatDate(result.dateEmission)}</div>
            </div>

            <div className="kv">
              <div className="k">Date expiration</div>
              <div className="v">{formatDate(result.dateExpiration)}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
