import { describe, expect, it } from 'vitest';
import { add } from '../src/add.js';

describe('Add', () => {
    it('add', async () => {
        expect(add(1, 2)).toBe(3);
    });
});
