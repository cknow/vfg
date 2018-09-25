import { createLocalVue } from '@vue/test-utils';
import install from '@/install';

describe('install', () => {
    let localVue;
    let vfg;

    beforeEach(() => {
        localVue = createLocalVue();
        localVue.use(install);
        vfg = localVue.$vfg;
    });

    test('vfg component by default', () => {
        expect(localVue.options.components.vfg).toBeTruthy();
    });

    test('vfg component with custom name', () => {
        const vue = createLocalVue();

        vue.use(install, { name: 'foo' });

        expect(vue.options.components.foo).toBeTruthy();
    });

    test('theme installed', () => {
        const vue = createLocalVue();

        vue.use(install, {
            themes: {
                foo: {}
            }
        });

        expect(vue.$vfg.themes).toStrictEqual({
            foo: {}
        });
    });

    test('vfg in the prototype of the vue', () => {
        expect(localVue.$vfg).toBeTruthy();
        expect(localVue.prototype.$vfg).toBeTruthy();
    });

    test('empty themes', () => {
        expect(vfg.$data.themes).toStrictEqual({});
    });

    test('theme added', () => {
        expect(vfg.$data.themes).toStrictEqual({});

        vfg.addTheme('foo', {});

        expect(vfg.$data.themes).toStrictEqual({
            foo: {}
        });
    });

    test('not add the same theme', () => {
        expect(vfg.$data.themes).toStrictEqual({});

        vfg.addTheme('foo', {});
        vfg.addTheme('foo', {});

        expect(vfg.$data.themes).toStrictEqual({
            foo: {}
        });
    });

    test('themes added', () => {
        expect(vfg.$data.themes).toStrictEqual({});

        vfg.addThemes({
            foo: {},
            bar: {}
        });

        expect(vfg.$data.themes).toStrictEqual({
            foo: {},
            bar: {}
        });
    });

    test('get theme', () => {
        vfg.addTheme('foo', {});

        expect(vfg.getTheme('foo')).toStrictEqual({});
    });

    test('empty if the theme does not exist', () => {
        expect(vfg.getTheme('foo')).toStrictEqual({});
    });

    test('has theme', () => {
        expect(vfg.hasTheme('foo')).toBe(false);

        vfg.addTheme('foo', {});

        expect(vfg.hasTheme('foo')).toBe(true);
    });

    test('theme default', () => {
        expect(vfg.$data.themeDefault).toBeTruthy();
    });
});
