import install from './install';

const vfg = {
    install
};

/* eslint-disable no-undef */
/* istanbul ignore next */
if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(vfg);
}
/* eslint-enable no-undef */

export default vfg;
