import merge from 'lodash/merge';
import kebabCase from 'lodash/kebabCase';
import isObject from 'lodash/isObject';
import isFunction from 'lodash/isFunction';
import startsWith from 'lodash/startsWith';
import mapValues from 'lodash/mapValues';

export function parseObj(obj, args = []) {
    return mapValues(obj, (value, key) => {
        if (startsWith(key, 'on') || ['events', 'get', 'set', 'fields'].includes(key)) {
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

export function getFieldId(schema, options) {
    const prefix = String(options.id || options.name || options.prefix || '');
    let id = schema.label || schema.model || schema.name;

    if (schema.id) {
        id = schema.id;
    }

    return id ? kebabCase(prefix + id) : null;
}

export function getOptionsByType(field, options) {
    let obj = {};

    if (!options) {
        return obj;
    }

    if (options.schema) {
        obj = merge(obj, options.schema);
    }

    if (!options.types) {
        return obj;
    }

    if (options.types[field.type]) {
        obj = merge(obj, options.types[field.type]);
    }

    if (options.types[field.inputType]) {
        obj = merge(obj, options.types[field.inputType]);
    }

    return obj;
}
