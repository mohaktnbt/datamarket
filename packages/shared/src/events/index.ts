// Kafka event schemas for the media pipeline

export const KAFKA_TOPICS = {
  UPLOAD_COMPLETED: 'upload.completed',
  QUALITY_COMPLETED: 'quality.completed',
  TRANSCODING_COMPLETED: 'transcoding.completed',
  SUBMISSION_REVIEWED: 'submission.reviewed',
  PAYMENT_PROCESSED: 'payment.processed',
  PAYOUT_INITIATED: 'payout.initiated',
} as const;

export interface UploadCompletedEvent {
  eventId: string;
  timestamp: string;
  contributorId: string;
  submissionId: string;
  s3Bucket: string;
  s3Key: string;
  fileType: string;
  sizeBytes: number;
  checksum: string;
  metadata: Record<string, unknown>;
}

export interface QualityCompletedEvent {
  eventId: string;
  timestamp: string;
  submissionId: string;
  datasetItemId: string;
  overallScore: number;
  autoDecision: 'APPROVED' | 'REJECTED' | 'HUMAN_REVIEW';
  checks: {
    visual?: { blurScore: number; noiseScore: number; exposureScore: number };
    audio?: { snr: number; pesqScore: number; clippingDetected: boolean };
    pii?: { detected: boolean; types: string[]; redacted: boolean };
    duplicate?: { isDuplicate: boolean; similarityScore: number };
  };
}

export interface TranscodingCompletedEvent {
  eventId: string;
  timestamp: string;
  datasetItemId: string;
  renditions: {
    key: string;
    format: string;
    resolution?: string;
    sizeBytes: number;
  }[];
}
