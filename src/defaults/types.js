const type1 = {
    wrapper: {
        prepend: {
            label: {
                enabled: false
            }
        },
        append: {
            label: {
                enabled: true
            }
        }
    }
};

const type2 = {
    wrapper: {
        prepend: {
            label: {
                enabled: false
            }
        },
        append: {
            label: {
                enabled: false
            }
        }
    }
};

export default {
    checkbox: type1,
    radio: type1,
    button: type2,
    image: type2,
    submit: type2
};
