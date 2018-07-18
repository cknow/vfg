import isFunction from 'lodash/isFunction';
import upperFirst from 'lodash/upperFirst';

export default {
    props: {
        formOptions: Object,
        model: Object,
        schema: Object
    },

    computed: {
        value: {
            get() {
                let val;

                if (isFunction(this.schema.get)) {
                    val = this.schema.get.call(null, this);
                } else if (this.model && this.schema.model) {
                    val = this.model[this.schema.model];
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
                this.schema[`on${eventName}`].call(null, this, $event);
            }
        },

        updateModelValue(newValue, oldValue) {
            let changed = false;

            if (isFunction(this.schema.set)) {
                this.schema.set.call(null, this, newValue, oldValue);
                changed = true;
            } else if (this.schema.model) {
                this.setModelValueByPath(this.schema.model, newValue);
                changed = true;
            }

            if (changed) {
                this.$emit('model-updated', this, newValue, oldValue);

                if (isFunction(this.schema.onChanged)) {
                    this.schema.onChanged.call(null, this, newValue, oldValue);
                }
            }
        },

        setModelValueByPath(path, value) {
            let s = path.replace(/\[(\w+)\]/g, '$1').replace(/^\./, '');
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
