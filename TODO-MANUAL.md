# TODO-MANUAL.md — DataForge Granular Task Checklist

> Check boxes as tasks complete. Each task has an agent assignment and dependency chain.
> **Current Phase: PHASE 0 — Foundation**

---

## PHASE 0: Foundation (Weeks 1-4)

### P0-1: Monorepo Setup [AGENT-01]

- [x] Initialize git repo: `mohaktnbt/dataforge`
- [x] Configure Turborepo with pnpm workspaces
- [x] Create workspace structure: `apps/web`, `apps/api`, `apps/mobile`, `services/upload`, `services/ml-pipeline`, `services/transcoding`, `services/matching`, `services/pricing`, `packages/shared`, `packages/db`, `packages/ui`, `packages/ml`, `oss/`, `infrastructure/`, `docs/`
- [x] Configure root `tsconfig.json` with strict mode, path aliases
- [x] Configure ESLint (extends `@typescript-eslint/recommended`)
- [x] Configure Prettier (printWidth: 100, singleQuote: true, trailingComma: all)
- [x] Configure Husky pre-commit hooks (lint-staged)
- [x] Create `.env.example` with all environment variables documented
- [x] Create root `docker-compose.yml`:
  - [x] PostgreSQL 16 (port 5432)
  - [x] MongoDB 7 (port 27017)
  - [x] Redis 7 (port 6379)
  - [x] Kafka KRaft (port 9092)
  - [x] MinIO (port 9000, S3-compatible)
  - [x] OpenSearch (port 9200)
- [x] Verify `turbo run build` works across all workspaces
- [x] Verify `turbo run lint` works across all workspaces
- [x] Verify `turbo run test` works (even if tests are empty stubs)

### P0-2: Infrastructure as Code [AGENT-01]

- [ ] Create Terraform module: AWS VPC (public/private subnets, NAT gateway)
- [ ] Create Terraform module: EKS cluster (managed node groups, GPU node pool)
- [ ] Create Terraform module: RDS PostgreSQL 16 (Multi-AZ, encryption at rest)
- [ ] Create Terraform module: S3 buckets (staging, processed, archive) with lifecycle rules
- [ ] Create Terraform module: MSK Kafka cluster (KRaft mode)
- [ ] Create Terraform module: OpenSearch domain
- [ ] Create Terraform module: ElastiCache Redis Cluster
- [ ] Create Terraform module: CloudFront distribution
- [ ] Configure remote state (S3 backend + DynamoDB locking)
- [ ] Create environment configs: `dev`, `staging`, `production`
- [ ] Verify `terraform plan` is clean for dev environment

### P0-3: Next.js App Foundation [AGENT-03]

- [x] Initialize Next.js 15 with App Router in `apps/web/`
- [x] Configure TypeScript strict mode
- [x] Install and configure Tailwind CSS v4
- [ ] Install Radix UI primitives (or shadcn/ui components)
- [ ] Set up Storybook 8 for component development
- [ ] Create design tokens: colors, spacing, typography, shadows
- [ ] Build core layout components: Header, Sidebar, Footer, PageContainer
- [ ] Build UI primitives: Button, Input, Select, Card, Badge, Modal, Toast
- [ ] Create auth layout (login/signup pages skeleton)
- [ ] Create dashboard layout (sidebar nav, content area)
- [ ] Verify Storybook runs with all components
- [ ] Verify responsive design at mobile/tablet/desktop breakpoints

### P0-4: CI/CD Pipelines [AGENT-01]

- [x] GitHub Actions workflow: `ci.yml` — lint, typecheck, test on every PR
- [ ] GitHub Actions workflow: `cd-staging.yml` — build + deploy on merge to `develop`
- [ ] GitHub Actions workflow: `cd-production.yml` — blue-green deploy on merge to `main`
- [ ] Docker build for each service (multi-stage, minimal images)
- [ ] ECR repositories for all service images
- [ ] Verify staging deployment works end-to-end

---

## PHASE 1: MVP Core (Weeks 5-12)

### P1-1: Authentication System [AGENT-02]

