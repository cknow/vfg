<template>

    <select
        :class="schema.classes"
        :id="schema.id"
        :autofocus="schema.autofocus"
        :disabled="schema.disabled"
        :form="schema.form"
        :multiple="schema.multiple"
        :name="schema.name"
        :required="schema.required"
        :size="schema.size"

        v-bind="schema.attrs"
        v-model="value"
        v-on="schema.events"

        @blur="onBlur"
        @change="onChange"
    >
        <option
            v-if="!config.noneSelectedText.hide"

            :class="config.noneSelectedText.class"
            :disabled="config.noneSelectedText.disabled"
            :value="config.noneSelectedText.value"

            v-bind="config.noneSelectedText.attrs"
            v-text="config.noneSelectedText.name"
        />
        <template v-for="(item, index) in items">
            <optgroup
                v-if="item.options"

                :class="item.class"
                :disabled="item.disabled"
                :key="'optgroup'+index"
                :label="item.name"

                v-bind="item.attrs"
            >
                <option
                    v-for="(option, key) in item.options"

                    :class="option.class"
                    :disabled="option.disabled"
                    :key="'optgroup'+index+'option'+key"
                    :value="option.value"

                    v-bind="option.attrs"
                    v-text="option.name"
                />
            </optgroup>
            <option
                v-else

                :class="item.class"
                :disabled="item.disabled"
                :key="'option'+index"
                :value="item.value"

                v-bind="item.attrs"
                v-text="item.name"
            />
        </template>
    </select>

</template>

<script>

import isObject from 'lodash/isObject';
import merge from 'lodash/merge';
import Base from './base';

export default {
    mixins: [Base],

    computed: {
        config() {
            return merge({
                optionsKey: {
                    value: 'id',
                    name: 'name'
                },
                noneSelectedText: {
                    disabled: this.schema.required,
                    value: null,
                    name: '---'
                }
            }, this.schema.config);
        },

        items() {
            const items = Array.isArray(this.schema.items) ? this.schema.items : [];
            const result = [];

            items.forEach(item => {
                if (isObject(item)) {
                    const {name, value} = merge(this.config.optionsKey, {});
                    let options = null;

                    if (Array.isArray(item.options)) {
                        options = [];

                        item.options.forEach(option => {
                            if (isObject(option)) {
                                options.push({
                                    name: option[name],
                                    value: option[value],
                                    attrs: option.attrs,
                                    class: option.class,
                                    disabled: option.disabled
                                });
                            } else {
                                options.push({
                                    name: option,
                                    value: option
                                });
                            }
                        });
                    }

                    result.push({
                        name: item[name],
                        value: item[value],
                        attrs: item.attrs,
                        class: item.class,
                        disabled: item.disabled,
                        options
                    });
                } else {
                    result.push({
                        name: item,
                        value: item
                    });
                }
            });

            return result;
        }
    }
};

</script>
