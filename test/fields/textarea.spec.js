import { shallowMount } from '@vue/test-utils';

import Textarea from '@/fields/textarea';

describe('fields -> Textarea', () => {
    let wrapper;
    let field;

    beforeEach(() => {
        wrapper = shallowMount(Textarea);
        field = wrapper.find('textarea');
    });

    test('is a Vue instance', () => {
        expect(wrapper.isVueInstance()).toBeTruthy();
    });

    test('exists textarea element', () => {
        expect(wrapper.exists()).toBe(true);
        expect(field.is('textarea')).toBe(true);
    });

    describe('value', () => {
        let schema = { model: 'name' };
        let model = { name: 'foo' };

        beforeEach(() => {
            wrapper.setProps({
                schema,
                model
            });
        });

        test('model static value', () => {
            expect(field.element.value).toBe('foo');
        });

        test('set new value to field if model changed', () => {
            model.name = 'bar';
            expect(field.element.value).toBe('bar');
        });

        test('set new value to model if value changed', () => {
            field.setValue('baz');
            expect(model.name).toBe('baz');
        });
    });

    describe('attributes', () => {
        test('with classes', () => {
            wrapper.setProps({ schema: { classes: ['foo', 'bar'] } });

            expect(field.classes()).toHaveLength(2);
            expect(field.classes()).toContain('foo');
            expect(field.classes()).toContain('bar');
        });

        test('with id', () => {
            wrapper.setProps({ schema: { id: 'id' } });

            expect(field.attributes().id).toBe('id');
        });

        test('with autofocus', () => {
            wrapper.setProps({ schema: { autofocus: true } });

            expect(field.attributes().autofocus).toBe('autofocus');
        });

        test('with cols', () => {
            wrapper.setProps({ schema: { cols: '5' } });

            expect(field.attributes().cols).toBe('5');
        });

        test('with dirname', () => {
            wrapper.setProps({ schema: { dirname: 'name.dir' } });

            expect(field.attributes().dirname).toBe('name.dir');
        });

        test('with disabled', () => {
            wrapper.setProps({ schema: { disabled: true } });

            expect(field.attributes().disabled).toBe('disabled');
        });

        test('with form', () => {
            wrapper.setProps({ schema: { form: 'form_id' } });

            expect(field.attributes().form).toBe('form_id');
        });

        test('with maxlength', () => {
            wrapper.setProps({ schema: { maxlength: 50 } });

            expect(field.attributes().maxlength).toBe('50');
        });

        test('with name', () => {
            wrapper.setProps({ schema: { name: 'name' } });

            expect(field.attributes().name).toBe('name');
        });

        test('with placeholder', () => {
            wrapper.setProps({ schema: { placeholder: 'placeholder' } });

            expect(field.attributes().placeholder).toBe('placeholder');
        });

        test('with readonly', () => {
            wrapper.setProps({ schema: { readonly: true } });

            expect(field.attributes().readonly).toBe('readonly');
        });

        test('with required', () => {
            wrapper.setProps({ schema: { required: true } });

            expect(field.attributes().required).toBe('required');
        });

        test('with rows', () => {
            wrapper.setProps({ schema: { rows: 5 } });

            expect(field.attributes().rows).toBe('5');
        });

        test('with wrap', () => {
            wrapper.setProps({ schema: { wrap: 'hard' } });

            expect(field.attributes().wrap).toBe('hard');
        });

        test('with attrs', () => {
            wrapper.setProps({ schema: { attrs: { 'data-foo': 'bar' } } });

            expect(field.attributes()['data-foo']).toBe('bar');
        });
    });

    describe('events', () => {
        test('emit event when changed', () => {
            const eventName = 'model-updated';

            expect(wrapper.emitted()[eventName]).toBeFalsy();

            field.setValue('foo');

            expect(wrapper.emitted()[eventName]).toBeTruthy();
            expect(wrapper.emitted()[eventName]).toHaveLength(1);
            expect(wrapper.emitted()[eventName][0][1]).toBe('foo');
            expect(wrapper.emitted()[eventName][0][2]).toBeUndefined();
        });

        test('schema onBlur event', () => {
            const schema = { onBlur: jest.fn() };

            wrapper.setProps({ schema });

            expect(schema.onBlur).not.toHaveBeenCalled();

            field.trigger('blur');

            expect(schema.onBlur).toHaveBeenCalled();
        });

        test('schema onChange event', () => {
            const schema = { onChange: jest.fn() };

            wrapper.setProps({ schema });

            expect(schema.onChange).not.toHaveBeenCalled();

            field.trigger('change');

            expect(schema.onChange).toHaveBeenCalled();
        });

        test('schema onFocus event', () => {
            const schema = { onFocus: jest.fn() };

            wrapper.setProps({ schema });

            expect(schema.onFocus).not.toHaveBeenCalled();

            field.trigger('focus');

            expect(schema.onFocus).toHaveBeenCalled();
        });

        test('schema onInput event', () => {
            const schema = { onInput: jest.fn() };

            wrapper.setProps({ schema });

            expect(schema.onInput).not.toHaveBeenCalled();

            field.trigger('input');

            expect(schema.onInput).toHaveBeenCalled();
        });

        test('custom with v-on', () => {
            const clickHandler = jest.fn();

            wrapper.setProps({ schema: { events: { click: clickHandler } } });

            expect(clickHandler).not.toHaveBeenCalled();

            field.trigger('click');

            expect(clickHandler).toHaveBeenCalled();
        });
    });
});
