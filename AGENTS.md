# AGENTS.md — ClawTeam Agent Orchestration for DataForge

> Each agent operates independently within its domain. Agents share state via CLAUDE.md, TODO-MANUAL.md, and TIMELINE.md. Before starting work, every agent MUST read CLAUDE.md and check TODO-MANUAL.md for its assigned tasks.

---

## Agent Roster

### AGENT-01: Foundation & Infrastructure
**Domain:** Monorepo setup, Terraform, Kubernetes, CI/CD, Docker Compose, monitoring
**Stack:** Turborepo, pnpm, Terraform, Helm, GitHub Actions, Prometheus, Grafana

**Phase 0 Tasks:**
- P0-1: Initialize Turborepo monorepo with pnpm workspaces, TypeScript, ESLint, Prettier, Husky
- P0-2: Create Terraform modules (AWS VPC, EKS, RDS, S3, MSK, OpenSearch, ElastiCache, CloudFront)
- P0-4: Configure GitHub Actions CI/CD pipelines
- Docker Compose for local dev (PostgreSQL 16, MongoDB 7, Redis 7, Kafka KRaft, MinIO, OpenSearch)

**Phase 4 Tasks:**
- P4-1: Security scanning (Trivy, Snyk), secrets management (Vault or AWS Secrets Manager)
- P4-2: Audit logging and SOC 2 prep
- Load testing (k6), disaster recovery validation, runbook completion

**Working Directory:** `infrastructure/`, `docker-compose.yml`, `.github/`

---

### AGENT-02: API Gateway & Backend Services
**Domain:** NestJS API, authentication, authorization, project orchestration, CQRS/event sourcing
**Stack:** NestJS, TypeScript, Prisma, PostgreSQL, Kafka, Redis, JWT, SAML/OIDC

**Phase 1 Tasks:**
- P1-1: JWT auth with refresh token rotation, login/signup/password-reset, protected route middleware
- P1-2: Project/campaign creation wizard API — multi-step specification, modality selection, cost estimation
- P1-4: Admin review dashboard API — queue management, approval/rejection, performance metrics
- P1-5: Stripe Connect integration — contributor payouts, tax form collection, payout tracking

**Phase 2 Tasks:**
- P2-4: OpenAPI 3.1 spec generation, rate limiting, comprehensive error handling
- GraphQL layer for buyer catalog exploration
- gRPC endpoints for internal service communication
- Webhook system for buyer notifications

**Working Directory:** `apps/api/`

**Key Patterns:**
- Every endpoint must have OpenAPI annotation via `@nestjs/swagger`
- Use CQRS pattern: commands write to PostgreSQL, events to Kafka, queries from OpenSearch
- Row-level security for multi-tenant isolation
- All payment operations must be idempotent

---

### AGENT-03: Frontend & Design System
**Domain:** Next.js marketplace, enterprise dashboard, contributor portal, admin panel, design system
**Stack:** Next.js 15, React 19, TypeScript, Tailwind CSS, Radix UI, Storybook

**Phase 0 Tasks:**
- P0-3: Base Next.js 15 app with App Router, Tailwind, Radix UI/shadcn, Storybook

**Phase 1 Tasks:**
- Enterprise dashboard: dataset catalog, search/filter, dataset detail pages, sample previews
- Contributor portal: onboarding wizard, task browser, upload interface (Uppy + tus), earnings dashboard
- Admin panel: submission review queue with media player, campaign builder
- Project specification wizard UI (multi-step, dynamic fields per modality)

**Phase 2 Tasks:**
- P2-3: Real-time analytics dashboard with WebSocket/Socket.io for live project metrics
- Embedded data visualization: t-SNE/UMAP projections, spectrograms, temporal activity graphs
- Interactive pricing estimator UI

**Working Directory:** `apps/web/`, `packages/ui/`

**Key Patterns:**
- Server Components by default, Client Components only when interactivity required
- Design system in `packages/ui/` — all components in Storybook first
- Mobile-responsive design throughout (contributors use phones)
- Skeleton loaders for all async data
- Tailwind only — no CSS modules, no styled-components

