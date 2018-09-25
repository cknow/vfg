import { mount } from '@vue/test-utils';
import merge from 'lodash/merge';
import wrapperComponent from '@/components/wrapper';

describe('components -> wrapper', () => {
    let wrapper = createWrapper();
    let config;

    test('is a Vue instance', () => {
        expect(wrapper.isVueInstance()).toBeTruthy();
    });

    test('with empty values', () => {
        expect(wrapper.isEmpty()).toBe(true);
    });

    describe('label', () => {
        test('with text if tag is label', () => {
            wrapper.setProps({
                options: {
                    enabled: true,
                    tag: 'label'
                },
                field: {
                    label: 'foo'
                }
            });

            expect(wrapper.is('label')).toBe(true);
            expect(wrapper.text()).toContain('foo');
        });

        test('with html if tag is label', () => {
            wrapper.setProps({
                options: {
                    enabled: true,
                    tag: 'label'
                },
                field: {
                    labelHtml: '<b>foo</b>'
                }
            });

            expect(wrapper.is('label')).toBe(true);
            expect(wrapper.html()).toContain('<b>foo</b>');
        });

        test('with text if is label enabled', () => {
            wrapper.setProps({
                options: {
                    enabled: true,
                    isLabel: true
                },
                field: {
                    label: 'foo'
                }
            });

            expect(wrapper.is('div')).toBe(true);
            expect(wrapper.text()).toContain('foo');
        });

        test('with html if is label enabled', () => {
            wrapper.setProps({
                options: {
                    enabled: true,
                    isLabel: true
                },
                field: {
                    labelHtml: '<b>foo</b>'
                }
            });

            expect(wrapper.is('div')).toBe(true);
            expect(wrapper.html()).toContain('<b>foo</b>');
        });
    });

    describe('legend', () => {
        test('with text if tag is legend', () => {
            wrapper.setProps({
                options: {
                    enabled: true,
                    tag: 'legend'
                },
                field: {
                    legend: 'foo'
                }
            });

            expect(wrapper.is('legend')).toBe(true);
            expect(wrapper.text()).toContain('foo');
        });

        test('with html if tag is legend', () => {
            wrapper.setProps({
                options: {
                    enabled: true,
                    tag: 'legend'
                },
                field: {
                    legendHtml: '<b>foo</b>'
                }
            });

            expect(wrapper.is('legend')).toBe(true);
            expect(wrapper.html()).toContain('<b>foo</b>');
        });

        test('with text if is legend enabled', () => {
            wrapper.setProps({
                options: {
                    enabled: true,
                    isLegend: true
                },
                field: {
                    legend: 'foo'
                }
            });

            expect(wrapper.is('div')).toBe(true);
            expect(wrapper.text()).toContain('foo');
        });

        test('with html if is legend enabled', () => {
            wrapper.setProps({
                options: {
                    enabled: true,
                    isLegend: true
                },
                field: {
                    legendHtml: '<b>foo</b>'
                }
            });

            expect(wrapper.is('div')).toBe(true);
            expect(wrapper.html()).toContain('<b>foo</b>');
        });
    });

    describe('only wrapper', () => {
        config = (options = {}) => ({
            options: {
                enabled: true,
                wrapper: [
                    merge({}, { enabled: true }, options)
                ]
            }
        });

        runBaseTests(wrapper, config, 'div > div', 0);
    });

    describe('only prepend', () => {
        describe('one', () => {
            config = (options = {}) => ({
                options: {
                    enabled: true,
                    prepend: [
                        merge({}, { enabled: true }, options)
                    ]
                }
            });

            runBaseTests(wrapper, config, 'div > div', 0);
        });

        describe('one cascade', () => {
            config = (options = {}) => ({
                options: {
                    enabled: true,
                    prepend: [
                        {
                            enabled: true,
                            prepend: [
                                merge({}, { enabled: true }, options)
                            ]
                        }
                    ]
                }
            });

            runBaseTests(wrapper, config, 'div > div > div', 0);
        });

        describe('multiple', () => {
            config = options => ({
                options: {
                    enabled: true,
                    prepend: [
                        merge({}, { enabled: true }, options),
                        merge({}, { enabled: true }, options),
                        merge({}, { enabled: true }, options)
                    ]
                }
            });

            describe('first', () => {
                runBaseTests(wrapper, config, 'div > div', 0);
            });

            describe('second', () => {
                runBaseTests(wrapper, config, 'div > div', 1);
            });

            describe('third', () => {
                runBaseTests(wrapper, config, 'div > div', 2);
            });
        });

        describe('multiple cascade', () => {
            config = (options = {}) => ({
                options: {
                    enabled: true,
                    prepend: [
                        {
                            enabled: true,
                            prepend: [
                                merge({}, { enabled: true }, options)
                            ]
                        },
                        {
                            enabled: true,
                            prepend: [
                                merge({}, { enabled: true }, options),
                                merge({}, { enabled: true }, options),
                                merge({}, { enabled: true }, options)
                            ]
                        }
                    ]
                }
            });

            describe('cascade 1 - 1', () => {
                runBaseTests(wrapper, config, 'div > div > div', 0);
            });

            describe('cascade 2 - 1', () => {
                runBaseTests(wrapper, config, 'div > div > div', 1);
            });

            describe('cascade 2 - 2', () => {
                runBaseTests(wrapper, config, 'div > div > div', 2);
            });
        });
    });

    describe('only append', () => {
        describe('one', () => {
            config = (options = {}) => ({
                options: {
                    enabled: true,
                    append: [
                        merge({}, { enabled: true }, options)
                    ]
                }
            });

            runBaseTests(wrapper, config, 'div > div', 0);
        });

        describe('one cascade', () => {
            config = (options = {}) => ({
                options: {
                    enabled: true,
                    append: [
                        {
                            enabled: true,
                            append: [
                                merge({}, { enabled: true }, options)
                            ]
                        }
                    ]
                }
            });

            runBaseTests(wrapper, config, 'div > div > div', 0);
        });

        describe('multiple', () => {
            config = options => ({
                options: {
                    enabled: true,
                    append: [
                        merge({}, { enabled: true }, options),
                        merge({}, { enabled: true }, options),
                        merge({}, { enabled: true }, options)
                    ]
                }
            });

            describe('first', () => {
                runBaseTests(wrapper, config, 'div > div', 0);
            });

            describe('second', () => {
                runBaseTests(wrapper, config, 'div > div', 1);
            });

            describe('third', () => {
                runBaseTests(wrapper, config, 'div > div', 2);
            });
        });

        describe('multiple cascade', () => {
            config = (options = {}) => ({
                options: {
                    enabled: true,
                    append: [
                        {
                            enabled: true,
                            append: [
                                merge({}, { enabled: true }, options)
                            ]
                        },
                        {
                            enabled: true,
                            append: [
                                merge({}, { enabled: true }, options),
                                merge({}, { enabled: true }, options),
                                merge({}, { enabled: true }, options)
                            ]
                        }
                    ]
                }
            });

            describe('cascade 1 - 1', () => {
                runBaseTests(wrapper, config, 'div > div > div', 0);
            });

            describe('cascade 2 - 1', () => {
                runBaseTests(wrapper, config, 'div > div > div', 1);
            });

            describe('cascade 2 - 2', () => {
                runBaseTests(wrapper, config, 'div > div > div', 2);
            });
        });
    });

    describe('with prepend and wrapper', () => {
        config = (options = {}) => ({
            options: {
                enabled: true,
                prepend: [
                    merge({}, { enabled: true }, options)
                ],
                wrapper: [
                    merge({}, { enabled: true }, options)
                ]
            }
        });

        describe('prepend', () => {
            runBaseTests(wrapper, config, 'div > div', 0);
        });

        describe('wrapper', () => {
            runBaseTests(wrapper, config, 'div > div', 1);
        });
    });

    describe('with multiple prepend and wrapper', () => {
        config = (options = {}) => ({
            options: {
                enabled: true,
                prepend: [
                    merge({}, { enabled: true }, options),
                    merge({}, { enabled: true }, options)
                ],
                wrapper: [
                    merge({}, { enabled: true }, options)
                ]
            }
        });

        describe('prepend 1', () => {
            runBaseTests(wrapper, config, 'div > div', 0);
        });

        describe('prepend 2', () => {
            runBaseTests(wrapper, config, 'div > div', 1);
        });

        describe('wrapper', () => {
            runBaseTests(wrapper, config, 'div > div', 2);
        });
    });

    describe('with append and wrapper', () => {
        config = (options = {}) => ({
            options: {
                enabled: true,
                wrapper: [
                    merge({}, { enabled: true }, options)
                ],
                append: [
                    merge({}, { enabled: true }, options)
                ]
            }
        });

        describe('wrapper', () => {
            runBaseTests(wrapper, config, 'div > div', 0);
        });

        describe('append', () => {
            runBaseTests(wrapper, config, 'div > div', 1);
        });
    });

    describe('with multiple append and wrapper', () => {
        config = (options = {}) => ({
            options: {
                enabled: true,
                wrapper: [
                    merge({}, { enabled: true }, options)
                ],
                append: [
                    merge({}, { enabled: true }, options),
                    merge({}, { enabled: true }, options)
                ]
            }
        });

        describe('wrapper', () => {
            runBaseTests(wrapper, config, 'div > div', 0);
        });

        describe('append 1', () => {
            runBaseTests(wrapper, config, 'div > div', 1);
        });

        describe('append 2', () => {
            runBaseTests(wrapper, config, 'div > div', 2);
        });
    });

    describe('with prepend, wrapper and append', () => {
        config = (options = {}) => ({
            options: {
                enabled: true,
                prepend: [
                    merge({}, { enabled: true }, options)
                ],
                wrapper: [
                    merge({}, { enabled: true }, options)
                ],
                append: [
                    merge({}, { enabled: true }, options)
                ]
            }
        });

        describe('prepend', () => {
            runBaseTests(wrapper, config, 'div > div', 0);
        });

        describe('wrapper', () => {
            runBaseTests(wrapper, config, 'div > div', 1);
        });

        describe('append', () => {
            runBaseTests(wrapper, config, 'div > div', 2);
        });
    });
});

