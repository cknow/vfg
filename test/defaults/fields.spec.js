import { createLocalVue } from '@vue/test-utils';

import install from '@/install';

describe('defaults -> fields', () => {
    let localVue;
    let fields;

    beforeAll(() => {
        localVue = createLocalVue();
        localVue.use(install);
        fields = Object.keys(localVue.$vfg.$data.themeDefault.fields);
    });

    test('has input', () => {
        expect(fields).toContain('input');
    });

    test('has select', () => {
        expect(fields).toContain('select');
    });

    test('has textarea', () => {
        expect(fields).toContain('textarea');
    });
});
