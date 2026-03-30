import { describe, expect, it } from 'vitest';
import { Role, Modality, QualityTier } from './index';

describe('shared types', () => {
  it('should have correct Role values', () => {
    expect(Role.CONTRIBUTOR).toBe('CONTRIBUTOR');
    expect(Role.BUYER).toBe('BUYER');
    expect(Role.ADMIN).toBe('ADMIN');
    expect(Role.REVIEWER).toBe('REVIEWER');
  });

  it('should have correct Modality values', () => {
    expect(Modality.VIDEO).toBe('VIDEO');
    expect(Modality.AUDIO).toBe('AUDIO');
    expect(Modality.IMAGE).toBe('IMAGE');
    expect(Modality.TEXT).toBe('TEXT');
    expect(Modality.MULTIMODAL).toBe('MULTIMODAL');
    expect(Modality.SENSOR).toBe('SENSOR');
  });

  it('should have correct QualityTier values', () => {
    expect(QualityTier.STANDARD).toBe('STANDARD');
    expect(QualityTier.PREMIUM).toBe('PREMIUM');
    expect(QualityTier.EXPERT).toBe('EXPERT');
  });
});
