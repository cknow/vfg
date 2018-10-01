import { mount, createLocalVue } from '@vue/test-utils';

import Vfg from '@/components/vfg';
import install from '@/install';

describe('components -> Vfg', () => {
    let localVue;
    let wrapper;

    beforeAll(() => {
        localVue = createLocalVue();
        localVue.use(install);
    });

    beforeEach(() => {
        wrapper = mount(Vfg, {
            localVue
        });
    });

    test('is a Vue instance', () => {
        expect(wrapper.isVueInstance()).toBeTruthy();
    });

    test('empty if the values are empty', () => {
        wrapper.setProps({});

        expect(wrapper.exists()).toBe(true);
        expect(wrapper.isEmpty()).toBe(true);
        expect(wrapper.vm.hasSchema).toBe(false);
    });

    test('empty if the schema are empty', () => {
        wrapper.setProps({
            schema: []
        });

        expect(wrapper.exists()).toBe(true);
        expect(wrapper.isEmpty()).toBe(true);
        expect(wrapper.vm.hasSchema).toBe(false);
    });

    describe('default schema', () => {
        let div;
        let field;

        beforeEach(() => {
            wrapper.setProps({
                schema: [{}]
            });

            div = wrapper.find('div');
            field = div.find('input');
        });

        test('check exists', () => {
            expect(wrapper.exists()).toBe(true);
            expect(wrapper.isEmpty()).toBe(false);
            expect(wrapper.vm.hasSchema).toBe(true);
        });

        test('div around the input text by default', () => {
            expect(div.exists()).toBe(true);
            expect(div.is('div')).toBe(true);

            expect(field.exists()).toBe(true);
            expect(field.is('input')).toBe(true);
            expect(field.attributes().type).toBe('text');
        });

        test('not have classes in the div nor in the field', () => {
            expect(div.classes()).toHaveLength(0);
            expect(field.classes()).toHaveLength(0);
        });

        test('text field by default', () => {
            expect(field.attributes().type).toBe('text');
        });
    });

    describe('emit event on change', () => {
        const eventName = 'model-updated';
        let field;

        beforeEach(() => {
            wrapper.setProps({
                schema: [{}]
            });

            field = wrapper.find('div>input');
        });

        test('with new value and old value', async () => {
            wrapper.setProps({
                schema: [{ value: 'bar' }]
            });

            await wrapper.vm.$nextTick();

            expect(wrapper.emitted()[eventName]).toBeFalsy();

            field.setValue('foo');

            expect(wrapper.emitted()[eventName]).toBeTruthy();
            expect(wrapper.emitted()[eventName]).toHaveLength(1);
            expect(wrapper.emitted()[eventName][0][1]).toBe('foo'); // NewValue
            expect(wrapper.emitted()[eventName][0][2]).toBe('bar'); // OldValue
        });

        test('only the new value', () => {
            expect(wrapper.emitted()[eventName]).toBeFalsy();

            field.setValue('foo');

            expect(wrapper.emitted()[eventName]).toBeTruthy();
            expect(wrapper.emitted()[eventName]).toHaveLength(1);
            expect(wrapper.emitted()[eventName][0][1]).toBe('foo'); // NewValue
            expect(wrapper.emitted()[eventName][0][2]).toBeUndefined(); // OldValue
        });
    });
});
