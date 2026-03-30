"""DataForge ML Quality Pipeline — FastAPI application."""

from fastapi import FastAPI

app = FastAPI(
    title="DataForge ML Pipeline",
    description="Quality validation and ML processing for uploaded media",
    version="0.1.0",
)


@app.get("/health")
async def health_check() -> dict[str, str]:
    return {"status": "ok", "service": "dataforge-ml-pipeline"}
