import { mount, createLocalVue } from '@vue/test-utils';

import Vfg from '@/components/vfg';
import install from '@/install';

describe('defaults -> schema', () => {
    let localVue;
    let wrapper;

    beforeAll(() => {
        localVue = createLocalVue();
        localVue.use(install);

        wrapper = mount(Vfg, {
            localVue,
            propsData: {
                schema: [{
                    label: 'Name',
                    wrapper: {
                        append: {
                            small: {
                                enabled: true,
                                tag: 'small',
                                text: 'Full name'
                            }
                        }
                    }
                }, {
                    label: 'E-mail',
                    inputType: 'email',
                    wrapper: {
                        prepend: {
                            small: {
                                enabled: true,
                                tag: 'span',
                                text: 'E-mail address'
                            }
                        }
                    }
                }]
            }
        });
    });

    test('check elements length', () => {
        expect(wrapper.exists()).toBe(true);
        expect(wrapper.is('div')).toBe(true);
        expect(wrapper.findAll('div>div')).toHaveLength(2);
        expect(wrapper.findAll('div>div>label')).toHaveLength(2);
        expect(wrapper.findAll('div>div>input')).toHaveLength(2);
        expect(wrapper.findAll('div>div>span')).toHaveLength(1);
        expect(wrapper.findAll('div>div>small')).toHaveLength(1);
    });

    test('check name field', () => {
        const container = wrapper.findAll('div>div').at(0);

        expect(container.exists()).toBe(true);
        expect(container.is('div')).toBe(true);

        expect(container.find('label').exists()).toBe(true);
        expect(container.find('label').attributes().for).toBe('name');
        expect(container.find('label').text()).toBe('Name');

        expect(container.find('input').exists()).toBe(true);
        expect(container.find('input').attributes().id).toBe('name');
        expect(container.find('input').attributes().type).toBe('text');

        expect(container.find('span').exists()).toBe(false);
        expect(container.find('small').exists()).toBe(true);
        expect(container.find('small').text()).toBe('Full name');
    });

    test('check email field', () => {
        const container = wrapper.findAll('div>div').at(1);

        expect(container.exists()).toBe(true);
        expect(container.is('div')).toBe(true);

        expect(container.find('label').exists()).toBe(true);
        expect(container.find('label').attributes().for).toBe('e-mail');
        expect(container.find('label').text()).toBe('E-mail');

        expect(container.find('input').exists()).toBe(true);
        expect(container.find('input').attributes().id).toBe('e-mail');
        expect(container.find('input').attributes().type).toBe('email');

        expect(container.find('small').exists()).toBe(false);
        expect(container.find('span').exists()).toBe(true);
        expect(container.find('span').text()).toBe('E-mail address');
    });
});
