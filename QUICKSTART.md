# QUICKSTART.md — DataForge: First Session Entry Point

> **Read this first.** Then read CLAUDE.md for full context.

## What is DataForge?

A **multimodal AI training data marketplace** — the "Luel.ai killer" — connecting AI enterprises with a global contributor network to source rights-cleared video, audio, image, text, and sensor data for training foundation models, robotics, speech systems, and computer vision.

## Why This Wins

| Luel has... | We have... |
|-------------|------------|
| No mobile app | Flutter offline-first capture app |
| No API for buyers | REST + GraphQL + gRPC + Python/Node SDKs |
| Perpetual biometric license extraction | Revocable non-exclusive licenses, GDPR-first |
| Commodity cloud API for QA | Custom ML quality pipeline (YOLOv8, Whisper, CLIP, RetinaFace) |
| No revenue sharing | Contributor co-ownership: 60-80% base + 10-20% royalty |
| No pricing transparency | Real-time interactive cost estimation |

## Repo Structure

```
dataforge/
├── apps/web/           # Next.js 15 marketplace
├── apps/api/           # NestJS API gateway
├── apps/mobile/        # Flutter contributor app
├── services/upload/    # Go tus upload server
├── services/ml-pipeline/ # Python quality validation
├── services/transcoding/ # Go FFmpeg workers
├── services/matching/  # Python contributor matching
├── services/pricing/   # Python pricing engine
├── packages/shared/    # Shared types, utils
├── packages/db/        # Prisma schema + migrations
├── packages/ui/        # Design system (Tailwind + Radix)
├── packages/ml/        # ML model code
├── oss/                # Open-source tooling releases
├── infrastructure/     # Terraform + K8s
└── docs/               # Architecture, API specs, runbooks
```

## Session Protocol

1. **Read CLAUDE.md** — full product/technical context
2. **Check TODO-MANUAL.md** — find current phase, pick next unchecked tasks
3. **Check TIMELINE.md** — see what was done last session
4. **Run gap analysis** before writing: `find . -name "*.ts" -o -name "*.py" | head -50`
5. **Never overwrite** — audit existing code first, extend incrementally
6. **Update TODO-MANUAL.md** — check boxes for completed tasks
7. **Update TIMELINE.md** — append session summary

## First Session (P0-1): Start Here

```bash
# 1. Initialize monorepo
npx create-turbo@latest dataforge --package-manager pnpm

# 2. Create workspace structure
mkdir -p apps/{web,api,mobile} services/{upload,ml-pipeline,transcoding,matching,pricing}
mkdir -p packages/{shared,db,ui,ml} oss/{format-converter,quality-metrics,provenance-schemas}
mkdir -p infrastructure/{terraform,kubernetes,monitoring} docs/{architecture,api,runbooks}

# 3. Configure TypeScript, ESLint, Prettier, Husky
# (See CLAUDE.md Section 3 for all config details)

# 4. Start Docker Compose for local dev
docker compose up -d
# PostgreSQL 16 :5432, MongoDB 7 :27017, Redis 7 :6379
# Kafka KRaft :9092, MinIO :9000, OpenSearch :9200
```

## Key Files to Read

| File | Purpose |
|------|---------|
| `CLAUDE.md` | Complete product context, tech stack, DB schemas, pipeline design, API spec |
| `AGENTS.md` | ClawTeam agent assignments — who builds what |
| `TODO-MANUAL.md` | Granular task checklist with checkboxes |
| `TIMELINE.md` | Session log — what was done, what's next |
| `QUICKSTART.md` | This file — entry point |

## Tech Stack Summary

- **Frontend:** Next.js 15 + TypeScript + Tailwind + Radix UI
- **API:** NestJS + Prisma + PostgreSQL 16 + MongoDB
- **Upload:** Go + tusd (tus protocol) + S3
- **ML:** Python + FastAPI + Celery + KServe + YOLOv8/Whisper/CLIP
- **Mobile:** Flutter (offline-first, background tus upload)
- **Events:** Apache Kafka (MSK)
- **Search:** OpenSearch + Qdrant (vector)
- **Payments:** Stripe Connect + Hyperwallet
- **KYC:** Sumsub
- **Infra:** AWS (EKS, RDS, S3, MSK, CloudFront) + Terraform
