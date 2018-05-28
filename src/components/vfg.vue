<template>
    <div v-if="hasSchema">
        <container
            v-for="(field, index) in schema"

            :key="index"
            :form-options="formOptions"
            :model="model"
            :schema="field"

            @model-updated="modelUpdated"
        />
    </div>
</template>

<script>

import container from './container.vue';

export default {
    components: {
        container
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
            type: Array,
            default: () => []
        }
    },

    computed: {
        hasSchema() {
            return this.schema && this.schema.length > 0;
        }
    },

    methods: {
        modelUpdated($this, newValue, oldValue) {
            this.$emit('model-updated', $this, newValue, oldValue);
        }
    }
};

</script>
