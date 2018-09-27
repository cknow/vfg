import vfg from '@/';

describe('module', () => {
    test('properties', () => {
        expect(vfg).toBeTruthy();
        expect(vfg).toHaveProperty('install');
        expect(vfg.install).toBeInstanceOf(Function);
    });
});
