import install from './install';

const Vfg = {
    install
};

/* eslint-disable no-undef */
/* istanbul ignore next */
if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(Vfg);
}
/* eslint-enable no-undef */

export default Vfg;
