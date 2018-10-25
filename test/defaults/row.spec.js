import { mount, createLocalVue } from '@vue/test-utils';

import Vfg from '@/components/vfg';
import install from '@/install';

describe('defaults -> row', () => {
    let localVue;
    let wrapper;

    beforeAll(() => {
        localVue = createLocalVue();
        localVue.use(install);

        wrapper = mount(Vfg, {
            localVue,
            propsData: {
                schema: [{
                    row: {
                        classes: {
                            row: true
                        },
                        fields: [{
                            label: 'Name'
                        }, {
                            label: 'E-mail',
                            inputType: 'email'
                        }]
                    }
                }]
            }
        });
    });

    test('check elements length', () => {
        expect(wrapper.exists()).toBe(true);
        expect(wrapper.is('div')).toBe(true);
        expect(wrapper.find('div>div').exists()).toBe(true);
        expect(wrapper.find('div>div').classes()).toContain('row');
        expect(wrapper.findAll('div>.row>div>label')).toHaveLength(2);
        expect(wrapper.findAll('div>.row>div>input')).toHaveLength(2);
    });

    test('check name field', () => {
        const container = wrapper.findAll('.row>div').at(0);

        expect(container.exists()).toBe(true);
        expect(container.is('div')).toBe(true);

        expect(container.find('label').exists()).toBe(true);
        expect(container.find('label').attributes().for).toBe('name');
        expect(container.find('label').text()).toBe('Name');

        expect(container.find('input').exists()).toBe(true);
        expect(container.find('input').attributes().id).toBe('name');
        expect(container.find('input').attributes().type).toBe('text');
    });

    test('check email field', () => {
        const container = wrapper.findAll('.row>div').at(1);

        expect(container.exists()).toBe(true);
        expect(container.is('div')).toBe(true);

        expect(container.find('label').exists()).toBe(true);
        expect(container.find('label').attributes().for).toBe('e-mail');
        expect(container.find('label').text()).toBe('E-mail');

        expect(container.find('input').exists()).toBe(true);
        expect(container.find('input').attributes().id).toBe('e-mail');
        expect(container.find('input').attributes().type).toBe('email');
    });
});
