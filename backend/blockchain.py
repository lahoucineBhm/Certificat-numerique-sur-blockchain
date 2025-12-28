from web3 import Web3
from config import (
    RPC_URL,
    CONTRACT_ADDRESS,
    CONTRACT_ABI,
    PRIVATE_KEY,
    ACCOUNT_ADDRESS
)

w3 = Web3(Web3.HTTPProvider(RPC_URL))

if not w3.is_connected():
    raise Exception("❌ Connexion à zkSync échouée")

contract = w3.eth.contract(
    address=Web3.to_checksum_address(CONTRACT_ADDRESS),
    abi=CONTRACT_ABI
)

def emettre_certificat(nom, type_certificat, hash_certificat):
    nonce = w3.eth.get_transaction_count(ACCOUNT_ADDRESS)

    tx = contract.functions.emettreCertificat(
        nom,
        type_certificat,
        hash_certificat
    ).build_transaction({
        "from": ACCOUNT_ADDRESS,
        "nonce": nonce,
        "gas": 3000000
    })

    signed_tx = w3.eth.account.sign_transaction(tx, PRIVATE_KEY)
    tx_hash = w3.eth.send_raw_transaction(signed_tx.raw_transaction)

    return tx_hash.hex()

def verifier_certificat(hash_certificat):
    return contract.functions.verifierCertificat(hash_certificat).call()

def get_nombre_certificats():
    return contract.functions.getNombreCertificats().call()

def get_certificat_by_index(index):
    return contract.functions.getCertificatByIndex(index).call()
