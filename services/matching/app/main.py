"""DataForge Contributor-Task Matching Service."""

from fastapi import FastAPI

app = FastAPI(
    title="DataForge Matching Service",
    description="Contributor-task matching via embeddings and cosine similarity",
    version="0.1.0",
)


@app.get("/health")
async def health_check() -> dict[str, str]:
    return {"status": "ok", "service": "dataforge-matching"}
