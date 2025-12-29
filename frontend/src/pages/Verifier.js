import { useState } from "react";

const API_BASE = "http://127.0.0.1:5000";

export default function Verifier() {
  const [hash, setHash] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  const formatDate = (ts) => (ts ? new Date(ts * 1000).toLocaleString() : "-");

  const formatRemaining = (seconds) => {
    const s = Number(seconds || 0);
    if (s <= 0) return "0s";
    const days = Math.floor(s / 86400);
    const hours = Math.floor((s % 86400) / 3600);
    const mins = Math.floor((s % 3600) / 60);
    return `${days}j ${hours}h ${mins}m`;
  };

  const copy = async (text) => { try { await navigator.clipboard.writeText(text); } catch {} };

  const fetchCert = async () => {
    setError("");
    setData(null);

    if (!hash.trim()) {
      setError("Veuillez saisir un hash.");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/verifier/${encodeURIComponent(hash.trim())}`);
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || "Erreur vérification.");
      setData(json);
    } catch (err) {
      setError(err.message || "Erreur inconnue.");
    } finally {
      setLoading(false);
    }
  };

  const badge =
    data?.statut === "VALIDE" ? "badge badge-ok" :
    data?.statut === "EXPIRE" ? "badge badge-bad" :
    "badge badge-warn";

  const msg =
    data?.statut === "VALIDE" ? "✅ Certificat valide" :
    data?.statut === "EXPIRE" ? "❌ Certificat expiré" :
    "⚠️ Certificat introuvable";

  return (
    <div>
      <h3 className="page-title">Vérifier</h3>

      <div className="card">
        <h4>Rechercher par hash</h4>

        <label>Hash certificat</label>
        <input
          value={hash}
          onChange={(e) => setHash(e.target.value)}
        />

        <div className="actions">
          <button className="btn" onClick={fetchCert} disabled={loading}>
            {loading ? "Vérification..." : "Vérifier"}
          </button>
          <button className="btn btn-ghost" type="button" onClick={() => { setHash(""); setData(null); setError(""); }} disabled={loading}>
            Effacer
          </button>
        </div>

        {error && <div className="alert error">❌ {error}</div>}
      </div>

      {loading && (
        <div className="card">
          <div className="skeleton" />
          <div style={{ height: 12 }} />
          <div className="skeleton" />
        </div>
      )}

      {data && (
        <div className="card">
          <div className="result-header">
            <div>
              <h4 style={{ margin: 0 }}>Résultat</h4>
              <div className="result-sub">
                <span className={badge}>{data.statut}</span>
                <span className="result-msg">{msg}</span>
              </div>
            </div>

            <div className="result-chip">
              <span className="muted">Temps restant</span>
              <span className="chip-value">
                {data.statut === "VALIDE" ? formatRemaining(data.tempsRestantSecondes) : "—"}
              </span>
            </div>
          </div>

          <div className="divider" />

          {!data.existe ? (
            <p className="muted">Aucun certificat ne correspond à ce hash.</p>
          ) : (
            <div className="kv-grid">
              <div className="kv">
                <div className="k">Hash</div>
                <div className="v mono">{data.hashCertificat}</div>
                <div className="row-actions" style={{ marginTop: 8 }}>
                  <button className="mini-btn" onClick={() => copy(data.hashCertificat)}>Copier</button>
                </div>
              </div>

              <div className="kv">
                <div className="k">Nom</div>
                <div className="v">{data.nom}</div>
              </div>

              <div className="kv">
                <div className="k">Type</div>
                <div className="v">{data.typeCertificat}</div>
              </div>

              <div className="kv">
                <div className="k">Émetteur</div>
                <div className="v mono">{data.emetteur}</div>
                <div className="row-actions" style={{ marginTop: 8 }}>
                  <button className="mini-btn" onClick={() => copy(data.emetteur)}>Copier</button>
                </div>
              </div>

              <div className="kv">
                <div className="k">Date émission</div>
                <div className="v">{formatDate(data.dateEmission)}</div>
              </div>

              <div className="kv">
                <div className="k">Date expiration</div>
                <div className="v">{formatDate(data.dateExpiration)}</div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
