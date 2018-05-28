import install from './install';

const vfg = {
    install
};

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(vfg);
}

export default vfg;
