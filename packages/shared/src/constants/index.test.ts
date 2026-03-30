import { describe, expect, it } from 'vitest';
import { APP_NAME, FILE_SIZE_LIMITS, QUALITY_THRESHOLDS } from './index';

describe('shared constants', () => {
  it('should have correct app name', () => {
    expect(APP_NAME).toBe('DataForge');
  });

  it('should have correct file size limits', () => {
    expect(FILE_SIZE_LIMITS.VIDEO).toBe(2 * 1024 * 1024 * 1024);
    expect(FILE_SIZE_LIMITS.AUDIO).toBe(500 * 1024 * 1024);
    expect(FILE_SIZE_LIMITS.IMAGE).toBe(50 * 1024 * 1024);
  });

  it('should have correct quality thresholds', () => {
    expect(QUALITY_THRESHOLDS.AUTO_APPROVE).toBe(0.85);
    expect(QUALITY_THRESHOLDS.AUTO_REJECT).toBe(0.3);
  });
});
