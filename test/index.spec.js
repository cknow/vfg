import Vfg from '@/';

describe('module', () => {
    test('properties', () => {
        expect(Vfg).toBeTruthy();
        expect(Vfg).toHaveProperty('install');
        expect(Vfg.install).toBeInstanceOf(Function);
    });
});
