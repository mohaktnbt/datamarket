// Application constants

export const APP_NAME = 'DataForge';
export const APP_VERSION = '0.1.0';

export const FILE_SIZE_LIMITS = {
  VIDEO: 2 * 1024 * 1024 * 1024, // 2GB
  AUDIO: 500 * 1024 * 1024, // 500MB
  IMAGE: 50 * 1024 * 1024, // 50MB
  TEXT: 10 * 1024 * 1024, // 10MB
  SENSOR: 100 * 1024 * 1024, // 100MB
} as const;

export const ALLOWED_FILE_TYPES = {
  VIDEO: ['mp4', 'mov', 'webm', 'avi', 'mkv'],
  AUDIO: ['wav', 'mp3', 'flac', 'ogg', 'aac', 'm4a'],
  IMAGE: ['jpg', 'jpeg', 'png', 'webp', 'tiff', 'bmp'],
  TEXT: ['txt', 'json', 'csv', 'jsonl'],
  SENSOR: ['csv', 'json', 'hdf5', 'parquet'],
} as const;

export const UPLOAD_CHUNK_SIZES = {
  WIFI: 50 * 1024 * 1024, // 50MB
  CELLULAR: 5 * 1024 * 1024, // 5MB
  DEFAULT: 10 * 1024 * 1024, // 10MB
} as const;

export const QUALITY_THRESHOLDS = {
  AUTO_APPROVE: 0.85,
  AUTO_REJECT: 0.3,
} as const;

export const RATE_LIMITS = {
  AUTH: { maxAttempts: 10, windowMinutes: 15 },
  API_STARTER: { requestsPerMinute: 100 },
  API_GROWTH: { requestsPerMinute: 1000 },
  API_ENTERPRISE: { requestsPerMinute: -1 }, // unlimited
  UPLOADS_PER_CONTRIBUTOR: 10, // concurrent
} as const;

export const CONTRIBUTOR_RATES = {
  BASE_RATE_MIN: 0.6, // 60%
  BASE_RATE_MAX: 0.8, // 80%
  ROYALTY_MIN: 0.1, // 10%
  ROYALTY_MAX: 0.2, // 20%
  LONGEVITY_ANNUAL_INCREASE: 0.05, // 5%
} as const;
