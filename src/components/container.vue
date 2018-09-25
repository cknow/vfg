<template>
    <wrapper
        v-if="field.group || field.row"
        :options="field.group || field.row"
        :field="field"
    >
        <container
            v-for="(value, index) in (field.group ? field.group.fields : field.row.fields)"

            :key="index"
            :options="options"
            :model="model"
            :schema="value"
            :is-group="Boolean(field.group)"
            :is-row="Boolean(field.row)"
        />
    </wrapper>
    <wrapper
        v-else
        :options="field.wrapper"
        :field="field"
    >
        <component
            :form-options="config"
            :is="fieldType"
            :model="model"
            :schema="field"

            @model-updated="onModelUpdated"
        />
    </wrapper>
</template>

<script>

import merge from 'lodash/merge';
import { getFieldId, getOptionsByType, parseObj } from '../utils/helpers';
import wrapper from './wrapper.vue';

export default {
    name: 'container',

    components: {
        wrapper
    },

    props: {
        options: {
            type: Object,
            default: () => ({})
        },

        model: {
            type: Object,
            default: () => ({})
        },

        schema: {
            type: Object,
            default: () => ({})
        },

        isGroup: {
            type: Boolean,
            default: false
        },

        isRow: {
            type: Boolean,
            default: false
        }
    },

    computed: {
        schemaParsed() {
            return parseObj(this.schema, [this]);
        },

        field() {
            if (this.schemaParsed.group) {
                return merge(this.config.group, this.schemaParsed);
            }

            if (this.schemaParsed.row) {
                return merge(this.config.row, this.schemaParsed);
            }

            let field = merge(this.config.schema, this.schemaParsed);

            field.id = getFieldId(this.schemaParsed, this.config);
            field.type = String(field.type || 'input').toLowerCase();
            field.inputType = String(field.inputType || 'text').toLowerCase();
            field.wrapper = field.wrapper || { enabled: true };

            return merge({}, field, this.getOptions(field), this.schemaParsed);
        },

        fieldType() {
            return `field-${this.field.type}`;
        },

        config() {
            const options = parseObj(this.options, [this]);
            const defaultTheme = this.$vfg ? parseObj(this.$vfg.themeDefault, [this]) : {};

            if (this.schemaParsed.theme === null || this.schemaParsed.theme === false) {
                return merge({}, defaultTheme, options);
            }

            let optionsTheme = {};
            let schemaTheme = {};
            let themeDefault = {};

            if (this.schemaParsed.theme) {
                schemaTheme = this.getTheme(this.schemaParsed.theme, options);
            } else if (options.theme) {
                optionsTheme = this.getTheme(options.theme, options);
            } else if (this.$vfg && this.$vfg.options.theme) {
                themeDefault = this.getTheme(this.$vfg.options.theme, options);
            }

            return merge({}, defaultTheme, themeDefault, optionsTheme, options, schemaTheme);
        }
    },

    created() {
        if (this.field.group || this.field.row) {
            return;
        }

        const component = this.config.fields ? this.config.fields[this.field.type] : null;

        if (component) {
            this.$options.components[this.fieldType] = component;
        }
    },

    methods: {
        getOptions(field) {
            let options = getOptionsByType(field, this.config);

            if (this.isGroup && this.config.group) {
                options = merge(options, getOptionsByType(field, this.config.group));
            }

            if (this.isRow && this.config.row) {
                options = merge(options, getOptionsByType(field, this.config.row));
            }

            if (field.horizontal) {
                options = merge(options, getOptionsByType(field, this.config.horizontal), field.horizontal);
            }

            if (field.custom) {
                let config = this.config.custom;

                if (field.horizontal && this.config.horizontal && this.config.horizontal.custom) {
                    config = this.config.horizontal.custom;
                }

                options = merge(options, getOptionsByType(field, config), field.custom);
            }

            return options;
        },

        getTheme(theme, options) {
            let obj = {};

            if (this.$vfg && this.$vfg.hasTheme(theme)) {
                obj = merge(obj, parseObj(this.$vfg.getTheme(theme), [this]));
            }

            if (options[theme]) {
                obj = merge(obj, options[theme]);
            }

            return obj;
        },

        onModelUpdated($this, newValue, oldValue) {
            this.$emit('model-updated', $this, newValue, oldValue);
        }
    }
};

</script>
