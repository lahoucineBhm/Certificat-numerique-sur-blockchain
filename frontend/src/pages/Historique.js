import { useEffect, useMemo, useState } from "react";

const API_BASE = "http://127.0.0.1:5000";

export default function Historique() {
  const [loading, setLoading] = useState(false);
  const [hashes, setHashes] = useState([]);
  const [error, setError] = useState("");
  const [q, setQ] = useState("");

  const load = async () => {
    setError("");
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/historique`);
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || "Erreur historique.");
      setHashes(json.hashes || []);
    } catch (err) {
      setError(err.message || "Erreur inconnue.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return hashes;
    return hashes.filter((h) => String(h).toLowerCase().includes(s));
  }, [hashes, q]);

  const copy = async (text) => { try { await navigator.clipboard.writeText(text); } catch {} };

  return (
    <div>
      <h3 className="page-title">Historique</h3>

      <div className="card">
        <h4>Liste des certificats</h4>

        <div className="grid-2">
          <div>
            <label>Recherche</label>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Filtrer par hash..."
            />
          </div>
          <div>
            <label>Total</label>
            <input value={`${hashes.length} certificat(s)`} readOnly />
          </div>
        </div>

        <div className="actions">
          <button className="btn" onClick={load} disabled={loading}>
            {loading ? "Chargement..." : "Rafraîchir"}
          </button>
          <button className="btn btn-ghost" type="button" onClick={() => setQ("")} disabled={loading}>
            Effacer filtre
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

      <div className="card">
        <h4>Résultats ({filtered.length})</h4>

        {filtered.length === 0 ? (
          <p className="muted">Aucun certificat.</p>
        ) : (
          <div className="table-wrap">
            <table className="table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Hash</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((h, idx) => (
                  <tr key={h}>
                    <td>{idx + 1}</td>
                    <td className="mono">{h}</td>
                    <td>
                      <div className="row-actions">
                        <button className="mini-btn" onClick={() => copy(h)}>Copier</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
