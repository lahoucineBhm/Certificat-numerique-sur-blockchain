import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_ROOT = os.path.dirname(BASE_DIR)

ABI_PATH = os.path.join(PROJECT_ROOT, "smart_contrat", "abi", "certificat_abi.json")

with open(ABI_PATH, "r") as f:
    CONTRACT_ABI = f.read()


RPC_URL = os.getenv("RPC_URL")
PRIVATE_KEY = os.getenv("PRIVATE_KEY")
ACCOUNT_ADDRESS = os.getenv("ACCOUNT_ADDRESS")
CONTRACT_ADDRESS = os.getenv("CONTRACT_ADDRESS")