"""DataForge Dynamic Pricing Engine."""

from fastapi import FastAPI

app = FastAPI(
    title="DataForge Pricing Engine",
    description="Dynamic pricing with supply-demand adjustment and Monte Carlo simulation",
    version="0.1.0",
)


@app.get("/health")
async def health_check() -> dict[str, str]:
    return {"status": "ok", "service": "dataforge-pricing"}
