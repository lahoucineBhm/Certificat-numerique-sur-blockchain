import { useEffect, useState } from "react";

const API = "http://127.0.0.1:5000";

function Historique() {
  const [list, setList] = useState([]);

  useEffect(() => {
    fetch(`${API}/historique`)
      .then(res => res.json())
      .then(data => setList(data));
  }, []);

  return (
    <div className="card">
      <h3>Historique des certificats</h3>

      <table>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Type</th>
            <th>Hash</th>
          </tr>
        </thead>
        <tbody>
          {list.map((c, i) => (
            <tr key={i}>
              <td>{c.nom}</td>
              <td>{c.type}</td>
              <td>{c.hash.slice(0, 20)}...</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Historique;
