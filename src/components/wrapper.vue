<template>
    <component
        v-if="config.wrapper && config.enabled"

        :class="config.classes"
        :is="config.tag || 'div'"
        :for="config.id"

        v-bind="config.attrs"
        v-on="config.events"
    >
        <wrapper
            v-for="(p, index) in config.prepend"
            v-if="p.enabled"

            :key="'p'+index"
            :options="p"
            :field="field"
        />
        <wrapper
            v-for="(option, index) in config.wrapper"
            v-if="option && option.enabled"

            :key="index"
            :options="option"
            :field="field"
        >
            <slot />
        </wrapper>
        <slot v-else />
        <wrapper
            v-for="(a, index) in config.append"
            v-if="a.enabled"

            :key="'a'+index"
            :options="a"
            :field="field"
        />
    </component>
    <component
        v-else-if="config.html && config.enabled"

        :class="config.classes"
        :is="config.tag || 'div'"
        :for="config.id"

        v-bind="config.attrs"
        v-on="config.events"
        v-html="config.html"
    />
    <component
        v-else-if="config.text && config.enabled"

        :class="config.classes"
        :is="config.tag || 'div'"
        :for="config.id"

        v-bind="config.attrs"
        v-on="config.events"
        v-text="config.text"
    />
    <component
        v-else-if="config.enabled"

        :class="config.classes"
        :is="config.tag || 'div'"
        :for="config.id"

        v-bind="config.attrs"
        v-on="config.events"
    >
        <wrapper
            v-for="(p, index) in config.prepend"
            v-if="p.enabled"

            :key="'p'+index"
            :options="p"
            :field="field"
        />
        <slot />
        <wrapper
            v-for="(a, index) in config.append"
            v-if="a.enabled"

            :key="'a'+index"
            :options="a"
            :field="field"
        />
    </component>
</template>

<script>

import merge from 'lodash/merge';

export default {
    name: 'wrapper',

    props: {
        options: {
            type: Object,
            default: () => {}
        },

        field: {
            type: Object,
            default: () => {}
        }
    },

    computed: {
        config() {
            let config = this.options || {};

            if (config.tag === 'label') {
                const label = {
                    id: this.field.id,
                    text: this.field.label,
                    html: this.field.labelHtml
                };

                config = merge(label, config, {
                    enabled: config.enabled && Boolean(label.text || label.html)
                });
            }

            return config;
        }
    }
};

</script>