# Vue Form Generator

[![NPM Version](https://img.shields.io/npm/v/@cknow/vfg.svg)](https://www.npmjs.com/package/@cknow/vfg)
[![Downloads](https://img.shields.io/npm/dt/@cknow/vfg.svg)](https://www.npmjs.com/package/@cknow/vfg)
[![MIT License](https://img.shields.io/npm/l/@cknow/vfg.svg)](LICENSE)

[![Build Status](https://travis-ci.org/cknow/vfg.svg?branch=master)](https://travis-ci.org/cknow/vfg)
[![Build status](https://ci.appveyor.com/api/projects/status/glujrtfpgcn09uvj/branch/master?svg=true)](https://ci.appveyor.com/project/cknow/vfg/branch/master)
[![Coverage Status](https://coveralls.io/repos/github/cknow/vfg/badge.svg?branch=master)](https://coveralls.io/github/cknow/vfg?branch=master)

[![Code Climate](https://codeclimate.com/github/cknow/vfg/badges/gpa.svg)](https://codeclimate.com/github/cknow/vfg)
[![Test Coverage](https://codeclimate.com/github/cknow/vfg/badges/coverage.svg)](https://codeclimate.com/github/cknow/vfg/coverage)
[![Issue Count](https://codeclimate.com/github/cknow/vfg/badges/issue_count.svg)](https://codeclimate.com/github/cknow/vfg)

[![Dependencies Status](https://david-dm.org/cknow/vfg/status.svg)](https://david-dm.org/cknow/vfg)
[![devDependencies Status](https://david-dm.org/cknow/vfg/dev-status.svg)](https://david-dm.org/cknow/vfg?type=dev)
[![peerDependencies Status](https://david-dm.org/cknow/vfg/peer-status.svg)](https://david-dm.org/cknow/vfg?type=peer)

[![Semantic Release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Average time to resolve an issue](http://isitmaintained.com/badge/resolution/cknow/vfg.svg)](http://isitmaintained.com/project/cknow/vfg)
[![Percentage of issues still open](http://isitmaintained.com/badge/open/cknow/vfg.svg)](http://isitmaintained.com/project/cknow/vfg)
[![Gitter](https://badges.gitter.im/cknow/vfg.svg)](https://gitter.im/cknow/vfg?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)

## Install

```bash
npm install --save @cknow/vfg
```

## Usage

In the example below will be generated dry fields, that is, without style.

```html
<template>
    <vfg :model="model" :schema="schema"></vfg>
</template>

<script>

import vfg from '@cknow/vfg';

Vue.use(vfg);

export default {
    data: {
        model: {
            name: 'Your name',
            subject: 'Option 1'
        },
        schema: [{
            // input text is default
            label: 'Name',
            model: 'name'
        },{
            type: 'select',
            label: 'Subject',
            model: 'subject',
            items: ['Option 1', 'Option 2', 'Option 3']
        },{
            type: 'textarea',
            label: 'Message',
            model: 'message'
        }]
    }
}

</script>
```

## Fields

Available fields

### Input

```js
...
schema: [
    {
        type: 'input',
        inputType: 'INPUT_TYPE',
        class: ['foo', 'bar'],
        id: 'fieldID',
        enabled: true,
        autocomplete: false,
        autofocus: false,
        disabled: false,
        max: 150,
        maxlength: 150,
        min: 50,
        name: 'fieldName',
        placeholder: 'Field Placeholder',
        readonly: false,
        required: true
        size: 50,
        step: 1,
        width: 80,

        // custom attrs
        attrs: {
            'data-foo': 'bar'
        },

        // events
        events: {
            click: 'clickHanlder'
        }
    }
]
....
```

Input type list:

- text
- email
- button
- checkbox
- color
- date
- datetime-local
- email
- file
- hidden
- image
- month
- number
- password
- radio
- range
- reset
- search
- submit
- tel
- text
- time
- url
- week

### Select

```js
...
schema: [
    {
        type: 'select',
        items: ['Option 1', 'Option 2', 'Option 3'],
        classes: ['foo', 'bar'],
        id: 'fieldId',
        enabled: true,
        autofocus: false,
        disabled: false,
        multiple: false,
        name: 'fieldName',
        required: true,

        // custom attrs
        attrs: {
            'data-foo': 'bar'
        },

        // events
        events: {
            click: 'clickHanlder'
        }
    },

    // with value and name
    {
        type: 'select',
        items: [{
            id: 1, // value
            name: 'Option 1' // name
        }, {
            id: 2, // value
            name: 'Option 2' // name
        }, {
            id: 3, // value
            name: 'Option 3' // name
        }]
    },

    // with optgroup
    {
        type: 'select',
        items: [{
            name: 'Option 1',
            options: [
                'Option 1-1',
                'Option 1-2',
                'Option 1-3'
            ]
        }, {
            name: 'Option 2',
            options: [
                'Option 2-1',
                'Option 2-2',
                'Option 2-3'
            ]
        }]
    }
]
....
```

### Textarea

```js
...
schema: [
    {
        type: 'textarea',
        classes: ['foo', 'bar'],
        id: 'fieldId',
        enabled: true,
        autofocus: false,
        cols: 80,
        disabled: false,
        maxlength: 500,
        name: 'fieldName',
        placeholder: 'Field Placeholder',
        readonly: false,
        required: true,
        rows: 5,

        // custom attrs
        attrs: {
            'data-foo': 'bar'
        },

        // events
        events: {
            click: 'clickHanlder'
        }
    }
]
....
```

## Theme

The big difference in this package is that we can use themes in a very simple way.

But do not worry, we already have the most well-known themes developed:

- [Bootstrap](https://github.com/cknow/vfg-theme-bootstrap)
- [Bulma](https://github.com/cknow/vfg-theme-bulma)
- [Materialize](https://github.com/cknow/vfg-theme-materialize)
- [Element](https://github.com/cknow/vfg-theme-element)
- [Vuetify](https://github.com/cknow/vfg-theme-vuetify)

### Theme usage

In the example below the fields will be generated with the style of **Bootstrap**:

> **Note:** Need to install the bootstrap theme.

```bash
npm install --save @cknow/vfg-theme-bootstrap
```

```html
<template>
    <vfg :options="options" :model="model" :schema="schema"></vfg>
</template>

<script>

import vfg from '@cknow/vfg';
import vfgThemeBootstrap from '@cknow/vfg-theme-bootstrap';

Vue.use(vfg);
Vue.use(vfgThemeBootstrap); // register bootstrap theme

export default {
    data: {
        options: {
            theme: 'bootstrap' // set theme
        },

        model: {
            ...
        },

        schema: [
            ...
        ]
    }
}

</script>
```

### Global theme

You can use a global theme, as in the example below:

```js
import vfg from '@cknow/vfg';

Vue.use(vfg, {
    theme: 'THEME_NAME'
});
```

### Advanced theme usage

You can also mix themes and styles if necessary. By placing the theme option in the field you want, you will see in example below:

> **Note:** Need to install the bootstrap and bulma theme.

```bash
npm install --save @cknow/vfg-theme-bootstrap
npm install --save @cknow/vfg-theme-bulma
```

```html
<template>
    <vfg :options="options" :schema="schema"></vfg>
</template>

<script>

import vfg from '@cknow/vfg';
import vfgThemeBootstrap from '@cknow/vfg-theme-bootstrap';
import vfgThemeBulma from '@cknow/vfg-theme-bulma';

Vue.use(vfg);
Vue.use(vfgThemeBootstrap); // register bootstrap theme
Vue.use(vfgThemeBulma); // register bulma theme

export default {
    data: {
        options: {
            // default theme is Bootstrap
            theme: 'bootstrap'
        },

        schema: [{
            label: 'Name with Bootstrap'
        },{
            theme: 'bulma' // set Bulma theme
            label: 'Name with Bulma'
        }]
    }
}

</script>
```
