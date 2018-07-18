<template>

    <textarea
        :class="schema.classes"
        :id="schema.id"
        :autofocus="schema.autofocus"
        :cols="schema.cols"
        :dirname="schema.dirname"
        :disabled="schema.disabled"
        :form="schema.form"
        :maxlength="schema.maxlength"
        :name="schema.name"
        :placeholder="schema.placeholder"
        :readonly="schema.readonly"
        :required="schema.required"
        :rows="schema.rows"
        :wrap="schema.wrap"

        v-bind="schema.attrs"
        v-model="value"
        v-on="schema.events"

        @blur="onEvent"
        @change="onEvent"
        @focus="onEvent"
        @input="onEvent"
    />

</template>

<script>

import Base from './base';

export default {
    mixins: [Base]
};

</script>