- [ ] JWT access token (15min expiry) + refresh token (7day, rotation)
- [ ] `POST /auth/register` — email/password signup with email verification
- [ ] `POST /auth/login` — returns JWT pair
- [ ] `POST /auth/refresh` — rotate refresh token
- [ ] `POST /auth/forgot-password` — send reset email
- [ ] `POST /auth/reset-password` — validate token, update password
- [ ] Role-based guards: CONTRIBUTOR, BUYER, ADMIN, REVIEWER
- [ ] Protected route middleware (NestJS guards)
- [ ] Rate limiting on auth endpoints (10 attempts/15min)
- [ ] SAML 2.0 SSO integration (for enterprise buyers)
- [ ] OIDC SSO integration (Google Workspace, Okta)
- [ ] Session management with Redis-backed token blacklist
- [ ] Unit tests for all auth flows
- [ ] Integration tests: login → access protected route → refresh → access again

### P1-2: Database Schema & Prisma Setup [AGENT-02]

- [x] Create Prisma schema matching CLAUDE.md section 4
- [ ] Run initial migration: `prisma migrate dev`
- [ ] Seed script with test data (users, datasets, campaigns, submissions)
- [ ] Prisma client generated and shared via `packages/db`
- [ ] MongoDB connection setup via Mongoose in `services/ml-pipeline`
- [ ] Index creation for common query patterns

### P1-3: Contributor Experience [AGENT-02 + AGENT-03]

**API (AGENT-02):**

- [ ] `POST /contributors/register` — contributor-specific onboarding
- [ ] `POST /contributors/kyc` — Sumsub webhook handler for KYC results
- [ ] `GET /contributors/tasks` — list available tasks matching skills/geo/language
- [ ] `POST /contributors/submissions` — create submission record, return tus upload URL
- [ ] `GET /contributors/earnings` — lifetime earnings, pending, available to withdraw
- [ ] `POST /contributors/payouts/request` — initiate payout via preferred method
- [ ] `GET /contributors/profile` — view/edit profile, skills, languages, equipment

**Frontend (AGENT-03):**

- [ ] Contributor onboarding wizard (4 steps: account → profile → skills → KYC)
- [ ] Task browser with filters (modality, language, pay rate, deadline)
- [ ] Task detail page with instructions, examples, requirements
- [ ] Upload interface using Uppy + tus client (progress bar, retry, cancel)
- [ ] Submissions tracker (pending, approved, rejected with reviewer notes)
- [ ] Earnings dashboard (chart: daily/weekly/monthly, lifetime total, pending)
- [ ] Payout request form (select method, enter amount, confirm)

### P1-4: Upload Service MVP [AGENT-04]

- [ ] Go project setup in `services/upload/`
- [ ] tusd server with S3 backend (MinIO for local dev)
- [ ] Upload endpoint with authentication (JWT validation)
- [ ] File type validation (whitelist: mp4, mov, wav, mp3, jpg, png, webm, flac)
- [ ] File size limits per modality (video: 2GB, audio: 500MB, image: 50MB)
- [ ] Per-chunk SHA-256 checksum verification
- [ ] Kafka producer: emit `upload.completed` with metadata
- [ ] Rate limiting: max 10 concurrent uploads per contributor
- [ ] Health check endpoint
- [ ] Unit tests + integration test with MinIO

### P1-5: Admin Review System [AGENT-02 + AGENT-03]

**API (AGENT-02):**

- [ ] `GET /admin/review-queue` — paginated, filterable (status, modality, campaign)
- [ ] `GET /admin/review-queue/:submissionId` — full details + pre-signed media URL
- [ ] `POST /admin/review/:submissionId/approve` — approve, trigger payment
- [ ] `POST /admin/review/:submissionId/reject` — reject with notes
- [ ] `POST /admin/review/:submissionId/escalate` — escalate to senior reviewer

**Frontend (AGENT-03):**

- [ ] Review queue table with sorting, filtering, bulk actions
- [ ] Review detail page with embedded media player (video/audio/image viewer)
- [ ] Side-by-side view: task instructions vs submission
- [ ] Approve/reject with notes form
- [ ] Performance metrics: reviews/day, approval rate, avg review time

### P1-6: Payment Integration [AGENT-07]

