import { mount, createLocalVue } from '@vue/test-utils';

import base from '@/fields/base';

const localVue = createLocalVue();

localVue.component('AbstractField', {
    render(h) {
        return h();
    },
    mixins: [base]
});

let wrapper;
let field;

function createField(data, template = '<abstract-field :schema="schema" :model="model" ref="field" />') {
    const Component = {
        template,
        data() {
            return data;
        }
    };

    wrapper = mount(Component, {
        localVue
    });

    field = wrapper.vm.$refs.field;
}

describe('fields -> base', () => {
    describe('with empty values', () => {
        beforeEach(() => {
            createField({}, '<abstract-field />');
        });

        test('using default values', () => {
            expect(wrapper.vm.formOptions).toBeUndefined();
            expect(wrapper.vm.model).toBeUndefined();
            expect(wrapper.vm.schema).toBeUndefined();
        });
    });

    describe('initialize value of schema', () => {
        let schema = { value: 'foo' };
        let model = {};

        beforeEach(() => {
            createField({
                schema,
                model
            });
        });

        test('schema static value', () => {
            expect(field.value).toBe('foo');
        });
    });

    describe('static value', () => {
        let schema = { model: 'name' };
        let model = { name: 'foo' };

        beforeEach(() => {
            createField({
                schema,
                model
            });
        });

        test('model static value', () => {
            expect(field.value).toBe('foo');
        });

        test('set new value to field if model changed', () => {
            model.name = 'bar';
            expect(field.value).toBe('bar');
        });

        test('set new value to model if value changed', () => {
            field.value = 'baz';
            expect(model.name).toBe('baz');
        });
    });

    describe('nested value', () => {
        let schema = { model: 'user.name' };
        let model = { user: { name: 'foo' } };

        beforeEach(() => {
            createField({
                schema,
                model
            });
        });

        test('model static value', () => {
            expect(field.value).toBe('foo');
        });

        test('set new value to model if value changed', () => {
            field.value = 'bar';
            expect(model.user.name).toBe('bar');
        });
    });

    describe('nested value if not exists', () => {
        let schema = { model: 'user.name.first' };
        let model = { user: {} };

        beforeEach(() => {
            createField({
                schema,
                model
            });
        });

        test('model static value', () => {
            expect(field.value).toBeUndefined();
        });

        test('set new value to model if value changed', () => {
            field.value = 'bar';
            expect(model.user.name.first).toBe('bar');
        });
    });

    describe('value as get/set function', () => {
        let schema = {
            get: jest.fn(() => 'foo'),
            set: jest.fn()
        };
        let model = {};

        beforeEach(() => {
            createField({
                schema,
                model
            });
        });

        test('called the schema.get function', () => {
            expect(field.schema.get).not.toHaveBeenCalled();
            expect(field.value).toBe('foo');
            expect(field.schema.get).toHaveBeenCalled();
        });

        test('set new value to model if value changed', () => {
            expect(field.schema.set).not.toHaveBeenCalled();

            field.value = 'bar';

            expect(field.schema.set).toHaveBeenCalledWith('bar', 'foo');
        });
    });

    describe('formatValueToField & formatValueToModel function', () => {
        let schema = { model: 'name' };
        let model = { name: 'foo' };

        beforeEach(() => {
            createField({
                schema,
                model
            });

            field.formatValueToField = value => `**${value}**`;
            field.formatValueToModel = value => `!!${value}!!`;
        });

        test('formatValueToField', () => {
            expect(field.value).toBe('**foo**');
        });

        test('formatValueToModel', () => {
            field.value = 'bar';
            expect(model.name).toBe('!!bar!!');
        });

        test('value is a function on formatValueToModel', () => {
            const newValue = jest.fn();

            field.formatValueToModel = () => newValue;

            expect(newValue).not.toHaveBeenCalled();

            field.value = 'baz';

            expect(newValue).toHaveBeenCalledWith(newValue, '**!!bar!!**');
        });
    });

    describe('schema onChanged event', () => {
        let schema = { onChanged: jest.fn() };
        let model = {};

        beforeEach(() => {
            createField({
                schema,
                model
            });
        });

        test('called the schema.onChanged function', () => {
            expect(schema.onChanged).not.toHaveBeenCalled();

            field.value = 'foo';

            expect(schema.onChanged).toHaveBeenCalledWith('foo', undefined);
        });
    });
});
