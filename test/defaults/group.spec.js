import { mount, createLocalVue } from '@vue/test-utils';

import Vfg from '@/components/vfg';
import install from '@/install';

describe('defaults -> group', () => {
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

    describe('with default', () => {
        beforeEach(() => {
            wrapper.setProps({
                schema: [{
                    legend: 'Legend',
                    group: {
                        fields: [{
                            label: 'Name'
                        }, {
                            label: 'E-mail',
                            inputType: 'email'
                        }]
                    }
                }]
            });
        });

        test('check elements length', () => {
            expect(wrapper.exists()).toBe(true);
            expect(wrapper.is('div')).toBe(true);
            expect(wrapper.findAll('fieldset')).toHaveLength(1);
            expect(wrapper.findAll('fieldset>legend')).toHaveLength(1);
            expect(wrapper.findAll('fieldset>div>input')).toHaveLength(2);
            expect(wrapper.findAll('fieldset>div>label')).toHaveLength(2);
        });

        test('check header', () => {
            expect(wrapper.find('fieldset').exists()).toBe(true);
            expect(wrapper.find('fieldset>legend').exists()).toBe(true);
            expect(wrapper.find('fieldset>legend').text()).toBe('Legend');
        });

        test('check name field', () => {
            const container = wrapper.findAll('fieldset>div').at(0);

            expect(container.exists()).toBe(true);
            expect(container.is('div')).toBe(true);

            expect(container.find('label').exists()).toBe(true);
            expect(container.find('input').exists()).toBe(true);

            expect(container.find('label').attributes().for).toBe('name');
            expect(container.find('input').attributes().id).toBe('name');
            expect(container.find('input').attributes().type).toBe('text');
        });

        test('check email field', () => {
            const container = wrapper.findAll('fieldset>div').at(1);

            expect(container.exists()).toBe(true);
            expect(container.is('div')).toBe(true);

            expect(container.find('label').exists()).toBe(true);
            expect(container.find('input').exists()).toBe(true);

            expect(container.find('label').attributes().for).toBe('e-mail');
            expect(container.find('input').attributes().id).toBe('e-mail');
            expect(container.find('input').attributes().type).toBe('email');
        });
    });

    describe('with custom', () => {
        beforeEach(() => {
            wrapper.setProps({
                schema: [{
                    group: {
                        tag: 'ul',
                        fields: [{
                            label: 'Name',
                            wrapper: {
                                tag: 'li'
                            }
                        }, {
                            label: 'E-mail',
                            inputType: 'email',
                            wrapper: {
                                tag: 'li'
                            }
                        }]
                    }
                }]
            });
        });

        test('check elements length', () => {
            expect(wrapper.exists()).toBe(true);
            expect(wrapper.is('div')).toBe(true);
            expect(wrapper.findAll('ul')).toHaveLength(1);
            expect(wrapper.findAll('ul>li')).toHaveLength(2);
            expect(wrapper.findAll('ul>li>input')).toHaveLength(2);
            expect(wrapper.findAll('ul>li>label')).toHaveLength(2);
        });

        test('check name field', () => {
            const container = wrapper.findAll('ul>li').at(0);

            expect(container.exists()).toBe(true);
            expect(container.is('li')).toBe(true);

            expect(container.find('label').exists()).toBe(true);
            expect(container.find('input').exists()).toBe(true);

            expect(container.find('label').attributes().for).toBe('name');
            expect(container.find('input').attributes().id).toBe('name');
            expect(container.find('input').attributes().type).toBe('text');
        });

        test('check email field', () => {
            const container = wrapper.findAll('ul>li').at(1);

            expect(container.exists()).toBe(true);
            expect(container.is('li')).toBe(true);

            expect(container.find('label').exists()).toBe(true);
            expect(container.find('input').exists()).toBe(true);

            expect(container.find('label').attributes().for).toBe('e-mail');
            expect(container.find('input').attributes().id).toBe('e-mail');
            expect(container.find('input').attributes().type).toBe('email');
        });
    });
});