function createWrapper(slot = '<p>slot</p>') {
    return mount(wrapperComponent, {
        scopedSlots: {
            default: slot
        }
    });
}

function runBaseTests(wrapper, defaults, selector = 'div', at = 0) {
    const element = w => {
        const elements = w.findAll(selector);

        if (elements.length > 0) {
            return elements.at(at);
        }

        return elements;
    };

    test('with not enabled', () => {
        wrapper.setProps(defaults({ enabled: false }));

        const el = element(wrapper);

        expect(el.exists()).toBe(false);
    });

    test('with enabled function', () => {
        const enabledHandler = jest.fn();

        wrapper.setProps(defaults({ enabled: enabledHandler }));

        const el = element(wrapper);

        expect(el.exists()).toBe(false);
        expect(enabledHandler).toBeCalled();
    });

    test('render slot if has option prepend', () => {
        wrapper.setProps(defaults({ prepend: [] }));

        const el = element(wrapper);

        expect(el.exists()).toBe(true);
        expect(wrapper.html()).toContain('<p>slot</p>');
    });

    test('render slot if has option append', () => {
        wrapper.setProps(defaults({ append: [] }));

        const el = element(wrapper);

        expect(el.exists()).toBe(true);
        expect(wrapper.html()).toContain('<p>slot</p>');
    });

    test('check render text', () => {
        wrapper.setProps(defaults({ text: `foo${at}` }));

        const el = element(wrapper);

        expect(el.text()).toContain(`foo${at}`);
    });

    test('check render html', () => {
        wrapper.setProps(defaults({ html: `<b>foo${at}</b>` }));

        const el = element(wrapper);

        expect(el.html()).toContain(`<b>foo${at}</b>`);
    });

    test('with classes', () => {
        const classes = {};

        classes[`foo${at}`] = true;
        classes[`bar${at}`] = false;

        wrapper.setProps(defaults({ classes }));

        const el = element(wrapper);

        expect(el.classes()).toHaveLength(1);
        expect(el.classes()).toContain(`foo${at}`);
        expect(el.classes()).not.toContain(`bar${at}`);
    });

    test('without classes', () => {
        wrapper.setProps(defaults());

        const el = element(wrapper);

        expect(el.classes()).toHaveLength(0);
    });

    test('default tag', () => {
        wrapper.setProps(defaults());

        const el = element(wrapper);

        expect(el.exists()).toBe(true);
        expect(el.is('div')).toBe(true);
    });

    test('custom tag', () => {
        wrapper.setProps(defaults({ tag: 'fieldset' }));

        const el = element(wrapper);

        expect(el.exists()).toBe(false);
        expect(wrapper.find('fieldset').exists()).toBe(true);
    });

    test('custom for', () => {
        wrapper.setProps(defaults({ id: `foo${at}` }));

        const el = element(wrapper);

        expect(el.attributes().for).toBe(`foo${at}`);
    });

    test('with attributes', () => {
        const options = {
            attrs: {
                foo: `bar${at}`,
                bar: false
            }
        };

        wrapper.setProps(defaults(options));

        const el = element(wrapper);

        expect(el.attributes().foo).toBe(`bar${at}`);
        expect(el.attributes().bar).toBeUndefined();
    });

    test('with events', () => {
        const clickHandler = jest.fn();

        wrapper.setProps(defaults({ events: { click: clickHandler } }));

        const el = element(wrapper);

        expect(clickHandler).not.toBeCalled();

        el.trigger('click');

        expect(clickHandler).toBeCalled();
    });
}
