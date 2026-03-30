# CLAUDE.md — AI Training Data Marketplace (DataForge)

> **Project Codename:** DataForge
> **Repo:** mohaktnbt/dataforge
> **VPS:** 168.231.103.49 (Hostinger)
> **Goal:** Build a superior multimodal AI training data marketplace — surpassing Luel.ai, competing with Scale AI/Surge AI at the collection layer

---

## 1. WHAT WE ARE BUILDING

A **two-sided marketplace** connecting AI enterprises with a global contributor network to source **rights-cleared, multimodal training data** (video, audio, images, text, sensor data) at 10x speed with full legal provenance.

### Core Product Surfaces

| Surface | Users | Purpose |
|---------|-------|---------|
| **Enterprise Dashboard** | AI labs, ML teams, robotics companies | Browse catalog, spec custom campaigns, purchase datasets, track projects, download via API |
| **Contributor Portal** | Global data contributors | Onboard + KYC, browse tasks, upload data, track earnings, request payouts |
| **Mobile Capture App** | Contributors (field) | Camera/mic-guided capture, offline-first, background upload, earnings dashboard |
| **Admin Panel** | Internal ops team | Review queue, campaign builder, contributor management, revenue analytics |
| **Public API + SDKs** | Developer buyers | REST/GraphQL/gRPC programmatic access to catalog, search, purchase, download |
| **Open-Source Tooling** | Community/ecosystem | Format conversion (COCO/YOLO/Pascal VOC/KITTI), quality metrics, provenance schemas |

### Why This Wins Over Luel.ai

| Luel Weakness | Our Advantage |
|---------------|---------------|
| No mobile app — web upload only | Flutter mobile-first capture with offline-first, guided overlays, background tus upload |
| No buyer API — contact form only | Full REST + GraphQL + gRPC API with Python/Node SDKs from day one |
| Perpetual exclusive biometric license — no deletion rights | **Revocable, non-exclusive licenses** with clear data lifecycle controls and GDPR right-to-erasure |
| Google Vertex AI as commodity QA | Purpose-built ML quality models (YOLOv8, Whisper, RetinaFace, CLIP, PESQ) on KServe — a real moat |
| 2-person team, unverified 3M+ contributors | Transparent metrics, verifiable traction, contributor co-ownership with revenue sharing |
| No streaming/subscription model | **Continuous data feeds** matching buyer criteria — recurring revenue, deep pipeline integration |
| Weak geographic diversity (heavy Africa) | Deliberate demographic/geographic targeting with stratified sampling across Asia, LATAM, Europe |
| No data visualization for buyers | Embedded exploratory analysis: t-SNE/UMAP embeddings, spectrograms, temporal activity graphs |

### Five Strategic Differentiators

1. **Contributor Co-Ownership** — 60-80% base rate (industry-leading) + 10-20% royalty on subsequent licensing + longevity multipliers. Revocable licenses, not perpetual extraction.
2. **Transparent Real-Time Pricing** — Interactive cost estimation as enterprises build specs. Base rate + complexity multiplier + quality tier + urgency + geographic adjustment — all visible.
3. **Open-Source Data Tooling** — Apache 2.0/MIT libraries for format conversion, quality metrics, provenance schemas. Positions us as ecosystem infrastructure, not gatekeeper.
4. **Federated Learning** — Privacy-preserving contribution via Flower framework. Contributors train local models, share only gradients. Unlocks healthcare, legal, enterprise data.
5. **Blockchain Provenance** — Consent hashes on Hyperledger Fabric. Personal data stays off-chain (deletable for GDPR). On-chain hashes provide tamper-proof audit trail.

---

## 2. COMPETITIVE INTELLIGENCE SUMMARY

### Market Context
- AI training data market: **$3.5B in 2025**, growing 22-28% CAGR to **$10-23B by early 2030s**
- Multimodal data is fastest-growing segment at **31.1% CAGR**
- High-quality human text data projected to run out between **2026-2032** (Epoch AI)
- Synthetic data supplements but does NOT replace human data (Nature: "model collapse" confirmed)

