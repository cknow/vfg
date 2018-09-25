import { parseObj, getFieldId, getOptionsByType } from '@/utils/helpers';

describe('utils -> helpers', () => {
    describe('parse obj', () => {
        test('empty if the values are empty', () => {
            expect(parseObj()).toStrictEqual({});
        });

        test('not analyze these properties', () => {
            const obj = {
                foo: 'bar',
                onChange: 'value',
                events: 'value',
                get: 'value',
                set: 'value',
                fields: 'value',
                items: 'value',
                enabled: () => false
            };

            expect(parseObj(obj)).toStrictEqual(obj);
        });

        test('analyze the values of the function type', () => {
            const obj = parseObj({
                fn: () => 'foo',
                fnWithArgs: (foo, bar) => `${foo}.${bar}`
            }, ['foo', 'bar']);

            expect(obj).toStrictEqual({
                fn: 'foo',
                fnWithArgs: 'foo.bar'
            });
        });

        test('analyze the recursive values', () => {
            const obj = parseObj({
                foo: 'bar',
                obj: {
                    foo: 'bar',
                    fn: () => 'foo',
                    fnWithArgs: (foo, bar) => `${foo}.${bar}`
                }
            }, ['foo', 'bar']);

            expect(obj).toStrictEqual({
                foo: 'bar',
                obj: {
                    foo: 'bar',
                    fn: 'foo',
                    fnWithArgs: 'foo.bar'
                }
            });
        });
    });

    describe('get field id', () => {
        test('empty if the values are empty', () => {
            expect(getFieldId()).toBeNull();
            expect(getFieldId({}, { id: 'bar' })).toBeNull();
            expect(getFieldId({}, { name: 'bar' })).toBeNull();
            expect(getFieldId({}, { prefix: 'bar' })).toBeNull();
        });

        test('prefix with the id property', () => {
            expect(getFieldId({ id: 'foo' }, { id: 'bar' })).toBe('barfoo');
            expect(getFieldId({ label: 'foo' }, { id: 'bar' })).toBe('barfoo');
            expect(getFieldId({ model: 'foo' }, { id: 'bar' })).toBe('barfoo');
            expect(getFieldId({ name: 'foo' }, { id: 'bar' })).toBe('barfoo');
        });

        test('prefix with the name property', () => {
            expect(getFieldId({ id: 'foo' }, { name: 'bar' })).toBe('barfoo');
            expect(getFieldId({ label: 'foo' }, { name: 'bar' })).toBe('barfoo');
            expect(getFieldId({ model: 'foo' }, { name: 'bar' })).toBe('barfoo');
            expect(getFieldId({ name: 'foo' }, { name: 'bar' })).toBe('barfoo');
        });

        test('prefix with the prefix property', () => {
            expect(getFieldId({ id: 'foo' }, { prefix: 'bar' })).toBe('barfoo');
            expect(getFieldId({ label: 'foo' }, { prefix: 'bar' })).toBe('barfoo');
            expect(getFieldId({ model: 'foo' }, { prefix: 'bar' })).toBe('barfoo');
            expect(getFieldId({ name: 'foo' }, { prefix: 'bar' })).toBe('barfoo');
        });

        test('convert to kebabCase', () => {
            expect(getFieldId({ id: 'FooBar' })).toBe('foo-bar');
            expect(getFieldId({ label: 'foo-bar' })).toBe('foo-bar');
            expect(getFieldId({ model: 'fooBar' })).toBe('foo-bar');
            expect(getFieldId({ name: 'foo_Bar' })).toBe('foo-bar');
        });
    });

    describe('get options by type', () => {
        const types = {
            text: { foo: 'bar' },
            email: { bar: 'foo' }
        };

        test('empty if the values are empty', () => {
            expect(getOptionsByType()).toStrictEqual({});
            expect(getOptionsByType({}, {})).toStrictEqual({});
            expect(getOptionsByType({}, { types })).toStrictEqual({});
        });

        test('merge with the schema', () => {
            expect(getOptionsByType({}, { schema: { foo: 'bar' } })).toStrictEqual({ foo: 'bar' });
            expect(getOptionsByType({}, { schema: { bar: 'foo' } })).toStrictEqual({ bar: 'foo' });
        });

        test('merge with the type', () => {
            expect(getOptionsByType({ type: 'password' }, { types })).toStrictEqual({});
            expect(getOptionsByType({ type: 'text' }, { types })).toStrictEqual({ foo: 'bar' });
            expect(getOptionsByType({ type: 'email' }, { types })).toStrictEqual({ bar: 'foo' });
        });

        test('merge with the field type', () => {
            expect(getOptionsByType({ inputType: 'password' }, { types })).toStrictEqual({});
            expect(getOptionsByType({ inputType: 'text' }, { types })).toStrictEqual({ foo: 'bar' });
            expect(getOptionsByType({ inputType: 'email' }, { types })).toStrictEqual({ bar: 'foo' });
        });
    });
});
