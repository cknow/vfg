import { mount, createLocalVue } from '@vue/test-utils';

import Vfg from '@/components/vfg';
import install from '@/install';

describe('defaults -> types', () => {
    let localVue;
    let wrapper;

    beforeAll(() => {
        localVue = createLocalVue();
        localVue.use(install);

        wrapper = mount(Vfg, {
            localVue,
            propsData: {
                schema: [{
                    label: 'Checkbox',
                    inputType: 'checkbox'
                }, {
                    label: 'Radio',
                    inputType: 'radio'
                }, {
                    label: 'Button',
                    inputType: 'button'
                }, {
                    label: 'Image',
                    inputType: 'image'
                }, {
                    label: 'Submit',
                    inputType: 'submit'
                }]
            }
        });
    });

    test('check elements length', () => {
        expect(wrapper.exists()).toBe(true);
        expect(wrapper.is('div')).toBe(true);
        expect(wrapper.findAll('div>div')).toHaveLength(5);
        expect(wrapper.findAll('div>div>label')).toHaveLength(2);
        expect(wrapper.findAll('div>div>input')).toHaveLength(5);
    });

    test('check checkbox field', () => {
        const container = wrapper.findAll('div>div').at(0);

        expect(container.exists()).toBe(true);
        expect(container.is('div')).toBe(true);

        expect(container.find('label').exists()).toBe(true);
        expect(container.find('label').attributes().for).toBe('checkbox');
        expect(container.find('label').text()).toBe('Checkbox');

        expect(container.find('input').exists()).toBe(true);
        expect(container.find('input').attributes().id).toBe('checkbox');
        expect(container.find('input').attributes().type).toBe('checkbox');
    });

    test('check radio field', () => {
        const container = wrapper.findAll('div>div').at(1);

        expect(container.exists()).toBe(true);
        expect(container.is('div')).toBe(true);

        expect(container.find('label').exists()).toBe(true);
        expect(container.find('label').attributes().for).toBe('radio');
        expect(container.find('label').text()).toBe('Radio');

        expect(container.find('input').exists()).toBe(true);
        expect(container.find('input').attributes().id).toBe('radio');
        expect(container.find('input').attributes().type).toBe('radio');
    });

    test('check button field', () => {
        const container = wrapper.findAll('div>div').at(2);

        expect(container.exists()).toBe(true);
        expect(container.is('div')).toBe(true);

        expect(container.find('label').exists()).toBe(false);

        expect(container.find('input').exists()).toBe(true);
        expect(container.find('input').attributes().type).toBe('button');
    });

    test('check image field', () => {
        const container = wrapper.findAll('div>div').at(3);

        expect(container.exists()).toBe(true);
        expect(container.is('div')).toBe(true);

        expect(container.find('label').exists()).toBe(false);

        expect(container.find('input').exists()).toBe(true);
        expect(container.find('input').attributes().type).toBe('image');
    });

    test('check submit field', () => {
        const container = wrapper.findAll('div>div').at(4);

        expect(container.exists()).toBe(true);
        expect(container.is('div')).toBe(true);

        expect(container.find('label').exists()).toBe(false);

        expect(container.find('input').exists()).toBe(true);
        expect(container.find('input').attributes().type).toBe('submit');
    });
});
