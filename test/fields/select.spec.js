import { shallowMount } from '@vue/test-utils';
import select from '@/fields/select';

describe('fields -> select', () => {
    let wrapper;
    let field;

    beforeEach(() => {
        wrapper = shallowMount(select);
        field = wrapper.find('select');
    });

    test('is a Vue instance', () => {
        expect(wrapper.isVueInstance()).toBeTruthy();
    });

    test('exists select element', () => {
        expect(wrapper.exists()).toBe(true);
        expect(field.is('select')).toBe(true);
    });

    describe('value', () => {
        let schema = {
            model: 'name',
            items: ['foo', 'bar', 'baz']
        };
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

        test('with disabled', () => {
            wrapper.setProps({ schema: { disabled: true } });

            expect(field.attributes().disabled).toBe('disabled');
        });

        test('with form', () => {
            wrapper.setProps({ schema: { form: 'form_id' } });

            expect(field.attributes().form).toBe('form_id');
        });

        test('with multiple', () => {
            wrapper.setProps({ schema: { multiple: true } });

            expect(field.attributes().multiple).toBe('multiple');
        });

        test('with name', () => {
            wrapper.setProps({ schema: { name: 'name' } });

            expect(field.attributes().name).toBe('name');
        });

        test('with required', () => {
            wrapper.setProps({ schema: { required: true } });

            expect(field.attributes().required).toBe('required');
        });

        test('with size', () => {
            wrapper.setProps({ schema: { size: 50 } });

            expect(field.attributes().size).toBe('50');
        });

        test('with attrs', () => {
            wrapper.setProps({ schema: { attrs: { 'data-foo': 'bar' } } });

            expect(field.attributes()['data-foo']).toBe('bar');
        });
    });

    describe('events', () => {
        test('emit event when changed', () => {
            const eventName = 'model-updated';

            wrapper.setProps({
                schema: {
                    items: ['foo', 'bar', 'baz']
                }
            });

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

            expect(schema.onBlur).not.toBeCalled();

            field.trigger('blur');

            expect(schema.onBlur).toBeCalled();
        });

        test('schema onChange event', () => {
            const schema = { onChange: jest.fn() };

            wrapper.setProps({ schema });

            expect(schema.onChange).not.toBeCalled();

            field.trigger('change');

            expect(schema.onChange).toBeCalled();
        });

        test('schema onFocus event', () => {
            const schema = { onFocus: jest.fn() };

            wrapper.setProps({ schema });

            expect(schema.onFocus).not.toBeCalled();

            field.trigger('focus');

            expect(schema.onFocus).toBeCalled();
        });

        test('custom with v-on', () => {
            const clickHandler = jest.fn();

            wrapper.setProps({ schema: { events: { click: clickHandler } } });

            expect(clickHandler).not.toBeCalled();

            field.trigger('click');

            expect(clickHandler).toBeCalled();
        });
    });

    describe('none selected text', () => {
        let option;

        beforeEach(() => {
            option = wrapper.find('option');
        });

        test('default values', () => {
            expect(option.exists()).toBe(true);
            expect(option.text()).toBe('---');
            expect(option.element.value).toBe('');
            expect(option.attributes().disabled).toBeUndefined();
        });

        test('with hide option', () => {
            wrapper.setProps({ schema: { config: { noneSelectedText: { hide: true } } } });

            expect(wrapper.find('option').exists()).toBe(false);
        });

        test('with name', () => {
            wrapper.setProps({ schema: { config: { noneSelectedText: { name: 'foo' } } } });

            expect(option.text()).toBe('foo');
        });

        test('with value', () => {
            wrapper.setProps({ schema: { config: { noneSelectedText: { value: 'foo' } } } });

            expect(option.element.value).toBe('foo');
        });

        test('with disabled', () => {
            wrapper.setProps({ schema: { config: { noneSelectedText: { disabled: true } } } });

            expect(option.attributes().disabled).toBe('disabled');
        });

        test('with classes', () => {
            wrapper.setProps({ schema: { config: { noneSelectedText: { classes: ['foo', 'bar'] } } } });

            expect(option.classes()).toHaveLength(2);
            expect(option.classes()).toContain('foo');
            expect(option.classes()).toContain('bar');
        });

        test('with attrs', () => {
            wrapper.setProps({ schema: { config: { noneSelectedText: { attrs: { 'data-foo': 'bar' } } } } });

            expect(option.attributes()['data-foo']).toBe('bar');
        });

        test('disabled if select is required', () => {
            wrapper.setProps({ schema: { required: true } });

            expect(option.attributes().disabled).toBe('disabled');
        });
    });

    describe('items', () => {
        beforeEach(() => {
            wrapper.setProps({
                schema: {
                    config: {
                        noneSelectedText: {
                            hide: true
                        }
                    }
                }
            });
        });

        test('with empty', () => {
            expect(wrapper.find('option').exists()).toBe(false);
        });

        test('with array string', () => {
            wrapper.setData({
                schema: {
                    items: ['foo', 'bar', 'baz']
                }
            });

            const options = wrapper.findAll('option');

            expect(options).toHaveLength(3);
            expect(options.at(0).html()).toBe('<option value="foo">foo</option>');
            expect(options.at(1).html()).toBe('<option value="bar">bar</option>');
            expect(options.at(2).html()).toBe('<option value="baz">baz</option>');
        });

        test('with array object using default options key', () => {
            wrapper.setData({
                schema: {
                    items: [
                        {
                            id: 1,
                            name: 'foo'
                        },
                        {
                            id: 2,
                            name: 'bar'
                        },
                        {
                            id: 3,
                            name: 'baz'
                        }
                    ]
                }
            });

            const options = wrapper.findAll('option');

            expect(options).toHaveLength(3);
            expect(options.at(0).html()).toBe('<option value="1">foo</option>');
            expect(options.at(1).html()).toBe('<option value="2">bar</option>');
            expect(options.at(2).html()).toBe('<option value="3">baz</option>');
        });

        test('with array object using custom options key', () => {
            wrapper.setData({
                schema: {
                    config: {
                        optionsKey: {
                            value: 'value',
                            name: 'text'
                        }
                    },
                    items: [
                        {
                            value: 1,
                            text: 'foo'
                        },
                        {
                            value: 2,
                            text: 'bar'
                        },
                        {
                            value: 3,
                            text: 'baz'
                        }
                    ]
                }
            });

            const options = wrapper.findAll('option');

            expect(options).toHaveLength(3);
            expect(options.at(0).html()).toBe('<option value="1">foo</option>');
            expect(options.at(1).html()).toBe('<option value="2">bar</option>');
            expect(options.at(2).html()).toBe('<option value="3">baz</option>');
        });

        test('with function returning array string', () => {
            wrapper.setData({
                schema: {
                    items() {
                        return ['foo', 'bar', 'baz'];
                    }
                }
            });

            const options = wrapper.findAll('option');

            expect(options).toHaveLength(3);
            expect(options.at(0).html()).toBe('<option value="foo">foo</option>');
            expect(options.at(1).html()).toBe('<option value="bar">bar</option>');
            expect(options.at(2).html()).toBe('<option value="baz">baz</option>');
        });

        test('with function returning array object', () => {
            wrapper.setData({
                schema: {
                    items() {
                        return [
                            {
                                id: 1,
                                name: 'foo'
                            },
                            {
                                id: 2,
                                name: 'bar'
                            },
                            {
                                id: 3,
                                name: 'baz'
                            }
                        ];
                    }
                }
            });

            const options = wrapper.findAll('option');

            expect(options).toHaveLength(3);
            expect(options.at(0).html()).toBe('<option value="1">foo</option>');
            expect(options.at(1).html()).toBe('<option value="2">bar</option>');
            expect(options.at(2).html()).toBe('<option value="3">baz</option>');
        });

        test('with classes, disabled and attrs', () => {
            wrapper.setData({
                schema: {
                    items: [
                        {
                            id: 1,
                            name: 'foo',
                            classes: {
                                foo: true
                            }
                        },
                        {
                            id: 2,
                            name: 'bar',
                            disabled: true
                        },
                        {
                            id: 3,
                            name: 'baz',
                            attrs: {
                                'data-foo': 'bar'
                            }
                        }
                    ]
                }
            });

            const options = wrapper.findAll('option');

            expect(options).toHaveLength(3);
            expect(options.at(0).classes()).toContain('foo');
            expect(options.at(1).attributes().disabled).toBe('disabled');
            expect(options.at(2).attributes()['data-foo']).toBe('bar');
        });

        test('with optgroup', () => {
            wrapper.setData({
                schema: {
                    items: [
                        {
                            name: 'foo',
                            options: [
                                {
                                    id: '1-1',
                                    name: 'foo1'
                                },
                                {
                                    id: '1-2',
                                    name: 'foo2'
                                },
                                {
                                    id: '1-3',
                                    name: 'foo3'
                                }
                            ]
                        },
                        {
                            id: '2',
                            name: 'bar'
                        },
                        {
                            name: 'baz',
                            options: ['baz1', 'baz2', 'baz3']
                        }
                    ]
                }
            });

            expect(wrapper.findAll('option')).toHaveLength(7);
            expect(wrapper.find('select>option').html()).toBe('<option value="2">bar</option>');

            const optgroups = wrapper.findAll('optgroup');

            expect(optgroups).toHaveLength(2);
            expect(optgroups.at(0).attributes().label).toContain('foo');
            expect(optgroups.at(0).findAll('option')).toHaveLength(3);
            expect(optgroups.at(0).findAll('option').at(0).html()).toBe('<option value="1-1">foo1</option>');
            expect(optgroups.at(0).findAll('option').at(1).html()).toBe('<option value="1-2">foo2</option>');
            expect(optgroups.at(0).findAll('option').at(2).html()).toBe('<option value="1-3">foo3</option>');
            expect(optgroups.at(1).attributes().label).toContain('baz');
            expect(optgroups.at(1).findAll('option').at(0).html()).toBe('<option value="baz1">baz1</option>');
            expect(optgroups.at(1).findAll('option').at(1).html()).toBe('<option value="baz2">baz2</option>');
            expect(optgroups.at(1).findAll('option').at(2).html()).toBe('<option value="baz3">baz3</option>');
        });
    });
});
