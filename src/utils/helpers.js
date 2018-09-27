import merge from 'lodash/merge';
import kebabCase from 'lodash/kebabCase';
import isObject from 'lodash/isObject';
import isFunction from 'lodash/isFunction';
import startsWith from 'lodash/startsWith';
import mapValues from 'lodash/mapValues';

export function parseObj(obj = {}, args = []) {
    return mapValues(obj, (value, key) => {
        if (startsWith(key, 'on') || ['events', 'get', 'set', 'fields', 'items', 'enabled'].includes(key)) {
            return value;
        }

        if (isFunction(value)) {
            return value.apply(null, args);
        }

        if (isObject(value)) {
            return parseObj(value, args);
        }

        return value;
    });
}

export function getFieldId(schema = {}, options = {}) {
    const prefix = String(options.id || options.name || options.prefix || '');
    const id = String(schema.id || schema.model || schema.name || schema.label || '');

    return id ? kebabCase(prefix + id) : null;
}

export function getOptionsByType(field = {}, options) {
    let obj = {};

    if (!isObject(options)) {
        return obj;
    }

    if (options.schema) {
        obj = merge(obj, options.schema);
    }

    if (options.types && options.types[field.type]) {
        obj = merge(obj, options.types[field.type]);
    }

    if (options.types && options.types[field.inputType]) {
        obj = merge(obj, options.types[field.inputType]);
    }

    return obj;
}
