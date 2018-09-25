<template>
    <component
        v-if="config.wrapper && isEnabled(config)"

        :class="config.classes"
        :is="config.tag || 'div'"
        :for="config.id"

        v-bind="config.attrs"
        v-on="config.events"
    >
        <wrapper
            v-for="(p, index) in config.prepend"
            v-if="isEnabled(p)"

            :key="'p'+index"
            :options="p"
            :field="field"
        />
        <wrapper
            v-for="(option, index) in config.wrapper"
            v-if="option && isEnabled(option)"

            :key="index"
            :options="option"
            :field="field"
        >
            <slot />
        </wrapper>
        <slot v-else />
        <wrapper
            v-for="(a, index) in config.append"
            v-if="isEnabled(a)"

            :key="'a'+index"
            :options="a"
            :field="field"
        />
    </component>
    <component
        v-else-if="config.html && isEnabled(config) && !(config.prepend || config.append)"

        :class="config.classes"
        :is="config.tag || 'div'"
        :for="config.id"

        v-bind="config.attrs"
        v-on="config.events"
        v-html="config.html"
    />
    <component
        v-else-if="config.text && isEnabled(config) && !(config.prepend || config.append)"

        :class="config.classes"
        :is="config.tag || 'div'"
        :for="config.id"

        v-bind="config.attrs"
        v-on="config.events"
        v-text="config.text"
    />
    <component
        v-else-if="isEnabled(config)"

        :class="config.classes"
        :is="config.tag || 'div'"
        :for="config.id"

        v-bind="config.attrs"
        v-on="config.events"
    >
        <wrapper
            v-for="(p, index) in config.prepend"
            v-if="isEnabled(p)"

            :key="'p'+index"
            :options="p"
            :field="field"
        />
        <slot />
        <wrapper
            v-for="(a, index) in config.append"
            v-if="isEnabled(a)"

            :key="'a'+index"
            :options="a"
            :field="field"
        />
    </component>
</template>

<script>

import merge from 'lodash/merge';
import isFunction from 'lodash/isFunction';

export default {
    name: 'wrapper',

    props: {
        options: {
            type: Object,
            default: () => ({})
        },

        field: {
            type: Object,
            default: () => ({})
        }
    },

    computed: {
        config() {
            let config = this.options;

            if (!this.isLabelOrLegend(config)) {
                return config;
            }

            const tag = this.getTagConfig(config);

            return merge(tag, config, {
                enabled: config.enabled && Boolean(tag.text || tag.html)
            });
        }
    },

    methods: {
        isEnabled(obj) {
            if (isFunction(obj.enabled)) {
                return obj.enabled.call(this, obj);
            }

            return obj.enabled;
        },

        isLabelOrLegend(config) {
            return config.isLabel || config.tag === 'label' || config.isLegend || config.tag === 'legend';
        },

        getTagConfig(config) {
            const tagName = config.isLegend || config.tag === 'legend' ? 'legend' : 'label';

            return {
                id: this.field.id,
                text: this.field[tagName],
                html: this.field[`${tagName}Html`]
            };
        }
    }
};

</script>