### Competitive Landscape (5 Layers)

**Layer 1 — Data Collection (OUR LAYER — thinnest, biggest opportunity):**
- Luel (YC W26, 2 people, claims $2M ARR)
- Protege ($65M, a16z-backed, B2B institutional)
- Defined.ai ($81.9M raised, B2B marketplace)
- Shaip (healthcare-focused mobile capture)

**Layer 2 — Data Labeling (NOT our direct competition — potential CUSTOMERS):**
- Scale AI ($29B valuation, $870M rev, neutrality lost after Meta's 49% acquisition)
- Surge AI ($1.2B rev, bootstrapped, targeting $15-25B valuation)
- Appen (declining, revenue down ~50% from 2021 peak)
- Labelbox ($189M funding), Sama ($470M rev), Toloka ($72M Bezos-backed)

**Layer 3 — Programmatic/Synthetic:** Snorkel AI ($238M funding, $1.3B valuation)
**Layer 4 — Content Licensing:** Human Native AI (acquired by Cloudflare Jan 2026), Trainspot
**Layer 5 — Crowd Platforms:** Amazon MTurk (stagnant), Prolific ($8/hr min), Mindrift (20K+ PhDs)

### Key Market Event
Meta's **$14.3B acquisition of 49% of Scale AI** (June 2025) triggered customer defections from OpenAI, Google, Microsoft, xAI. **Neutrality and trust are existential** in this market.

---

## 3. TECHNOLOGY STACK

### Monorepo Structure (Turborepo + pnpm)

```
dataforge/
├── apps/
│   ├── web/                    # Next.js 15 (App Router, RSC) — Enterprise + Contributor + Admin
│   ├── mobile/                 # Flutter contributor capture app
│   └── api/                    # NestJS API gateway (TypeScript)
├── services/
│   ├── upload/                 # Go — tus resumable upload server
│   ├── ml-pipeline/            # Python FastAPI — quality validation + ML models
│   ├── transcoding/            # Go — FFmpeg workers for media processing
│   ├── matching/               # Python — contributor-task matching via embeddings
│   └── pricing/                # Python — dynamic pricing engine
├── packages/
│   ├── shared/                 # Shared TypeScript types, utils, constants
│   ├── db/                     # Prisma schema + migrations (PostgreSQL)
│   ├── ui/                     # Design system (Tailwind + Radix UI)
│   └── ml/                     # ML model code (training, serving, evaluation)
├── oss/                        # Open-source tooling releases
│   ├── format-converter/       # COCO/YOLO/Pascal VOC/KITTI/WebDataset conversion
│   ├── quality-metrics/        # Inter-annotator agreement, bias detection, consistency
│   └── provenance-schemas/     # Consent, chain-of-custody, license verification schemas
├── infrastructure/
│   ├── terraform/              # AWS IaC (EKS, RDS, S3, MSK, OpenSearch, CloudFront)
│   ├── kubernetes/             # K8s manifests + Helm charts
│   └── monitoring/             # Prometheus, Grafana, Loki, alerting
├── docs/
│   ├── architecture/           # ADRs, C4 diagrams, sequence diagrams
│   ├── api/                    # OpenAPI 3.1 specs
│   └── runbooks/               # Deployment, incident response, data recovery
├── CLAUDE.md                   # THIS FILE
├── AGENTS.md                   # ClawTeam agent orchestration
├── TODO-MANUAL.md              # Granular task checklist
└── TIMELINE.md                 # Session-by-session build timeline
```

### Stack Decisions

| Layer | Technology | Rationale |
|-------|-----------|-----------|
| Frontend | Next.js 15 (React 19) + TypeScript | SSR for SEO, RSC for performance, largest ecosystem |
| API Gateway | NestJS (Node.js/TypeScript) | Enterprise-grade, GraphQL support, shares lang with frontend |
| Media Processing | Go microservices | Goroutine concurrency for thousands of concurrent uploads |
| ML Pipeline | Python (FastAPI) | Deepest ML ecosystem (PyTorch, OpenCV, HuggingFace) |
| Primary DB | PostgreSQL 16+ (Prisma) | ACID for transactions/payments/consent; PostGIS for geolocation |
| Media Metadata | MongoDB Atlas | Schema flexibility for heterogeneous multimodal metadata |
| Object Storage | AWS S3 (Intelligent-Tiering) | Standard; 40-60% savings on cold data |
| Search | OpenSearch + Qdrant (vector) | Full-text catalog search + CLIP-powered semantic similarity |
| Event Backbone | Apache Kafka (AWS MSK) | Durable event log for media pipeline with replay |
| Upload Protocol | tus 1.0 (tusd Go server) | Resumable, chunk-verified; used by Vimeo, Cloudflare |
| Cache | Redis Cluster | Sessions, rate limiting, real-time counters, pub/sub |
| Payments | Stripe Connect + Hyperwallet | Stripe for US/EU; Hyperwallet for 200+ countries |
| KYC/Identity | Sumsub | 97.89% pass rates, no-code workflows, competitive pricing |
| ML Quality Models | YOLOv8, Whisper large-v3, RetinaFace, CLIP, Presidio, PESQ/POLQA | Object detection, ASR, face/PII, semantic embed, audio quality |
| Model Serving | KServe on Kubernetes (EKS) | GPU scheduling, autoscaling, canary deployments |
| Mobile | Flutter | Superior camera/sensor perf, compiled ARM, offline-first |
| CDN | CloudFront | Edge caching for previews; pre-signed S3 for large downloads |
| Feature Flags | LaunchDarkly | Gradual rollout, emergency disable |
| Monitoring | Prometheus + Grafana + Loki | Industry-standard observability |
| CI/CD | GitHub Actions | Lint/test/build on PR, deploy staging on develop merge, prod on main |

---

## 4. DATABASE SCHEMAS

### PostgreSQL (Prisma)

```prisma
// Core user system
model User {
  id              String   @id @default(cuid())
  email           String   @unique
  passwordHash    String?
  role            Role     @default(CONTRIBUTOR)
  kycStatus       KycStatus @default(PENDING)
  ssoProvider     String?
  ssoExternalId   String?
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
  
  contributorProfile  ContributorProfile?
  buyerProfile        BuyerProfile?
  submissions         Submission[]
  orders              Order[]
  payouts             Payout[]
  consentRecords      ConsentRecord[]
}

enum Role { CONTRIBUTOR BUYER ADMIN REVIEWER }
enum KycStatus { PENDING BASIC STANDARD ENHANCED EXPERT REJECTED }

model ContributorProfile {
  id              String   @id @default(cuid())
  userId          String   @unique
  user            User     @relation(fields: [userId], references: [id])
  payoutMethod    PayoutMethod
  payoutDetails   Json
  country         String
  languages       String[]
  skills          String[]
  equipmentVerified Boolean @default(false)
  qualityTier     QualityTier @default(STANDARD)
  lifetimeEarnings Int     @default(0) // cents
  totalSubmissions Int     @default(0)
  acceptanceRate  Float    @default(0)
  referralCode    String   @unique
  referredBy      String?
}

enum PayoutMethod { STRIPE PAYPAL WISE VENMO UPI MPESA LOCAL_BANK }
enum QualityTier { STANDARD PREMIUM EXPERT }

model BuyerProfile {
  id              String   @id @default(cuid())
  userId          String   @unique
  user            User     @relation(fields: [userId], references: [id])
  company         String
  planTier        PlanTier @default(STARTER)
  apiKey          String   @unique @default(cuid())
  ssoEnabled      Boolean  @default(false)
}

enum PlanTier { STARTER GROWTH ENTERPRISE }

// Dataset catalog
model Dataset {
  id              String   @id @default(cuid())
  title           String
  description     String
  modality        Modality
  category        String
  languages       String[]
  qualityScore    Float?
  status          DatasetStatus @default(DRAFT)
  pricingModel    PricingModel
  priceCents      Int?     // for flat-fee
  pricePerMinute  Int?     // cents, for usage-based
  licenseType     LicenseType
  sampleCount     Int      @default(0)
  totalDuration   Int?     // seconds, for audio/video
  totalSizeBytes  BigInt   @default(0)
  createdBy       String
  createdAt       DateTime @default(now())
  
  items           DatasetItem[]
  orders          Order[]
  campaigns       Campaign[]
}

enum Modality { TEXT AUDIO IMAGE VIDEO MULTIMODAL SENSOR }
enum DatasetStatus { DRAFT COLLECTING REVIEWING PUBLISHED ARCHIVED }
enum PricingModel { FLAT_FEE PER_MINUTE PER_SAMPLE SUBSCRIPTION CUSTOM }
enum LicenseType { STANDARD PREMIUM EXCLUSIVE CUSTOM }

model DatasetItem {
  id              String   @id @default(cuid())
  datasetId       String
  dataset         Dataset  @relation(fields: [datasetId], references: [id])
  s3Key           String
  s3Bucket        String
  fileType        String
  durationSeconds Float?
  resolution      String?
  sizeBytes       BigInt
  qualityScore    Float?
  piiStatus       PiiStatus @default(PENDING)
  status          ItemStatus @default(PENDING)
  metadataId      String?  // MongoDB ObjectId reference
  createdAt       DateTime @default(now())
  
  submissions     Submission[]
  consentRecords  ConsentRecord[]
}

enum PiiStatus { PENDING CLEAN DETECTED REDACTED }
enum ItemStatus { PENDING PROCESSING QA_REVIEW APPROVED REJECTED }

// Campaign system (custom collection)
model Campaign {
  id              String   @id @default(cuid())
  datasetId       String
  dataset         Dataset  @relation(fields: [datasetId], references: [id])
  buyerId         String
  title           String
  description     String
  specifications  Json     // modality-specific requirements
  targetVolume    Int
  currentVolume   Int      @default(0)
  qualityTier     QualityTier
  urgency         Urgency  @default(STANDARD)
  estimatedCost   Int      // cents
  actualCost      Int      @default(0)
  deadline        DateTime?
  status          CampaignStatus @default(DRAFT)
  createdAt       DateTime @default(now())
  
  tasks           Task[]
}

enum Urgency { STANDARD EXPRESS CRITICAL }
enum CampaignStatus { DRAFT ACTIVE PAUSED COMPLETED CANCELLED }

model Task {
  id              String   @id @default(cuid())
  campaignId      String
  campaign        Campaign @relation(fields: [campaignId], references: [id])
  title           String
  instructions    String
  paymentCents    Int
  requiredSkills  String[]
  requiredEquipment String[]
  targetGeo       String[]
  targetLanguages String[]
  maxSubmissions  Int
  currentSubmissions Int   @default(0)
  status          TaskStatus @default(OPEN)
  
  submissions     Submission[]
}

enum TaskStatus { OPEN FILLED IN_REVIEW COMPLETED CANCELLED }

// Submissions and review
model Submission {
  id              String   @id @default(cuid())
  contributorId   String
  contributor     User     @relation(fields: [contributorId], references: [id])
  taskId          String?
  task            Task?    @relation(fields: [taskId], references: [id])
  datasetItemId   String?
  datasetItem     DatasetItem? @relation(fields: [datasetItemId], references: [id])
  s3Key           String
  reviewStatus    ReviewStatus @default(PENDING)
  reviewerNotes   String?
  reviewerId      String?
  autoQualityScore Float?
  humanQualityScore Float?
  paymentStatus   PaymentStatus @default(UNPAID)
  paymentAmount   Int      // cents
  submittedAt     DateTime @default(now())
  reviewedAt      DateTime?
}

enum ReviewStatus { PENDING AUTO_APPROVED AUTO_REJECTED HUMAN_REVIEW APPROVED REJECTED APPEALED }
enum PaymentStatus { UNPAID PROCESSING PAID FAILED }

// Consent and provenance
model ConsentRecord {
  id              String   @id @default(cuid())
  contributorId   String
  contributor     User     @relation(fields: [contributorId], references: [id])
  datasetItemId   String
  datasetItem     DatasetItem @relation(fields: [datasetItemId], references: [id])
  consentVersion  String
  purposes        String[]
  restrictions    String[]
  licenseType     String   // NON_EXCLUSIVE, REVOCABLE
  grantedAt       DateTime @default(now())
  revokedAt       DateTime?
  blockchainHash  String?  // Hyperledger Fabric tx hash
  expiresAt       DateTime?
}

// Financial
model Order {
  id              String   @id @default(cuid())
  buyerId         String
  buyer           User     @relation(fields: [buyerId], references: [id])
  datasetId       String
  dataset         Dataset  @relation(fields: [datasetId], references: [id])
  totalCents      Int
  stripePaymentId String?
  status          OrderStatus @default(PENDING)
  createdAt       DateTime @default(now())
}

enum OrderStatus { PENDING PAID DELIVERED REFUNDED CANCELLED }

model Payout {
  id              String   @id @default(cuid())
  contributorId   String
  contributor     User     @relation(fields: [contributorId], references: [id])
  amountCents     Int
  method          PayoutMethod
  externalId      String?  // Stripe transfer ID, PayPal batch ID, etc.
  status          PayoutStatus @default(PENDING)
  type            PayoutType @default(TASK_PAYMENT)
  initiatedAt     DateTime @default(now())
  completedAt     DateTime?
}

enum PayoutStatus { PENDING PROCESSING COMPLETED FAILED }
enum PayoutType { TASK_PAYMENT ROYALTY BONUS REFERRAL }

// Royalty tracking (contributor co-ownership)
model RoyaltyLedger {
  id              String   @id @default(cuid())
  contributorId   String
  datasetItemId   String
  orderId         String
  royaltyCents    Int
  status          PayoutStatus @default(PENDING)
  calculatedAt    DateTime @default(now())
  paidAt          DateTime?
}
```

### MongoDB Collections

```javascript
// media_metadata — flexible per-item metadata
{
  itemId: "cuid_ref",           // links to PostgreSQL DatasetItem.id
  exif: { /* raw EXIF data */ },
  transcript: {
    text: "full transcription",
    words: [{ word: "hello", start: 0.0, end: 0.3, confidence: 0.98 }],
    language: "en",
    model: "whisper-large-v3"
  },
  embeddings: {
    clip: [/* 512-dim float array */],
    speaker: [/* 256-dim speaker embedding */]
  },
  mlLabels: {
    objects: [{ label: "person", confidence: 0.95, bbox: [x,y,w,h] }],
    scenes: ["indoor", "kitchen"],
    emotions: [{ label: "neutral", confidence: 0.87 }],
    actions: ["cooking", "stirring"]
  }
}

// quality_reports — detailed QA results per item
{
  itemId: "cuid_ref",
  visual: { blurScore: 0.12, noiseScore: 0.08, exposureScore: 0.91, stabilityScore: 0.95 },
  audio: { snr: 28.5, pesqScore: 3.8, clippingDetected: false, silenceRatio: 0.15 },
  content: { 
    categories: ["cooking", "kitchen"],
    moderationFlags: [],
    piiDetections: [{ type: "face", count: 1, redacted: true }],
    instructionCompliance: 0.92
  },
  overallScore: 0.88,
  autoDecision: "APPROVED",
  humanOverride: null,
  processedAt: ISODate("2026-03-30T10:00:00Z"),
  pipelineVersion: "v1.2.0"
}
```

---

## 5. MEDIA INGESTION PIPELINE

### Upload Flow
```
Mobile/Web Client
  → tus resumable upload (5-50MB adaptive chunks)
  → Go upload service (tusd)
  → S3 staging bucket
  → Kafka "upload.completed" event
```

### Processing Pipeline (parallel fan-out from Kafka)
```
upload.completed event →
  ├── FFmpeg transcoding (Go workers)
  │   → H.264/H.265 renditions, HLS previews, thumbnails
  ├── Whisper ASR (Python)
  │   → Full transcript + word-level timestamps
  ├── CLIP embedding (Python)
  │   → 512-dim vector for semantic search → Qdrant
  ├── YOLOv8 object detection (Python)
  │   → Content inventory, scene classification
  ├── RetinaFace + Presidio PII detection (Python)
  │   → Faces, license plates, text PII → auto-redaction
  ├── PESQ/POLQA audio quality (Python)
  │   → SNR, clipping, quality score
  ├── MUSIQ/NIMA visual quality (Python)
  │   → Blur, noise, exposure, aesthetic score
  └── Duplicate detection (Python)
      → pHash + CLIP similarity against existing items

All checks → aggregate quality score → MongoDB quality_report
  → PostgreSQL DatasetItem status update
  → Kafka "quality.completed" event
  → Route to human review queue if edge case
```

**Target latency:** <5 minutes for a 60-second video clip.

---

## 6. API DESIGN

### REST API (NestJS)

```
# Auth
POST   /auth/register
POST   /auth/login
POST   /auth/refresh
POST   /auth/sso/saml
POST   /auth/sso/oidc

# Contributors
POST   /contributors/register
POST   /contributors/kyc              # Sumsub webhook handler
GET    /contributors/tasks             # Available campaigns/tasks
POST   /contributors/submissions       # Upload submission
GET    /contributors/earnings          # Earnings dashboard
POST   /contributors/payouts/request   # Request payout
GET    /contributors/royalties         # Royalty earnings

# Datasets (Catalog)
GET    /datasets                       # Search, filter by modality/category/language/quality
GET    /datasets/:id                   # Detail + preview samples
GET    /datasets/:id/samples           # Pre-signed S3 URLs for samples
GET    /datasets/:id/analytics         # Visualization data (embeddings, distributions)
POST   /datasets/:id/order             # Purchase dataset

# Campaigns (Custom Collection)
POST   /campaigns                      # Create custom collection campaign
GET    /campaigns/:id                  # Campaign status + progress
GET    /campaigns/:id/tasks            # Tasks within campaign
PATCH  /campaigns/:id                  # Update campaign specs

# Orders
GET    /orders                         # Buyer's order history
GET    /orders/:id                     # Order detail
GET    /orders/:id/download            # Pre-signed download URLs

# Admin
GET    /admin/review-queue             # Submissions pending review
POST   /admin/review/:submissionId     # Approve/reject
GET    /admin/analytics                # Revenue, contributor, quality dashboards
POST   /admin/campaigns                # Create campaigns

# Webhooks (incoming)
POST   /webhooks/stripe                # Stripe payment events
POST   /webhooks/sumsub                # KYC verification results
```

### GraphQL (for buyer catalog exploration)
```graphql
type Query {
  datasets(filter: DatasetFilter, sort: DatasetSort, first: Int, after: String): DatasetConnection!
  dataset(id: ID!): Dataset
  searchSimilar(embedding: [Float!]!, limit: Int): [Dataset!]!  # CLIP vector search
}

type Subscription {
  newDatasets(modality: Modality, category: String): Dataset!
  campaignProgress(campaignId: ID!): CampaignUpdate!
}
```

---

## 7. KEY ARCHITECTURAL PATTERNS

### Event Sourcing + CQRS
- All state changes captured as immutable Kafka events
- Write-optimized transaction processing (PostgreSQL)
- Read-optimized query serving (OpenSearch + Qdrant)
- Full audit trail for compliance

### Multi-Tenant Isolation
| Tier | Isolation | Use Case |
|------|-----------|----------|
| Starter | Shared schema, row-level security | Cost-sensitive buyers |
| Growth | Dedicated schema, shared compute | Compliance requirements |
| Enterprise | Dedicated DB instance | Data residency mandates |

### Consent Architecture (GDPR-First)
- Full consent records in PostgreSQL (versioned: what data, what purpose, to whom, when)
- Consent hashes on Hyperledger Fabric (tamper-proof, non-deanonymizable)
- Personal data stays off-chain → deletable for right-to-erasure
- On-chain hashes → permanent audit record
- **Revocable consent**: contributors can revoke at any time; triggers downstream cleanup

---

## 8. DEPLOYMENT & INFRASTRUCTURE

### AWS Architecture
```
CloudFront (CDN)
  → Next.js on Vercel (or EKS)
  
EKS Cluster
  ├── NestJS API pods (autoscale on CPU)
  ├── Go upload service pods (autoscale on connections)
  ├── Go transcoding workers (autoscale on queue depth)
  ├── Python ML pipeline pods (GPU node pool, autoscale on queue)
  ├── Python matching service pods
  └── Python pricing service pods

AWS MSK (Kafka)
  → Event backbone

RDS PostgreSQL 16 (Multi-AZ)
  → Primary relational data
  
MongoDB Atlas
  → Media metadata

S3 Buckets
  ├── staging (uploads, 7-day lifecycle)
  ├── processed (normalized media, Intelligent-Tiering)
  └── archive (completed datasets, Glacier Deep Archive)

OpenSearch
  → Full-text catalog search

Qdrant (on EKS)
  → CLIP vector similarity search

Redis Cluster (ElastiCache)
  → Sessions, rate limiting, real-time counters
```

### CI/CD (GitHub Actions)
```yaml
# On PR: lint → typecheck → unit test → build
# On merge to develop: deploy staging → synthetic traffic validation
# On merge to main: blue-green deploy → progressive traffic (10%/50%/100%)
# Rollback: error rate >0.1% or p99 >500ms
```

### Quality Gates
| Gate | Criterion | Enforcement |
|------|-----------|-------------|
| Unit test coverage | ≥80% all services | CI blocking |
| Integration tests | Critical journeys automated | Nightly run |
| Performance | API p99 <200ms, page load <3s | Load test in staging |
| Security | Zero critical vulns | Snyk/Trivy blocking |
| Accessibility | WCAG 2.1 AA | axe-core automated |

---

## 9. BUILD RULES FOR CLAUDE CODE

### Session Protocol
1. **Always read CLAUDE.md first** at session start
2. **Check TODO-MANUAL.md** for current phase and next tasks
3. **Check TIMELINE.md** for session continuity — what was done last
4. **Run gap analysis** before writing new code: `find . -name "*.ts" -o -name "*.py" -o -name "*.go" | head -50`
5. **Never overwrite existing code** — audit first, extend incrementally
6. **Update TODO-MANUAL.md** after completing tasks (check boxes)
7. **Update TIMELINE.md** with session summary before ending

### Code Standards
- TypeScript: strict mode, no `any`, Prettier + ESLint
- Python: Black + Ruff, type hints everywhere, Pydantic for schemas
- Go: golangci-lint, standard project layout
- Tests alongside source files (`*.test.ts`, `*_test.go`, `test_*.py`)
- Every API endpoint has OpenAPI annotation
- Every DB migration is backward-compatible

### Commit Convention
```
feat(scope): description     # New feature
fix(scope): description      # Bug fix
refactor(scope): description # Code restructure
docs(scope): description     # Documentation
test(scope): description     # Tests
infra(scope): description    # Infrastructure
```

Scopes: `web`, `api`, `mobile`, `upload`, `ml`, `matching`, `pricing`, `db`, `infra`, `oss`
