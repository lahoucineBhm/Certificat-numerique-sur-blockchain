import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_ROOT = os.path.dirname(BASE_DIR)

ABI_PATH = os.path.join(PROJECT_ROOT, "smart_contrat", "abi", "certificat_abi.json")

with open(ABI_PATH, "r") as f:
    CONTRACT_ABI = f.read()


RPC_URL = "https://sepolia.era.zksync.dev"
PRIVATE_KEY = "f5bfd9c1416d131d855f9ccf0fb43c3afc3c26e174e2df7dcddb0bb264580dff"
ACCOUNT_ADDRESS = "0x28AA1B9cCe772fbfd98eF8938CA5da7B5798D88b"
CONTRACT_ADDRESS = "0xd17018766F4BACAF9b1E01dB28FDB05826D214B6"