---

### AGENT-04: Upload & Media Processing Pipeline
**Domain:** tus upload server, FFmpeg transcoding, media normalization, S3 management
**Stack:** Go, tusd, FFmpeg, Kafka, S3, MinIO

**Phase 1 Tasks:**
- Go tus upload service with S3 backend
- Chunk upload handler (5-50MB adaptive based on connection)
- Per-chunk checksum verification (SHA-256)
- Kafka producer: emit `upload.completed` events
- Pre-upload validation (file type whitelist, size limits per modality)
- Rate limiting per contributor

**Phase 2 Tasks:**
- FFmpeg transcoding workers: H.264/H.265 renditions, HLS previews, keyframe thumbnails
- Audio normalization: WAV (48kHz 16-bit lossless) + FLAC + MP3 preview
- Image processing: WebP thumbnails, JPEG renditions at multiple sizes
- ExifTool metadata extraction
- Output to S3 `processed` bucket with lifecycle rules

**Working Directory:** `services/upload/`, `services/transcoding/`

**Key Patterns:**
- All upload operations must be resumable (tus protocol)
- Media in staging bucket for max 7 days, then auto-delete
- Processed media gets Intelligent-Tiering lifecycle policy
- All transcoding is idempotent — re-processing same input produces same output
- Emit Kafka events at every pipeline stage for observability

---

### AGENT-05: ML Quality & Intelligence Pipeline
**Domain:** Automated quality scoring, PII detection, content moderation, ASR, embeddings, matching
**Stack:** Python, FastAPI, PyTorch, Celery, KServe, YOLOv8, Whisper, CLIP, RetinaFace, Presidio

**Phase 1 Tasks:**
- Kafka consumer: listen for `upload.completed` events
- Basic quality checks via cloud APIs (initial: Google Vision, Whisper API)
- Content moderation (safety classifier)
- Quality score aggregation → MongoDB + PostgreSQL update

**Phase 2 Tasks:**
- P2-1: Deploy custom quality scoring models on KServe with canary deployment
- P2-2: Contributor-task matching algorithm (embeddings + cosine similarity + contextual bandits)
- Self-hosted ML models replacing cloud APIs:
  - YOLOv8: object detection, scene classification
  - Whisper large-v3: ASR with word-level timestamps
  - CLIP: semantic embeddings for search + similarity
  - RetinaFace: face detection for PII
  - Presidio: text PII detection (regex + spaCy NER)
  - PESQ/POLQA: audio quality scoring
  - MUSIQ/NIMA: visual quality scoring
  - pHash + CLIP: duplicate detection
- Human review routing for edge cases (uncertainty > threshold)
- Active learning: identify highest-uncertainty samples for human review

**Phase 3 Tasks:**
- P3-1: Federated learning prototype (Flower framework)
- Privacy-preserving aggregation with differential privacy
- Model performance analyzer + collection recommender

**Working Directory:** `services/ml-pipeline/`, `services/matching/`, `packages/ml/`

**Key Patterns:**
- ALL ML checks run in parallel via Celery task groups
- Target: <5 min latency for 60-second video clip
- Every model must have versioned deployment with rollback capability
- Quality scores are probabilistic (include confidence intervals)
- PII detection must have near-zero false negatives (prefer over-detection)

---

### AGENT-06: Mobile App (Flutter)
**Domain:** Contributor capture app — camera, mic, offline-first, background upload, earnings
**Stack:** Flutter, Dart, SQLite, tus client, Sumsub SDK

**Phase 2 Tasks:**
- P2-5: Core Flutter app structure
- Contributor onboarding + KYC (Sumsub SDK integration)
- Camera capture with guided overlays (framing guides, lighting indicator)
- Audio recording with real-time quality indicators (volume meter, noise warning)
- Offline-first: SQLite task queue, capture without connectivity
- Background tus upload with adaptive chunking (cellular vs WiFi)
- Earnings dashboard + payout requests
- Battery/storage-aware upload scheduling
- Push notifications for new tasks matching skills

