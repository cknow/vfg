import { shallowMount } from '@vue/test-utils';

import Input from '@/fields/input';

describe('fields -> Input', () => {
    let wrapper;
    let field;

    beforeEach(() => {
        wrapper = shallowMount(Input);
        field = wrapper.find('input');
    });

    test('is a Vue instance', () => {
        expect(wrapper.isVueInstance()).toBeTruthy();
    });

    test('exists input element', () => {
        expect(wrapper.exists()).toBe(true);
        expect(field.is('input')).toBe(true);
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

        test('with accept', () => {
            wrapper.setProps({ schema: { accept: 'image/*' } });

            expect(field.attributes().accept).toBe('image/*');
        });

        test('with align', () => {
            wrapper.setProps({ schema: { align: 'middle' } });

            expect(field.attributes().align).toBe('middle');
        });

        test('with alt', () => {
            wrapper.setProps({ schema: { alt: 'foo' } });

            expect(field.attributes().alt).toBe('foo');
        });

        test('with autocomplete', () => {
            wrapper.setProps({ schema: { autocomplete: 'on' } });

            expect(field.attributes().autocomplete).toBe('on');
        });

        test('with autofocus', () => {
            wrapper.setProps({ schema: { autofocus: true } });

            expect(field.attributes().autofocus).toBe('autofocus');
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

        test('with formaction', () => {
            wrapper.setProps({ schema: { formaction: 'form_url' } });

            expect(field.attributes().formaction).toBe('form_url');
        });

        test('with formenctype', () => {
            wrapper.setProps({ schema: { formenctype: 'text/plain' } });

            expect(field.attributes().formenctype).toBe('text/plain');
        });

        test('with formmethod', () => {
            wrapper.setProps({ schema: { formmethod: 'post' } });

            expect(field.attributes().formmethod).toBe('post');
        });

        test('with formnovalidate', () => {
            wrapper.setProps({ schema: { formnovalidate: true } });

            expect(field.attributes().formnovalidate).toBe('formnovalidate');
        });

        test('with formtarget', () => {
            wrapper.setProps({ schema: { formtarget: '_self' } });

            expect(field.attributes().formtarget).toBe('_self');
        });

        test('with height', () => {
            wrapper.setProps({ schema: { height: 50 } });

            expect(field.attributes().height).toBe('50');
        });

        test('with list', () => {
            wrapper.setProps({ schema: { list: 'datalist_id' } });

            expect(field.attributes().list).toBe('datalist_id');
        });

        test('with max', () => {
            wrapper.setProps({ schema: { max: 50 } });

            expect(field.attributes().max).toBe('50');
        });

        test('with maxlength', () => {
            wrapper.setProps({ schema: { maxlength: 50 } });

            expect(field.attributes().maxlength).toBe('50');
        });

        test('with min', () => {
            wrapper.setProps({ schema: { min: 50 } });

            expect(field.attributes().min).toBe('50');
        });

        test('with multiple', () => {
            wrapper.setProps({ schema: { multiple: true } });

            expect(field.attributes().multiple).toBe('multiple');
        });

        test('with name', () => {
            wrapper.setProps({ schema: { name: 'name' } });

            expect(field.attributes().name).toBe('name');
        });

        test('with pattern', () => {
            wrapper.setProps({ schema: { pattern: '/foo/' } });

            expect(field.attributes().pattern).toBe('/foo/');
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

        test('with size', () => {
            wrapper.setProps({ schema: { size: 50 } });

            expect(field.attributes().size).toBe('50');
        });

        test('with src', () => {
            wrapper.setProps({ schema: { src: 'src' } });

            expect(field.attributes().src).toBe('src');
        });

        test('with step', () => {
            wrapper.setProps({ schema: { step: 50 } });

            expect(field.attributes().step).toBe('50');
        });

        test('with type', () => {
            wrapper.setProps({ schema: { inputType: 'text' } });

            expect(field.attributes().type).toBe('text');
        });

        test('with value on input type radio', () => {
            wrapper.setProps({
                schema: {
                    inputType: 'radio',
                    value: 50
                }
            });

            expect(field.attributes().type).toBe('radio');
            expect(field.attributes().value).toBe('50');
        });

        test('with value on input type checkbox', () => {
            wrapper.setProps({
                schema: {
                    inputType: 'checkbox',
                    value: 50
                }
            });

            expect(field.attributes().type).toBe('checkbox');
            expect(field.attributes().value).toBe('50');
        });

        test('with width', () => {
            wrapper.setProps({ schema: { width: 50 } });

            expect(field.attributes().width).toBe('50');
        });

        test('with attrs', () => {
            wrapper.setProps({ schema: { attrs: { 'data-foo': 'bar' } } });

            expect(field.attributes()['data-foo']).toBe('bar');
        });
    });

    describe('types', () => {
        [
            'button',
            'checkbox',
            'color',
            'date',
            'datetime-local',
            'email',
            'file',
            'hidden',
            'image',
            'month',
            'number',
            'password',
            'radio',
            'range',
            'reset',
            'search',
            'submit',
            'tel',
            'text',
            'time',
            'url',
            'week'
        ].forEach(inputType => {
            test(`with ${inputType}`, () => {
                wrapper.setProps({ schema: { inputType } });

                expect(field.attributes().type).toBe(inputType);
            });
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
