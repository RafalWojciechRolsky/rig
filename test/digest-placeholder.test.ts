import { describe, it, expect } from 'vitest';
import { readNight } from '../src/digest/read.js';

describe('run log reader placeholder handling', () => {
  it('keeps rows that have the placeholder owner instead of skipping them', () => {
    // 2026-10-29 in runs/ contains a line where the owner is '—' (NO_OWNER).
    // The fix for #12 ensures these rows are kept rather than filtered out.
    const night = readNight('runs', '2026-10-29');
    expect(night).not.toBeNull();
    const placeholderRow = night!.rows.find((r) => r.job === '—');
    expect(placeholderRow).toBeDefined();
    expect(placeholderRow?.owner).toBe('—');
  });
});
