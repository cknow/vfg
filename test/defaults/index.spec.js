import defaults from '@/defaults';

describe('defaults', () => {
    test('properties', () => {
        expect(defaults).toBeTruthy();
        expect(defaults).toHaveProperty('custom');
        expect(defaults).toHaveProperty('fields');
        expect(defaults).toHaveProperty('group');
        expect(defaults).toHaveProperty('horizontal');
        expect(defaults).toHaveProperty('row');
        expect(defaults).toHaveProperty('schema');
        expect(defaults).toHaveProperty('types');
    });
});
