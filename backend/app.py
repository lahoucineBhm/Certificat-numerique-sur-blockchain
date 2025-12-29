import time
from flask import Flask, request, jsonify
from flask_cors import CORS

from blockchain import (
    emettre_certificat,
    verifier_certificat,
    get_historique
)
from hashing import generer_hash

app = Flask(__name__)
CORS(app)


@app.route("/emettre", methods=["POST"])
def emettre():
    data = request.get_json(force=True)

    nom = data.get("nom", "").strip()
    type_cert = data.get("type", "").strip()
    duree_jours = data.get("dureeJours", None)

    if not nom or not type_cert:
        return jsonify({"error": "Champs requis: nom, type"}), 400

    if duree_jours is None:
        return jsonify({"error": "Champs requis: dureeJours (ex: 365)"}), 400

    try:
        duree_jours = int(duree_jours)
    except (ValueError, TypeError):
        return jsonify({"error": "dureeJours doit etre un entier"}), 400

    if duree_jours <= 0:
        return jsonify({"error": "dureeJours doit etre > 0"}), 400

    # Calcul dateExpiration: maintenant + (jours * 86400)
    now = int(time.time())
    date_expiration = now + (duree_jours * 24 * 60 * 60)

    # Génération du hash (ton design actuel)
    hash_cert = data.get("hash") or generer_hash(nom, type_cert)

    try:
        tx_hash = emettre_certificat(nom, type_cert, hash_cert, date_expiration)
        return jsonify({
            "hash": hash_cert,
            "transaction": tx_hash,
            "dateEmission": now,
            "dateExpiration": date_expiration,
            "dureeJours": duree_jours
        }), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/verifier/<hash_cert>", methods=["GET"])
def verifier(hash_cert):
    try:
        result = verifier_certificat(hash_cert)
        return jsonify(result), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/historique", methods=["GET"])
def historique():
    details = request.args.get("details", "false").lower() in ("1", "true", "yes")

    try:
        hashes = get_historique()

        if not details:
            return jsonify({
                "total": len(hashes),
                "hashes": hashes
            }), 200

        items = []
        for h in hashes:
            items.append(verifier_certificat(h))

        return jsonify({
            "total": len(hashes),
            "items": items
        }), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True)
