from src.schemas.agent import Initiative
from src.config import env

import requests


def find_similar_embeddings(initiative: Initiative, limit=10) -> list[dict]:
    """
    Find similar initiatives using embeddings.
    """
    url = f"{env.BACKEND_URL}/embeddings/similar"

    payload = {"text": initiative.__str__(), "limit": limit}
    headers = {"accept": "*/*", "Content-Type": "application/json"}

    response = requests.post(url, json=payload, headers=headers)
    if response.status_code == 201:
        return response.json()
    else:
        response.raise_for_status()