- [ ] Stripe Connect Express account creation for contributors
- [ ] Stripe Checkout for buyer dataset purchases
- [ ] Escrow logic: hold payment until submission approved
- [ ] Automated payout: on approval, transfer to contributor's connected account
- [ ] Payout scheduling: instant (Stripe Instant Payouts), daily batch, weekly batch
- [ ] Stripe webhook handler: `payment_intent.succeeded`, `transfer.created`, `payout.paid`
- [ ] W-9 / W-8BEN tax form collection flow
- [ ] Payout status tracking: PENDING → PROCESSING → COMPLETED / FAILED
- [ ] Unit tests with Stripe test mode
- [ ] Integration test: full cycle (buyer pays → contributor uploads → admin approves → payout)

### P1-7: Dataset Catalog MVP [AGENT-02 + AGENT-03]

**API (AGENT-02):**

- [ ] `GET /datasets` — search, filter (modality, category, language, quality, price range)
- [ ] `GET /datasets/:id` — full details, sample count, quality stats
- [ ] `GET /datasets/:id/samples` — pre-signed S3 URLs (max 5 samples)
- [ ] `POST /datasets/:id/order` — create order, Stripe Checkout session
- [ ] `GET /orders/:id/download` — pre-signed download URLs for purchased datasets
- [ ] OpenSearch indexing of dataset metadata for full-text search

**Frontend (AGENT-03):**

- [ ] Catalog browse page with faceted search (sidebar filters + search bar)
- [ ] Dataset card component (modality icon, title, sample count, quality score, price)
- [ ] Dataset detail page (description, metadata, sample previews, purchase button)
- [ ] Interactive sample viewer (audio player, video player, image lightbox)
- [ ] Purchase flow (Stripe Checkout redirect → success page → download)

---

## PHASE 2: Automation & Scale (Weeks 13-24)

### P2-1: ML Quality Pipeline [AGENT-05]

- [ ] Kafka consumer service in `services/ml-pipeline/`
- [ ] Celery worker pool with Redis broker
- [ ] Task: blur detection (Laplacian variance + CNN)
- [ ] Task: noise detection (SNR estimation)
- [ ] Task: resolution/duration validation (rule-based)
- [ ] Task: object detection (YOLOv8)
- [ ] Task: scene classification (CLIP embeddings)
- [ ] Task: audio quality (PESQ/POLQA)
- [ ] Task: speech transcription (Whisper large-v3, word-level timestamps)
- [ ] Task: OCR extraction (PaddleOCR)
- [ ] Task: content moderation (CLIP + safety classifier)
- [ ] Task: duplicate detection (pHash + CLIP cosine similarity)
- [ ] Parallel task group execution (all checks run simultaneously)
- [ ] Aggregate quality score computation
- [ ] Write results to MongoDB `quality_reports` + update PostgreSQL `DatasetItem`
- [ ] Emit Kafka `quality.completed` event
- [ ] Human review routing: auto-approve if score >0.85, auto-reject if <0.3, human review otherwise
- [ ] KServe deployment manifests for each model
- [ ] Model version management and canary deployment config
- [ ] Benchmark: verify <5 min latency for 60-second video

### P2-2: PII Detection & Redaction [AGENT-05]

- [ ] Visual PII: RetinaFace for faces → blur/pixelate redaction
- [ ] Visual PII: YOLOv8 for license plates → blur redaction
- [ ] Text PII: Presidio (regex + spaCy NER) on Whisper transcripts
- [ ] Audio PII: detect names/addresses in transcript → flag timestamps
- [ ] PII confidence scoring (high/medium/low)
- [ ] Auto-redaction for high-confidence detections
- [ ] Human review queue for medium-confidence detections
- [ ] PII status update in PostgreSQL: PENDING → CLEAN / DETECTED → REDACTED

### P2-3: Contributor Matching Service [AGENT-05]

- [ ] Contributor skill embeddings (multi-task neural net on performance history + skills + test results)
- [ ] Task requirement embeddings (specification encoding)
- [ ] Cosine similarity matching with learned reweighting
- [ ] Contextual bandits for exploration (give new contributors opportunity)
- [ ] Geographic targeting (IP geolocation + self-reported)
- [ ] Demographic targeting with stratified sampling
- [ ] Workload balancing: dynamic caps based on historical capacity
- [ ] Surge pricing engine for under-subscribed urgent tasks
- [ ] A/B testing framework for matching algorithm improvements
- [ ] Match scoring API: `POST /matching/rank` → ranked contributor list

