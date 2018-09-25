<template>
    <div v-if="hasSchema">
        <container
            v-for="(field, index) in schema"

            :key="index"
            :options="options"
            :model="model"
            :schema="field"

            @model-updated="onModelUpdated"
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
        options: {
            type: Object,
            default: () => ({})
        },

        model: {
            type: Object,
            default: () => ({})
        },

        schema: {
            type: Array,
            default: () => []
        }
    },

    computed: {
        hasSchema() {
            return this.schema.length > 0;
        }
    },

    methods: {
        onModelUpdated($this, newValue, oldValue) {
            this.$emit('model-updated', $this, newValue, oldValue);
        }
    }
};

</script>
