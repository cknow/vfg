import VfgComponent from './components/vfg.vue';
import defaults from './defaults';

export default (Vue, options = {}) => {
    const defaultOptions = {
        name: 'vfg'
    };

    const vfg = new Vue({
        data: {
            options: Object.assign(defaultOptions, options),
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
                for (let [name, config] of Object.entries(themes)) {
                    this.addTheme(name, config);
                }
            },

            getTheme(name) {
                if (!this.hasTheme(name)) {
                    return {};
                }

                return this.themes[name];
            },

            hasTheme(name) {
                return Object.keys(this.themes).includes(name);
            }
        }
    });

    Vue.$vfg = vfg;
    Vue.prototype.$vfg = vfg;
    Vue.component(vfg.options.name, VfgComponent);
};
