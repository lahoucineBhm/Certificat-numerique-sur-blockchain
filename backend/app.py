from flask import Flask, request, jsonify
from flask_cors import CORS
from blockchain import (
    emettre_certificat,
    verifier_certificat,
    get_nombre_certificats,
    get_certificat_by_index
)
from hashing import generer_hash

app = Flask(__name__)
CORS(app)

@app.route("/emettre", methods=["POST"])
def emettre():
    data = request.json
    nom = data["nom"]
    type_cert = data["type"]

    hash_cert = generer_hash(nom, type_cert)
    tx = emettre_certificat(nom, type_cert, hash_cert)

    return jsonify({
        "hash": hash_cert,
        "transaction": tx
    })

@app.route("/verifier/<hash_cert>", methods=["GET"])
def verifier(hash_cert):
    try:
        cert = verifier_certificat(hash_cert)
        return jsonify({
            "valide": True,
            "nom": cert[0],
            "type": cert[1],
            "date": cert[2],
            "emetteur": cert[3]
        })
    except:
        return jsonify({"valide": False})

@app.route("/historique", methods=["GET"])
def historique():
    total = get_nombre_certificats()
    result = []

    for i in range(total):
        cert = get_certificat_by_index(i)
        result.append({
            "nom": cert[0],
            "type": cert[1],
            "hash": cert[2],
            "date": cert[3],
            "emetteur": cert[4]
        })

    return jsonify(result)

if __name__ == "__main__":
    app.run(debug=True)
