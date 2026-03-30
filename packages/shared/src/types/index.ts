// Core domain types for DataForge

export enum Role {
  CONTRIBUTOR = 'CONTRIBUTOR',
  BUYER = 'BUYER',
  ADMIN = 'ADMIN',
  REVIEWER = 'REVIEWER',
}

export enum KycStatus {
  PENDING = 'PENDING',
  BASIC = 'BASIC',
  STANDARD = 'STANDARD',
  ENHANCED = 'ENHANCED',
  EXPERT = 'EXPERT',
  REJECTED = 'REJECTED',
}

export enum Modality {
  TEXT = 'TEXT',
  AUDIO = 'AUDIO',
  IMAGE = 'IMAGE',
  VIDEO = 'VIDEO',
  MULTIMODAL = 'MULTIMODAL',
  SENSOR = 'SENSOR',
}

export enum DatasetStatus {
  DRAFT = 'DRAFT',
  COLLECTING = 'COLLECTING',
  REVIEWING = 'REVIEWING',
  PUBLISHED = 'PUBLISHED',
  ARCHIVED = 'ARCHIVED',
}

export enum PricingModel {
  FLAT_FEE = 'FLAT_FEE',
  PER_MINUTE = 'PER_MINUTE',
  PER_SAMPLE = 'PER_SAMPLE',
  SUBSCRIPTION = 'SUBSCRIPTION',
  CUSTOM = 'CUSTOM',
}

export enum LicenseType {
  STANDARD = 'STANDARD',
  PREMIUM = 'PREMIUM',
  EXCLUSIVE = 'EXCLUSIVE',
  CUSTOM = 'CUSTOM',
}

export enum QualityTier {
  STANDARD = 'STANDARD',
  PREMIUM = 'PREMIUM',
  EXPERT = 'EXPERT',
}

export enum ReviewStatus {
  PENDING = 'PENDING',
  AUTO_APPROVED = 'AUTO_APPROVED',
  AUTO_REJECTED = 'AUTO_REJECTED',
  HUMAN_REVIEW = 'HUMAN_REVIEW',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  APPEALED = 'APPEALED',
}

export enum PaymentStatus {
  UNPAID = 'UNPAID',
  PROCESSING = 'PROCESSING',
  PAID = 'PAID',
  FAILED = 'FAILED',
}

export enum OrderStatus {
  PENDING = 'PENDING',
  PAID = 'PAID',
  DELIVERED = 'DELIVERED',
  REFUNDED = 'REFUNDED',
  CANCELLED = 'CANCELLED',
}

export enum PayoutMethod {
  STRIPE = 'STRIPE',
  PAYPAL = 'PAYPAL',
  WISE = 'WISE',
  VENMO = 'VENMO',
  UPI = 'UPI',
  MPESA = 'MPESA',
  LOCAL_BANK = 'LOCAL_BANK',
}

export enum PayoutStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
}

export enum PayoutType {
  TASK_PAYMENT = 'TASK_PAYMENT',
  ROYALTY = 'ROYALTY',
  BONUS = 'BONUS',
  REFERRAL = 'REFERRAL',
}

export enum Urgency {
  STANDARD = 'STANDARD',
  EXPRESS = 'EXPRESS',
  CRITICAL = 'CRITICAL',
}

export enum CampaignStatus {
  DRAFT = 'DRAFT',
  ACTIVE = 'ACTIVE',
  PAUSED = 'PAUSED',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

export enum TaskStatus {
  OPEN = 'OPEN',
  FILLED = 'FILLED',
  IN_REVIEW = 'IN_REVIEW',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

export enum PiiStatus {
  PENDING = 'PENDING',
  CLEAN = 'CLEAN',
  DETECTED = 'DETECTED',
  REDACTED = 'REDACTED',
}

export enum ItemStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  QA_REVIEW = 'QA_REVIEW',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

export enum PlanTier {
  STARTER = 'STARTER',
  GROWTH = 'GROWTH',
  ENTERPRISE = 'ENTERPRISE',
}
