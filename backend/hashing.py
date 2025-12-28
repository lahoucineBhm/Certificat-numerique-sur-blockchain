import hashlib

def generer_hash(nom, type_certificat):
    data = nom.strip().lower() + type_certificat.strip().lower()
    return hashlib.sha256(data.encode()).hexdigest()
