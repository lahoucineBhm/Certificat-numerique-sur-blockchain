from web3 import Web3
from config import RPC_URL, CONTRACT_ADDRESS, CONTRACT_ABI, PRIVATE_KEY

w3 = Web3(Web3.HTTPProvider(RPC_URL))

if not w3.is_connected():
    raise Exception("❌ Connexion au RPC échouée")

if not PRIVATE_KEY:
    raise Exception("❌ PRIVATE_KEY manquante (variable d'environnement)")

account = w3.eth.account.from_key(PRIVATE_KEY)
ACCOUNT_ADDRESS = account.address

contract = w3.eth.contract(
    address=Web3.to_checksum_address(CONTRACT_ADDRESS),
    abi=CONTRACT_ABI
)

def emettre_certificat(nom, type_certificat, hash_certificat, date_expiration, gas_limit=3_000_000):
    nonce = w3.eth.get_transaction_count(ACCOUNT_ADDRESS, "pending")
    chain_id = w3.eth.chain_id

    tx = contract.functions.emettreCertificat(
        nom,
        type_certificat,
        hash_certificat,
        int(date_expiration)
    ).build_transaction({
        "from": ACCOUNT_ADDRESS,
        "nonce": nonce,
        "chainId": chain_id,
        "gas": gas_limit,
        # Simple & compatible: gasPrice
        "gasPrice": w3.eth.gas_price,
    })

    signed_tx = w3.eth.account.sign_transaction(tx, PRIVATE_KEY)
    tx_hash = w3.eth.send_raw_transaction(signed_tx.raw_transaction)

    return tx_hash.hex()

def verifier_certificat(hash_certificat):
    (
        existe,
        valide,
        statut,
        temps_restant,
        nom,
        type_certificat,
        date_emission,
        date_expiration,
        emetteur
    ) = contract.functions.verifierCertificat(hash_certificat).call()

    # Interprétation du enum Statut:
    # 0 = INEXISTANT, 1 = VALIDE, 2 = EXPIRE
    statut_map = {0: "INEXISTANT", 1: "VALIDE", 2: "EXPIRE"}

    return {
        "hashCertificat": hash_certificat,
        "existe": bool(existe),
        "valide": bool(valide),
        "statut": statut_map.get(int(statut), "UNKNOWN"),
        "tempsRestantSecondes": int(temps_restant),
        "nom": nom,
        "typeCertificat": type_certificat,
        "dateEmission": int(date_emission),
        "dateExpiration": int(date_expiration),
        "emetteur": emetteur,
    }

def get_historique():
    return contract.functions.getHistorique().call()
