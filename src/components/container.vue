<template>
    <wrapper
        v-if="field.group || field.row"
        :options="field.group || field.row"
        :field="field"
    >
        <container
            v-for="(value, index) in (field.group ? field.group.fields : field.row.fields)"

            :key="index"
            :form-options="formOptions"
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
            :form-options="options"
            :is="fieldType"
            :model="model"
            :schema="field"

            @model-updated="modelUpdated"
        />
    </wrapper>
</template>

<script>

import merge from 'lodash/merge';
import {getFieldId, getOptionsByType, parseObj} from '../utils/helpers';
import wrapper from './wrapper.vue';

export default {
    name: 'container',

    components: {
        wrapper
    },

    props: {
        formOptions: {
            type: Object,
            default: () => {}
        },

        model: {
            type: Object,
            default: () => {}
        },

        schema: {
            type: Object,
            default: () => {}
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
                return merge(this.options.group, this.schemaParsed);
            }

            if (this.schemaParsed.row) {
                return merge(this.options.row, this.schemaParsed);
            }

            let field = merge(this.options.schema, this.schemaParsed);

            field.id = getFieldId(this.schemaParsed, this.options);
            field.type = String(field.type).toLowerCase();
            field.inputType = String(field.inputType).toLowerCase();

            return merge({}, field, this.getOptions(field), this.schemaParsed);
        },

        fieldType() {
            return `field-${this.field.type}`;
        },

        options() {
            const options = parseObj(this.formOptions, [this]);
            const defaultTheme = parseObj(this.$vfg.themeDefault, [this]);

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
            } else if (this.$vfg.options.theme) {
                themeDefault = this.getTheme(this.$vfg.options.theme, options);
            }

            return merge({}, defaultTheme, themeDefault, optionsTheme, options, schemaTheme);
        }
    },

    created() {
        if (this.field.row || this.field.group) {
            return;
        }

        const component = this.options.fields[this.field.type];

        if (component) {
            this.$options.components[this.fieldType] = component;
        }
    },

    methods: {
        getOptions(field) {
            let options = getOptionsByType(field, this.options);

            if (this.isGroup && this.options.group) {
                options = merge(options, getOptionsByType(field, this.options.group));
            }

            if (this.isRow && this.options.row) {
                options = merge(options, getOptionsByType(field, this.options.row));
            }

            if (field.horizontal) {
                options = merge(options, getOptionsByType(field, this.options.horizontal), field.horizontal);
            }

            if (field.custom) {
                let config = this.options.custom;

                if (field.horizontal && this.options.horizontal.custom) {
                    config = this.options.horizontal.custom;
                }

                options = merge(options, getOptionsByType(field, config), field.custom);
            }

            return options;
        },

        getTheme(theme, options) {
            let obj = {};

            if (this.$vfg.hasTheme(theme)) {
                obj = merge(obj, parseObj(this.$vfg.getTheme(theme), [this]));
            }

            if (options[theme]) {
                obj = merge(obj, options[theme]);
            }

            return obj;
        },

        modelUpdated($this, newValue, oldValue) {
            this.$emit('model-updated', $this, newValue, oldValue);
        }
    }
};

</script>