### P2-4: Real-Time Analytics [AGENT-03]

- [ ] Socket.io server with Redis adapter
- [ ] Enterprise dashboard: project progress (live % complete, submission rate)
- [ ] Contributor dashboard: live earnings counter
- [ ] Admin dashboard: system health (upload rate, queue depth, approval rate)
- [ ] Predictive alerts: project at risk of missing deadline
- [ ] Real-time contributor activity heatmap (geographic)

### P2-5: Public API & SDKs [AGENT-02 + AGENT-08]

**API (AGENT-02):**

- [ ] OpenAPI 3.1 specification: complete, validated
- [ ] Rate limiting: 100 req/min (starter), 1000 req/min (growth), unlimited (enterprise)
- [ ] API key authentication for programmatic access
- [ ] Comprehensive error responses with codes and messages
- [ ] Pagination (cursor-based), filtering, sorting on all list endpoints
- [ ] Webhook registration: `POST /webhooks/register` — notify on dataset ready, campaign complete

**SDKs (AGENT-08):**

- [ ] Python SDK: `dataforge` — search datasets, place orders, download, stream
- [ ] Node SDK: `@dataforge/sdk` — mirror of Python SDK capabilities
- [ ] SDK documentation with examples
- [ ] SDK published to PyPI and npm (test packages initially)

### P2-6: Flutter Mobile App [AGENT-06]

- [ ] Flutter project setup in `apps/mobile/`
- [ ] Contributor onboarding flow (matches web)
- [ ] Sumsub KYC SDK integration
- [ ] Camera capture screen with guided overlays:
  - [ ] Framing guides for common scenarios
  - [ ] Lighting quality indicator
  - [ ] Stability indicator (gyroscope)
  - [ ] Duration counter
- [ ] Audio recording screen with:
  - [ ] Volume meter (real-time)
  - [ ] Background noise warning
  - [ ] Recording quality indicator
- [ ] Offline-first architecture:
  - [ ] SQLite local task queue
  - [ ] Capture without connectivity
  - [ ] Queue uploads for when connection available
- [ ] Background tus upload:
  - [ ] Adaptive chunk size (WiFi: 50MB, cellular: 5MB)
  - [ ] Resume on connection recovery
  - [ ] Battery-aware: pause below 15%
  - [ ] Storage-aware: warn below 500MB
- [ ] Earnings dashboard (matches web)
- [ ] Payout request flow
- [ ] Push notifications (Firebase Cloud Messaging)
- [ ] Task browser with offline-cached task list

### P2-7: Dynamic Pricing Engine [AGENT-05]

- [ ] Base rate regression model (historical costs, contributor rates, modality complexity)
- [ ] Supply-demand adjustment (contributor availability, queue depth, seasonal patterns)
- [ ] Quality tier premium calculator
- [ ] Urgency multiplier (rush premium)
- [ ] Monte Carlo simulation for cost confidence intervals
- [ ] Real-time estimation API: `POST /pricing/estimate` → {low, mid, high, breakdown}
- [ ] Interactive pricing UI component for enterprise spec wizard

---

## PHASE 3: Differentiation (Weeks 25-36)

### P3-1: Federated Learning [AGENT-05]

- [ ] Flower framework integration
- [ ] Privacy-preserving aggregation with secure aggregation protocol
- [ ] Differential privacy implementation
- [ ] Pilot: healthcare data contribution without data leaving hospital systems
- [ ] Coordination service: manage FL rounds, aggregate updates, distribute models
- [ ] Contributor FL client SDK (Python)
- [ ] Documentation and onboarding guide

### P3-2: Blockchain Provenance [AGENT-07]

- [ ] Hyperledger Fabric network setup (permissioned)
- [ ] Chaincode: consent recording (hash, timestamp, contributor ID, purposes)
- [ ] Chaincode: rights transfer tracking
- [ ] Chaincode: royalty calculation triggers
- [ ] Off-chain personal data management (PostgreSQL) with on-chain hash anchoring
- [ ] Verification interface: given a dataset, verify full provenance chain
- [ ] GDPR right-to-erasure flow: delete off-chain data, on-chain hash becomes orphaned (non-deanonymizable)
- [ ] Alternative: Solidity on Polygon for lower infrastructure overhead

