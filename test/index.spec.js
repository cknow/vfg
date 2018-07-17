import Vfg from '@/index.js';

describe('module', () => {
    test('module properties', () => {
        expect(Vfg).toBeTruthy();
        expect(Vfg).toHaveProperty('install');
    });
});
