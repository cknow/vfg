import { mount, createLocalVue } from '@vue/test-utils';

import Vfg from '@/components/vfg';
import install from '@/install';

describe('defaults -> horizontal', () => {
    let localVue;
    let wrapper;

    beforeAll(() => {
        localVue = createLocalVue();
        localVue.use(install);
    });

    beforeEach(() => {
        wrapper = mount(Vfg, {
            localVue,
            propsData: {
                options: {
                    horizontal: {
                        schema: {
                            classes: {
                                foo: true
                            },
                            wrapper: {
                                classes: {
                                    bar: true
                                }
                            }
                        },
                        types: {
                            email: {
                                classes: {
                                    foo: false,
                                    baz: true
                                }
                            }
                        }
                    }
                },
                schema: [{
                    horizontal: true,
                    label: 'Name'
                }, {
                    horizontal: true,
                    label: 'E-mail',
                    inputType: 'email'
                }]
            }
        });
    });

    test('check elements length', () => {
        expect(wrapper.exists()).toBe(true);
        expect(wrapper.is('div')).toBe(true);
        expect(wrapper.findAll('div>div')).toHaveLength(2);
        expect(wrapper.findAll('div>div>input')).toHaveLength(2);
        expect(wrapper.findAll('div>div>label')).toHaveLength(2);
    });

    test('check name field', () => {
        const container = wrapper.findAll('div>div').at(0);

        expect(container.exists()).toBe(true);
        expect(container.is('div')).toBe(true);
        expect(container.classes()).toContain('bar');

        expect(container.find('label').exists()).toBe(true);
        expect(container.find('input').exists()).toBe(true);
        expect(container.find('input').classes()).toContain('foo');

        expect(container.find('label').attributes().for).toBe('name');
        expect(container.find('input').attributes().id).toBe('name');
        expect(container.find('input').attributes().type).toBe('text');
    });

    test('check email field', () => {
        const container = wrapper.findAll('div>div').at(1);

        expect(container.exists()).toBe(true);
        expect(container.is('div')).toBe(true);
        expect(container.classes()).toContain('bar');

        expect(container.find('label').exists()).toBe(true);
        expect(container.find('input').exists()).toBe(true);
        expect(container.find('input').classes()).not.toContain('foo');
        expect(container.find('input').classes()).toContain('baz');

        expect(container.find('label').attributes().for).toBe('e-mail');
        expect(container.find('input').attributes().id).toBe('e-mail');
        expect(container.find('input').attributes().type).toBe('email');
    });
});
