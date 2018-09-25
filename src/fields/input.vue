<template>

    <input
        :class="schema.classes"
        :id="schema.id"
        :accept="schema.accept"
        :align="schema.align"
        :alt="schema.alt"
        :autocomplete="schema.autocomplete"
        :autofocus="schema.autofocus"
        :dirname="schema.dirname"
        :disabled="schema.disabled"
        :form="schema.form"
        :formaction="schema.formaction"
        :formenctype="schema.formenctype"
        :formmethod="schema.formmethod"
        :formnovalidate="schema.formnovalidate"
        :formtarget="schema.formtarget"
        :height="schema.height"
        :list="schema.list"
        :max="schema.max"
        :maxlength="schema.maxlength"
        :min="schema.min"
        :multiple="schema.multiple"
        :name="schema.name"
        :pattern="schema.pattern"
        :placeholder="schema.placeholder"
        :readonly="schema.readonly"
        :required="schema.required"
        :size="schema.size"
        :src="schema.src"
        :step="schema.step"
        :type="schema.inputType"
        :value="schema.value"
        :width="schema.width"

        v-bind="schema.attrs"
        v-model="value"
        v-on="schema.events"

        @blur="onEvent"
        @change="onEvent"
        @focus="onEvent"
        @input="onEvent"
    >

</template>

<script>

import base from './base';

export default {
    mixins: [base]
};

</script>
