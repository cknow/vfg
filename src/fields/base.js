import isFunction from 'lodash/isFunction';
import upperFirst from 'lodash/upperFirst';
import objGet from 'lodash/get';

export default {
    props: {
        formOptions: {
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
        }
    },

    computed: {
        value: {
            get() {
                let val;

                if (isFunction(this.schema.get)) {
                    val = this.schema.get.call(this);
                } else if (this.model && this.schema.model) {
                    val = objGet(this.model, this.schema.model);
                } else if (this.schema.value) {
                    val = this.schema.value;
                }

                return this.formatValueToField(val);
            },

            set(newValue) {
                let oldValue = this.value;

                newValue = this.formatValueToModel(newValue);

                if (isFunction(newValue)) {
                    newValue.call(this, newValue, oldValue);
                } else {
                    this.updateModelValue(newValue, oldValue);
                }
            }
        }
    },

    methods: {
        onEvent($event) {
            const eventName = upperFirst($event.type);

            if (isFunction(this.schema[`on${eventName}`])) {
                this.schema[`on${eventName}`].call(this, $event);
            }
        },

        updateModelValue(newValue, oldValue) {
            if (isFunction(this.schema.set)) {
                this.schema.set.call(this, newValue, oldValue);
            } else if (this.model && this.schema.model) {
                this.setModelValueByPath(this.schema.model, newValue);
            }

            this.$emit('model-updated', this, newValue, oldValue);

            if (isFunction(this.schema.onChanged)) {
                this.schema.onChanged.call(this, newValue, oldValue);
            }
        },

        setModelValueByPath(path, value) {
            let s = path.replace(/\[(\w+)\]/gu, '$1').replace(/^\./u, '');
            let o = this.model;
            let i = 0;

            const a = s.split('.');
            const n = a.length;

            while (i < n) {
                let k = a[i];

                if (i < n - 1) {
                    if (o[k] === undefined) {
                        this.$root.$set(o, k, {});
                    }

                    o = o[k];
                } else {
                    this.$root.$set(o, k, value);

                    return;
                }

                ++i;
            }
        },

        formatValueToField(value) {
            return value;
        },

        formatValueToModel(value) {
            return value;
        }
    }
};
