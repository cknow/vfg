import { mount, createLocalVue } from '@vue/test-utils';
import container from '@/components/container';
import input from '@/fields/input';
import select from '@/fields/select';
import install from '@/install';

describe('components -> container', () => {
    let localVue;
    let wrapper;

    beforeAll(() => {
        localVue = createLocalVue();
        localVue.component('field-input', input);
        localVue.component('field-select', select);
    });

    beforeEach(() => {
        wrapper = mount(container, {
            localVue
        });
    });

    test('is a Vue instance', () => {
        expect(wrapper.isVueInstance()).toBeTruthy();
    });

    describe('field', () => {
        test('div around the input text by default', () => {
            expect(wrapper.exists()).toBe(true);
            expect(wrapper.is('div')).toBe(true);

            expect(wrapper.find('div>input').exists()).toBe(true);
            expect(wrapper.find('div>input').is('input')).toBe(true);
            expect(wrapper.find('div>input').attributes().type).toBe('text');
        });

        test('component prefix', () => {
            expect(wrapper.vm.fieldType).toBe('field-input');
        });

        test('input type defined in the schema', () => {
            wrapper.setProps({
                schema: {
                    inputType: 'range'
                }
            });

            expect(wrapper.find('input').exists()).toBe(true);
            expect(wrapper.find('input').attributes().type).toBe('range');
        });

        test('type defined in the schema', () => {
            wrapper.setProps({
                schema: {
                    type: 'select'
                }
            });

            expect(wrapper.find('select').exists()).toBe(true);
            expect(wrapper.vm.fieldType).toBe('field-select');
        });

        test('not exist when the type is not found', () => {
            wrapper.setProps({
                schema: {
                    type: 'not_found'
                }
            });

            expect(wrapper.find('not_found').exists()).toBe(false);
        });

        test('properties defined in schema', () => {
            wrapper.setProps({
                options: {
                    schema: {
                        classes: {
                            fieldInput: true
                        }
                    }
                }
            });

            expect(wrapper.find('input').exists()).toBe(true);
            expect(wrapper.find('input').classes()).toHaveLength(1);
            expect(wrapper.find('input').classes()).toContain('fieldInput');
        });

        test('properties defined in type', () => {
            wrapper.setProps({
                options: {
                    types: {
                        input: {
                            classes: {
                                fieldInput: true
                            }
                        }
                    }
                }
            });

            expect(wrapper.find('input').exists()).toBe(true);
            expect(wrapper.find('input').classes()).toHaveLength(1);
            expect(wrapper.find('input').classes()).toContain('fieldInput');
        });

        test('properties defined in input type', () => {
            wrapper.setProps({
                options: {
                    types: {
                        text: {
                            classes: {
                                fieldText: true
                            }
                        }
                    }
                }
            });

            expect(wrapper.find('input').exists()).toBe(true);
            expect(wrapper.find('input').classes()).toHaveLength(1);
            expect(wrapper.find('input').classes()).toContain('fieldText');
        });

        test('horizontal mode schema', () => {
            wrapper.setProps({
                options: {
                    horizontal: {
                        schema: {
                            classes: {
                                fieldHorizonal: true
                            }
                        }
                    }
                },
                schema: {
                    horizontal: true
                }
            });

            expect(wrapper.find('input').exists()).toBe(true);
            expect(wrapper.find('input').classes()).toHaveLength(1);
            expect(wrapper.find('input').classes()).toContain('fieldHorizonal');
        });

        test('horizontal mode by type', () => {
            wrapper.setProps({
                options: {
                    horizontal: {
                        types: {
                            input: {
                                classes: {
                                    fieldInputHorizonal: true
                                }
                            }
                        }
                    }
                },
                schema: {
                    horizontal: true
                }
            });

            expect(wrapper.find('input').exists()).toBe(true);
            expect(wrapper.find('input').classes()).toHaveLength(1);
            expect(wrapper.find('input').classes()).toContain('fieldInputHorizonal');
        });

        test('horizontal mode schema merged with by type', () => {
            wrapper.setProps({
                options: {
                    horizontal: {
                        schema: {
                            classes: {
                                fieldHorizonal: true
                            }
                        },
                        types: {
                            input: {
                                classes: {
                                    fieldInputHorizonal: true
                                }
                            }
                        }
                    }
                },
                schema: {
                    horizontal: true
                }
            });

            expect(wrapper.find('input').exists()).toBe(true);
            expect(wrapper.find('input').classes()).toHaveLength(2);
            expect(wrapper.find('input').classes()).toContain('fieldHorizonal');
            expect(wrapper.find('input').classes()).toContain('fieldInputHorizonal');
        });

        test('custom mode schema', () => {
            wrapper.setProps({
                options: {
                    custom: {
                        schema: {
                            classes: {
                                fieldCustom: true
                            }
                        }
                    }
                },
                schema: {
                    custom: true
                }
            });

            expect(wrapper.find('input').exists()).toBe(true);
            expect(wrapper.find('input').classes()).toHaveLength(1);
            expect(wrapper.find('input').classes()).toContain('fieldCustom');
        });

        test('horizontal mode and custom by schema', () => {
            wrapper.setProps({
                options: {
                    horizontal: {
                        custom: {
                            schema: {
                                classes: {
                                    fieldCustomHorizontal: true
                                }
                            }
                        }
                    }
                },
                schema: {
                    custom: true,
                    horizontal: true
                }
            });

            expect(wrapper.find('input').exists()).toBe(true);
            expect(wrapper.find('input').classes()).toHaveLength(1);
            expect(wrapper.find('input').classes()).toContain('fieldCustomHorizontal');
        });

        test('horizontal mode and custom by type', () => {
            wrapper.setProps({
                options: {
                    horizontal: {
                        custom: {
                            types: {
                                input: {
                                    classes: {
                                        fieldInputCustomHorizontal: true
                                    }
                                }
                            }
                        }
                    }
                },
                schema: {
                    custom: true,
                    horizontal: true
                }
            });

            expect(wrapper.find('input').exists()).toBe(true);
            expect(wrapper.find('input').classes()).toHaveLength(1);
            expect(wrapper.find('input').classes()).toContain('fieldInputCustomHorizontal');
        });

        test('horizontal mode and custom schema merged with by type', () => {
            wrapper.setProps({
                options: {
                    horizontal: {
                        custom: {
                            schema: {
                                classes: {
                                    fieldCustomHorizontal: true
                                }
                            },
                            types: {
                                input: {
                                    classes: {
                                        fieldInputCustomHorizontal: true
                                    }
                                }
                            }
                        }
                    }
                },
                schema: {
                    custom: true,
                    horizontal: true
                }
            });

            expect(wrapper.find('input').exists()).toBe(true);
            expect(wrapper.find('input').classes()).toHaveLength(2);
            expect(wrapper.find('input').classes()).toContain('fieldCustomHorizontal');
            expect(wrapper.find('input').classes()).toContain('fieldInputCustomHorizontal');
        });

        test('emit event when changed', () => {
            const eventName = 'model-updated';

            expect(wrapper.emitted()[eventName]).toBeFalsy();

            wrapper.find('input').setValue('foo');

            expect(wrapper.emitted()[eventName]).toBeTruthy();
            expect(wrapper.emitted()[eventName]).toHaveLength(1);
            expect(wrapper.emitted()[eventName][0][1]).toBe('foo');
            expect(wrapper.emitted()[eventName][0][2]).toBeUndefined();
        });
    });

    describe('group', () => {
        test('check exists', () => {
            wrapper.setProps({
                schema: {
                    group: {
                        enabled: true,
                        classes: {
                            group: true
                        }
                    }
                }
            });

            expect(wrapper.findAll('.group')).toHaveLength(1);
            expect(wrapper.find('.group').exists()).toBe(true);
            expect(wrapper.find('input').exists()).toBe(false);
        });

        test('properties defined in form options', () => {
            wrapper.setProps({
                options: {
                    group: {
                        group: {
                            classes: {
                                group: true
                            }
                        }
                    }
                },
                schema: {
                    group: {
                        enabled: true
                    }
                }
            });

            expect(wrapper.findAll('.group')).toHaveLength(1);
            expect(wrapper.find('.group').exists()).toBe(true);
        });

        test('one within the other', () => {
            wrapper.setProps({
                schema: {
                    group: {
                        enabled: true,
                        classes: {
                            group: true
                        },
                        fields: [
                            {
                                group: {
                                    enabled: true,
                                    classes: {
                                        group: true
                                    }
                                }
                            }
                        ]
                    }
                }
            });

            expect(wrapper.findAll('.group')).toHaveLength(2);
        });

        test('properties the schema defined in form options', () => {
            wrapper.setProps({
                options: {
                    group: {
                        schema: {
                            wrapper: {
                                classes: {
                                    wrapper: true
                                }
                            },
                            classes: {
                                field: true
                            }
                        }
                    }
                },
                schema: {
                    group: {
                        enabled: true,
                        classes: {
                            group: true
                        },
                        fields: [{}]
                    }
                }
            });

            expect(wrapper.findAll('.group')).toHaveLength(1);
            expect(wrapper.findAll('.wrapper')).toHaveLength(1);
            expect(wrapper.findAll('.field')).toHaveLength(1);
        });

        test('more than one field within', () => {
            wrapper.setProps({
                schema: {
                    group: {
                        enabled: true,
                        fields: [{}, {}]
                    }
                }
            });

            expect(wrapper.findAll('input')).toHaveLength(2);
        });

        test('properties the schema defined in form options with more than one field', () => {
            wrapper.setProps({
                options: {
                    group: {
                        schema: {
                            wrapper: {
                                classes: {
                                    wrapper: true
                                }
                            },
                            classes: {
                                field: true
                            }
                        }
                    }
                },
                schema: {
                    group: {
                        enabled: true,
                        classes: {
                            group: true
                        },
                        fields: [{}, {}]
                    }
                }
            });

            expect(wrapper.findAll('.group')).toHaveLength(1);
            expect(wrapper.findAll('.wrapper')).toHaveLength(2);
            expect(wrapper.findAll('.field')).toHaveLength(2);
        });

        test('priority if set', () => {
            wrapper.setProps({
                schema: {
                    group: {
                        enabled: true,
                        classes: {
                            group: true
                        }
                    },
                    row: {
                        enabled: true,
                        classes: {
                            row: true
                        }
                    }
                }
            });

            expect(wrapper.findAll('.group')).toHaveLength(1);
            expect(wrapper.findAll('.row')).toHaveLength(0);
        });
    });

    describe('row', () => {
        test('check exists', () => {
            wrapper.setProps({
                schema: {
                    row: {
                        enabled: true,
                        classes: {
                            row: true
                        }
                    }
                }
            });

            expect(wrapper.findAll('.row')).toHaveLength(1);
            expect(wrapper.find('.row').exists()).toBe(true);
            expect(wrapper.find('input').exists()).toBe(false);
        });

        test('properties defined in form options', () => {
            wrapper.setProps({
                options: {
                    row: {
                        row: {
                            classes: {
                                row: true
                            }
                        }
                    }
                },
                schema: {
                    row: {
                        enabled: true
                    }
                }
            });

            expect(wrapper.findAll('.row')).toHaveLength(1);
            expect(wrapper.find('.row').exists()).toBe(true);
        });

        test('one within the other', () => {
            wrapper.setProps({
                schema: {
                    row: {
                        enabled: true,
                        classes: {
                            row: true
                        },
                        fields: [
                            {
                                row: {
                                    enabled: true,
                                    classes: {
                                        row: true
                                    }
                                }
                            }
                        ]
                    }
                }
            });

            expect(wrapper.findAll('.row')).toHaveLength(2);
        });

        test('properties the schema defined in form options', () => {
            wrapper.setProps({
                options: {
                    row: {
                        schema: {
                            wrapper: {
                                classes: {
                                    wrapper: true
                                }
                            },
                            classes: {
                                field: true
                            }
                        }
                    }
                },
                schema: {
                    row: {
                        enabled: true,
                        classes: {
                            row: true
                        },
                        fields: [{}]
                    }
                }
            });

            expect(wrapper.findAll('.row')).toHaveLength(1);
            expect(wrapper.findAll('.wrapper')).toHaveLength(1);
            expect(wrapper.findAll('.field')).toHaveLength(1);
        });

        test('more than one field within', () => {
            wrapper.setProps({
                schema: {
                    row: {
                        enabled: true,
                        fields: [{}, {}]
                    }
                }
            });

            expect(wrapper.findAll('input')).toHaveLength(2);
        });

        test('properties the schema defined in form options with more than one field', () => {
            wrapper.setProps({
                options: {
                    row: {
                        schema: {
                            wrapper: {
                                classes: {
                                    wrapper: true
                                }
                            },
                            classes: {
                                field: true
                            }
                        }
                    }
                },
                schema: {
                    row: {
                        enabled: true,
                        classes: {
                            row: true
                        },
                        fields: [{}, {}]
                    }
                }
            });

            expect(wrapper.findAll('.row')).toHaveLength(1);
            expect(wrapper.findAll('.wrapper')).toHaveLength(2);
            expect(wrapper.findAll('.field')).toHaveLength(2);
        });
    });

    describe('theme', () => {
        beforeAll(() => {
            localVue = createLocalVue();
            localVue.use(install, {
                themes: {
                    foo: {
                        schema: {
                            classes: {
                                foo: true
                            }
                        }
                    }
                }
            });
        });

        test('properties defined in schema', () => {
            wrapper.setProps({
                schema: {
                    theme: 'foo'
                }
            });

            expect(wrapper.find('.foo').exists()).toBe(true);
            expect(wrapper.find('.foo').is('input')).toBe(true);
        });

        test('properties defined in form options', () => {
            wrapper.setProps({
                options: {
                    theme: 'foo'
                }
            });

            expect(wrapper.find('.foo').exists()).toBe(true);
            expect(wrapper.find('.foo').is('input')).toBe(true);
        });

        test('properties defined in global installation', () => {
            localVue.$vfg.options.theme = 'foo';

            wrapper = mount(container, {
                localVue
            });

            expect(wrapper.find('.foo').exists()).toBe(true);
            expect(wrapper.find('.foo').is('input')).toBe(true);
        });

        test('not use the properties of theme, if is null', () => {
            wrapper.setProps({
                options: {
                    theme: 'foo'
                },
                schema: {
                    theme: null
                }
            });

            expect(wrapper.find('.foo').exists()).toBe(false);
            expect(wrapper.find('input').exists()).toBe(true);
        });

        test('not use the properties of theme, if is false', () => {
            wrapper.setProps({
                options: {
                    theme: 'foo'
                },
                schema: {
                    theme: false
                }
            });

            expect(wrapper.find('.foo').exists()).toBe(false);
            expect(wrapper.find('input').exists()).toBe(true);
        });

        test('not use the properties of theme defined in schema, if not exists', () => {
            wrapper.setProps({
                schema: {
                    theme: 'bar'
                }
            });

            expect(wrapper.find('.foo').exists()).toBe(false);
            expect(wrapper.find('input').exists()).toBe(true);
        });

        test('not use the properties of theme defined in form options, if not exists', () => {
            wrapper.setProps({
                options: {
                    theme: 'bar'
                }
            });

            expect(wrapper.find('.foo').exists()).toBe(false);
            expect(wrapper.find('input').exists()).toBe(true);
        });

        test('properties overwritten in form options', () => {
            wrapper.setProps({
                options: {
                    foo: {
                        schema: {
                            classes: {
                                foo: false,
                                bar: true
                            }
                        }
                    }
                },
                schema: {
                    theme: 'foo'
                }
            });

            expect(wrapper.find('.foo').exists()).toBe(false);
            expect(wrapper.find('.bar').exists()).toBe(true);
            expect(wrapper.find('.bar').is('input')).toBe(true);
        });
    });
});