**Working Directory:** `apps/mobile/`

**Key Patterns:**
- Offline-first is non-negotiable — contributors may be in areas with poor connectivity
- All uploads resumable (tus protocol)
- Camera access must request minimal permissions, explain clearly
- Battery-aware: pause uploads below 15% battery
- Storage-aware: warn when device storage <500MB

---

### AGENT-07: Payments, Compliance & Provenance
**Domain:** Stripe Connect, Hyperwallet, tax compliance, consent management, blockchain provenance
**Stack:** Stripe API, Hyperwallet API, Sumsub, Hyperledger Fabric, Solidity (optional)

**Phase 1 Tasks:**
- Stripe Connect Express for contributor accounts
- Buyer payment processing (Stripe Checkout)
- Escrow: hold payment until submission approved
- Automated payout scheduling (instant/daily/weekly configurable)

**Phase 2 Tasks:**
- Tax compliance: W-9/W-8BEN collection, 1099-NEC generation (US), DAC7 (EU)
- Hyperwallet integration for 200+ country payouts (UPI India, M-Pesa Kenya, etc.)
- Multi-currency support with transparent FX rates

**Phase 3 Tasks:**
- P3-2: Smart contract for provenance tracking (Hyperledger Fabric or Solidity/Hardhat)
- P3-4: Contributor revenue sharing — royalty calculation, portfolio dashboard, automated tax docs
- Consent record management with blockchain anchoring
- License generation automation: template selection, parameter population, e-signature

**Phase 4 Tasks:**
- P4-2: SOC 2 audit logging
- P4-4: SOC 2 Type II evidence collection, policy docs, control testing
- GDPR Article 30 records, CCPA compliance program, DPAs

**Working Directory:** `apps/api/src/modules/payments/`, `apps/api/src/modules/compliance/`

---

### AGENT-08: Open-Source Tooling & SDKs
**Domain:** OSS format conversion, quality metrics, provenance schemas, Python/Node SDKs
**Stack:** Python, TypeScript, Apache 2.0 / MIT licenses

**Phase 2 Tasks:**
- Python SDK: `pip install dataforge` — dataset search, purchase, download, streaming
- Node SDK: `npm install @dataforge/sdk` — same capabilities

**Phase 3 Tasks:**
- Format converter library: COCO ↔ YOLO ↔ Pascal VOC ↔ KITTI ↔ WebDataset ↔ HuggingFace
- Quality metrics library: inter-annotator agreement, consistency scoring, bias detection
- Provenance schemas: consent documentation, chain-of-custody, license verification (JSON Schema + Protobuf)
- Annotation interface components (web + mobile, modular, customizable)

**Working Directory:** `oss/`, `packages/shared/`

---

## Agent Coordination Rules

1. **No agent writes to another agent's working directory** without explicit handoff in TODO-MANUAL.md
2. **Shared contracts live in `packages/shared/`** — types, constants, validation schemas
3. **Database schema changes** are ONLY made by AGENT-02 (API) — other agents consume via Prisma client
4. **Kafka event schemas** are defined in `packages/shared/src/events/` — all agents reference these
5. **API contracts** (OpenAPI, GraphQL schema) are the source of truth — frontend and SDKs generate types from these
6. **Environment variables** are centralized in `.env.example` with documentation
7. **Every agent updates TIMELINE.md** with what it accomplished before session end

## Execution Order

```
PHASE 0 (Foundation):     AGENT-01 first, then AGENT-03 (P0-3) in parallel
PHASE 1 (MVP Core):       AGENT-02 + AGENT-03 + AGENT-04 in parallel, AGENT-07 joins mid-phase
PHASE 2 (Scale):          All agents active — AGENT-05 is critical path
PHASE 3 (Differentiation): AGENT-05 (federated) + AGENT-07 (blockchain) + AGENT-08 (OSS)
PHASE 4 (Enterprise):     AGENT-01 (security) + AGENT-07 (compliance) lead
```
