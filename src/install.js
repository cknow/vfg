import forEach from 'lodash/forEach';
import keys from 'lodash/keys';
import merge from 'lodash/merge';

import VfgComponent from './components/vfg.vue';
import defaults from './defaults';

export default (Vue, options = {}) => {
    const defaultOptions = {
        name: 'vfg'
    };

    const vfg = new Vue({
        data: {
            options: merge(defaultOptions, options),
            themes: {},
            themeDefault: defaults
        },

        created() {
            this.addThemes(this.options.themes || {});
        },

        methods: {
            addTheme(name, config) {
                if (!this.hasTheme(name)) {
                    this.themes[name] = config;
                }
            },

            addThemes(themes) {
                forEach(themes, function(config, name) {
                    this.addTheme(name, config);
                }.bind(this));
            },

            getTheme(name) {
                if (!this.hasTheme(name)) {
                    return {};
                }

                return this.themes[name];
            },

            hasTheme(name) {
                return keys(this.themes).includes(name);
            }
        }
    });

    Vue.$vfg = vfg;
    Vue.prototype.$vfg = vfg;
    Vue.component(vfg.options.name, VfgComponent);
};