### P3-3: Collaboration Workspace [AGENT-03]

- [ ] Operational transform editing (Yjs or Automerge)
- [ ] Multi-user dataset spec editing with live cursors
- [ ] Presence awareness (who's viewing what)
- [ ] Threaded comments anchored to specific spec elements
- [ ] Approval workflows with structured review chains
- [ ] External sharing for auditors/partners (controlled access links)
- [ ] Slack/Jira/Notion integration via webhooks

### P3-4: Revenue Sharing System [AGENT-07]

- [ ] Royalty calculation engine: track which items generated licensing revenue
- [ ] Contributor portfolio dashboard: show all contributed items, licensing activity, royalty earnings
- [ ] Revenue sharing formula: 10-20% of subsequent license fees per item
- [ ] Longevity multiplier: 5-15% annual increase for consistent high-quality participation
- [ ] Quarterly royalty distribution via Stripe Connect
- [ ] Automated tax documentation for royalty income
- [ ] Smart contract automation (if blockchain deployed) for transparent royalty execution

### P3-5: Open-Source Tooling [AGENT-08]

- [ ] `dataforge-convert`: Format conversion library (COCO ↔ YOLO ↔ Pascal VOC ↔ KITTI ↔ WebDataset ↔ HuggingFace)
- [ ] `dataforge-quality`: Quality metric implementations (inter-annotator agreement, consistency, bias detection)
- [ ] `dataforge-provenance`: Provenance schemas (JSON Schema + Protobuf) for consent, chain-of-custody, license
- [ ] `dataforge-annotate`: Modular annotation interface components (web, MIT license)
- [ ] GitHub repos under `dataforge-oss` org
- [ ] README, contributing guide, CI/CD for each repo
- [ ] PyPI and npm package publishing

---

## PHASE 4: Enterprise Readiness (Weeks 37-48)

### P4-1: Security Hardening [AGENT-01]

- [ ] Trivy container image scanning in CI
- [ ] Snyk dependency vulnerability scanning
- [ ] Automated dependency updates (Renovate or Dependabot)
- [ ] Secrets management: AWS Secrets Manager or HashiCorp Vault
- [ ] Penetration testing (external vendor)
- [ ] Remediate all critical/high findings
- [ ] Security documentation: threat model, SDLC security practices

### P4-2: Compliance Infrastructure [AGENT-07]

- [ ] SOC 2 audit logging: comprehensive event capture
- [ ] GDPR Article 30 records of processing activities
- [ ] CCPA compliance program documentation
- [ ] Data Processing Agreements (DPA) template for enterprise customers
- [ ] Data retention policies: automated enforcement
- [ ] Right-to-erasure workflow: contributor requests → data deletion → model impact assessment
- [ ] Cookie consent and privacy policy for web properties

### P4-3: Enterprise Features [AGENT-02 + AGENT-03]

- [ ] Enterprise SSO (SAML/OIDC) — streamlined onboarding
- [ ] Custom contract management UI
- [ ] Dedicated support tiers with SLA tracking
- [ ] Advanced analytics for buyers: dataset quality trends, model performance correlation
- [ ] White-label options for large enterprise deployments
- [ ] Bulk order management and invoicing

### P4-4: Scale Preparation [AGENT-01]

- [ ] Load testing to 10x current capacity (k6)
- [ ] Disaster recovery validation (RDS failover, cross-region S3 replication)
- [ ] Chaos engineering: pod kill, network partition, DB failover
- [ ] Runbook completion: deployment, incident response, data recovery, scaling
- [ ] 99.9% uptime SLA documentation and monitoring
- [ ] Capacity planning model for next 12 months

---

## MVP SUCCESS CRITERIA (End of Phase 1)

- [ ] End-to-end flow: enterprise specs campaign → contributors see tasks → upload data → QA review → approve → payment → enterprise downloads dataset
- [ ] 5 pilot enterprise customers
- [ ] 100 active contributors
- [ ] 95% task completion rate
- [ ] Payments processing without errors
- [ ] <3s page load time
- [ ] Zero critical security vulnerabilities
