import * as actions from '../actions/index';

const initialState = {
    settings: {
        validLocation: true,
        position: {
            time: {
                x: 0,
                y: 0,
                saved_x: 0,
                saved_y: 0
            },
            date: {
                x: 0,
                y: 0,
                saved_x: 0,
                saved_y: 0
            },
            visual: {
                x: 0,
                y: 0,
                saved_x: 0,
                saved_y: 0
            },
            location: {
                x: 0,
                y: 0,
                saved_x: 0,
                saved_y: 0
            },
            description: {
                x: 0,
                y: 0,
                saved_x: 0,
                saved_y: 0
            },
            webcam: {
                x: 0,
                y: 0,
                saved_x: 0,
                saved_y: 0
            },
            temperature: {
                x: 0,
                y: 0,
                saved_x: 0,
                saved_y: 0
            }
        },
        location: {
            isInputChecked: false,
            location: false,
            locationF: false,
            saved_isInputChecked: false,
            saved_location: false
        },
        background: {
            color: "black",
            saved_color: "black"
        },
        foreground: {
            color: "rgba(0,255,255, 1)",
            applyVisual: false,
            saved_color: "rgba(0,255,255, 1)",
            saved_applyVisual: false
        },
        description: {
            isInputChecked: false,
            saved_isInputChecked: false
        },
        temperature: {
            isInputChecked: false,
            saved_isInputChecked: false,
            fahrenheit: {
                isInputChecked: false,
                saved_isInputChecked: false
            },
            celsius: {
                isInputChecked: false,
                saved_isInputChecked: false
            },
            celsiusFirst: {
                isInputChecked: false,
                saved_isInputChecked: false
            }
        },
        visual: {
            isInputChecked: false,
            saved_isInputChecked: false
        },
        webcam: {
            isInputChecked: false,
            saved_isInputChecked: false,
            cam: false,
            saved_cam: false
        },
        time: {
            isInputChecked: false,
            saved_isInputChecked: false,
            seconds: {
                isInputChecked: false,
                saved_isInputChecked: false,
                secondsString: '',
                saved_secondsString: ''
            },
            twelve: {
                isInputChecked: false,
                saved_isInputChecked: false,
                hourString: 'HH',
                saved_hourString: 'HH'
            },
            meridiem: {
                isInputChecked: false,
                saved_isInputChecked: false,
                meridiemString: '',
                saved_meridiemString: ''
            }
        },
        date: {
            isInputChecked: false,
            saved_isInputChecked: false,
            numerical: {
                isInputChecked: false,
                saved_isInputChecked: false
            },
            month: {
                monthString: 'MMMM Do, ',
                saved_monthString: 'MMMM Do, '
            },
            year: {
                yearString: 'YYYY',
                saved_yearString: 'YYYY'
            }
        }
    },
    whether: false
}

export const userReducer = (state = initialState, action) => {

    switch (action.type) {
        case actions.SIGNUP:
            return {
                ...state,
                isLoggedIn: true,
                email: action.email,
                status: action.status
            }
        case actions.LOGIN:
            return {
                ...state,
                isLoggedIn: true,
                email: action.email,
                status: action.status,
            }
        case actions.UPDATE_STATE:
            return {
                user: action.props
            }
        case actions.LOAD_SETTINGS:
            return {
                ...state,
                settings: action.settings
            }
        case actions.INITIAL_SETTINGS:
            return {
                ...state,
                settings: initialState.settings
            }
        case actions.GETTING_WHETHER:
            return {
                ...state,
                gettingWhether: action.bool
            }
        case actions.LOCATION_UPDATE:
            return {
                ...state,
                settings: {
                    ...state.settings,
                    location: {
                        ...state.settings.location,
                        location: action.location,
                        locationF: action.locationformatted
                    }
                }
            }
        case actions.LOCATION_ISVALID:
            return {
                ...state,
                settings: {
                    ...state.settings,
                    validLocation: action.isValid
                }
            }
        case actions.WHETHER_UPDATE:
            return {
                ...state,
                whether: action.location
            }
        case actions.SHOW_LOCATION:
            return {
                ...state,
                settings: {
                    ...state.settings,
                    location: {
                        ...state.settings.location,
                        isInputChecked: action.isInputChecked
                    }
                }
            }
        case actions.SHOW_VISUAL:
            return {
                ...state,
                settings: {
                    ...state.settings,
                    visual: {
                        ...state.settings.visual,
                        isInputChecked: action.isInputChecked
                    }
                }
            }
        case actions.SHOW_WEBCAM:
            return {
                ...state,
                settings: {
                    ...state.settings,
                    webcam: {
                        ...state.settings.webcam,
                        isInputChecked: action.isInputChecked,
                        cam: action.bool
                    }
                }
            }
        case actions.CAM_CHOICE:
            return {
                ...state,
                settings: {
                    ...state.settings,
                    webcam: {
                        ...state.settings.webcam,
                        cam: action.cam
                    }
                }
            }
        case actions.BACKGROUND_CHOICE:
            return {
                ...state,
                settings: {
                    ...state.settings,
                    background: {
                        ...state.settings.background,
                        color: action.color
                    }
                }
            }
        case actions.FOREGROUND_CHOICE:
            return {
                ...state,
                settings: {
                    ...state.settings,
                    foreground: {
                        ...state.settings.foreground,
                        color: action.color
                    }
                }
            }
        case actions.APPLY_VISUAL:
            return {
                ...state,
                settings: {
                    ...state.settings,
                    foreground: {
                        ...state.settings.foreground,
                        applyVisual: action.bool
                    }
                }
            }
        case actions.SHOW_DESCRIPTION:
            return {
                ...state,
                settings: {
                    ...state.settings,
                    description: {
                        ...state.settings.description,
                        isInputChecked: action.isInputChecked
                    }
                }
            }
        case actions.SHOW_TIME:
            return {
                ...state,
                settings: {
                    ...state.settings,
                    time: {
                        ...state.settings.time,
                        isInputChecked: action.isInputChecked
                    }
                }
            }
        case actions.SHOW_DATE:
            return {
                ...state,
                settings: {
                    ...state.settings,
                    date: {
                        ...state.settings.date,
                        isInputChecked: action.isInputChecked
                    }
                }
            }
        case actions.SHOW_NUMERICAL:
            return {
                ...state,
                settings: {
                    ...state.settings,
                    date: {
                        ...state.settings.date,
                        numerical: {
                            ...state.settings.date.numerical,
                            isInputChecked: action.isInputChecked
                        },
                        month: {
                            ...state.settings.date.month,
                            monthString: action.monthString
                        },
                        year: {
                            ...state.settings.date.year,
                            yearString: action.yearString
                        }
                    }
                }
            }
        case actions.SHOW_TWELVE:
            return {
                ...state,
                settings: {
                    ...state.settings,
                    time: {
                        ...state.settings.time,
                        twelve: {
                            ...state.settings.time.twelve,
                            isInputChecked: action.isInputChecked,
                            hourString: action.string
                        }
                    }
                }
            }
        case actions.SHOW_SECONDS:
            return {
                ...state,
                settings: {
                    ...state.settings,
                    time: {
                        ...state.settings.time,
                        seconds: {
                            ...state.settings.time.seconds,
                            isInputChecked: action.isInputChecked,
                            secondsString: action.string
                        }
                    }
                }
            }
        case actions.SHOW_MERIDIEM:
            return {
                ...state,
                settings: {
                    ...state.settings,
                    time: {
                        ...state.settings.time,
                        meridiem: {
                            ...state.settings.time.meridiem,
                            isInputChecked: action.isInputChecked,
                            meridiemString: action.string
                        }
                    }
                }
            }
        case actions.SHOW_TEMPERATURE:
            return {
                ...state,
                settings: {
                    ...state.settings,
                    temperature: {
                        ...state.settings.temperature,
                        isInputChecked: action.isInputChecked
                    }
                }
            }
        case actions.SHOW_FAHRENHEIT:
            return {
                ...state,
                settings: {
                    ...state.settings,
                    temperature: {
                        ...state.settings.temperature,
                        fahrenheit: {
                            ...state.settings.temperature.fahrenheit,
                            isInputChecked: action.isInputChecked
                        }
                    }
                }
            }
        case actions.SHOW_CELSIUS:
            return {
                ...state,
                settings: {
                    ...state.settings,
                    temperature: {
                        ...state.settings.temperature,
                        celsius: {
                            ...state.settings.temperature.celsius,
                            isInputChecked: action.isInputChecked
                        }
                    }
                }
            }
        case actions.CELSIUS_FIRST:
            return {
                ...state,
                settings: {
                    ...state.settings,
                    temperature: {
                        ...state.settings.temperature,
                        celsiusFirst: {
                            ...state.settings.temperature.celsiusFirst,
                            isInputChecked: action.isInputChecked
                        }
                    }
                }
            }
        case actions.TIME_POSITION:
            return {
                ...state,
                settings: {
                    ...state.settings,
                    position: {
                        ...state.settings.position,
                        time: {
                            ...state.settings.position.time,
                            x: action.x,
                            y: action.y
                        }
                    }
                }
            }
        case actions.WEBCAM_POSITION:
            return {
                ...state,
                settings: {
                    ...state.settings,
                    position: {
                        ...state.settings.position,
                        webcam: {
                            ...state.settings.position.webcam,
                            x: action.x,
                            y: action.y
                        }
                    }
                }
            }
        case actions.DATE_POSITION:
            return {
                ...state,
                settings: {
                    ...state.settings,
                    position: {
                        ...state.settings.position,
                        date: {
                            ...state.settings.position.date,
                            x: action.x,
                            y: action.y
                        }
                    }
                }
            }
        case actions.VISUAL_POSITION:
            return {
                ...state,
                settings: {
                    ...state.settings,
                    position: {
                        ...state.settings.position,
                        visual: {
                            ...state.settings.position.visual,
                            x: action.x,
                            y: action.y
                        }
                    }
                }
            }
        case actions.LOCATION_POSITION:
            return {
                ...state,
                settings: {
                    ...state.settings,
                    position: {
                        ...state.settings.position,
                        location: {
                            ...state.settings.position.location,
                            x: action.x,
                            y: action.y
                        }
                    }
                }
            }
        case actions.DESCRIPTION_POSITION:
            return {
                ...state,
                settings: {
                    ...state.settings,
                    position: {
                        ...state.settings.position,
                        description: {
                            ...state.settings.position.description,
                            x: action.x,
                            y: action.y
                        }
                    }
                }
            }
        case actions.TEMPERATURE_POSITION:
            return {
                ...state,
                settings: {
                    ...state.settings,
                    position: {
                        ...state.settings.position,
                        temperature: {
                            ...state.settings.position.temperature,
                            x: action.x,
                            y: action.y
                        }
                    }
                }
            }
        case actions.SAVE_SETTINGS:
            return {
                ...state,
                settings: {
                    ...state.settings,
                    position: {
                        ...state.settings.position,
                        time: {
                            ...state.settings.position.time,
                            saved_x: action.settings.position.time.x,
                            saved_y: action.settings.position.time.y
                        },
                        date: {
                            ...state.settings.position.date,
                            saved_x: action.settings.position.date.x,
                            saved_y: action.settings.position.date.y
                        },
                        visual: {
                            ...state.settings.position.visual,
                            saved_x: action.settings.position.visual.x,
                            saved_y: action.settings.position.visual.y
                        },
                        location: {
                            ...state.settings.position.location,
                            saved_x: action.settings.position.location.x,
                            saved_y: action.settings.position.location.y
                        },
                        description: {
                            ...state.settings.position.description,
                            saved_x: action.settings.position.description.x,
                            saved_y: action.settings.position.description.y
                        },
                        webcam: {
                            ...state.settings.position.webcam,
                            saved_x: action.settings.position.webcam.x,
                            saved_y: action.settings.position.webcam.y
                        },
                        temperature: {
                            ...state.settings.position.temperature,
                            saved_x: action.settings.position.temperature.x,
                            saved_y: action.settings.position.temperature.y
                        }
                    },
                    location: {
                        ...state.settings.location,
                        saved_isInputChecked: action.settings.location.isInputChecked,
                        saved_location: action.settings.location.location
                    },
                    background: {
                        ...state.settings.background,
                        saved_color: action.settings.background.color
                    },
                    foreground: {
                        ...state.settings.foreground,
                        saved_color: action.settings.foreground.color,
                        saved_applyVisual: action.settings.foreground.applyVisual
                    },
                    description: {
                        ...state.settings.description,
                        saved_isInputChecked: action.settings.description.isInputChecked
                    },
                    temperature: {
                        ...state.settings.temperature,
                        saved_isInputChecked: action.settings.temperature.isInputChecked,
                        fahrenheit: {
                            ...state.settings.temperature.fahrenheit,
                            saved_isInputChecked: action.settings.temperature.fahrenheit.isInputChecked
                        },
                        celsius: {
                            ...state.settings.temperature.celsius,
                            saved_isInputChecked: action.settings.temperature.celsius.isInputChecked
                        },
                        celsiusFirst: {
                            ...state.settings.temperature.celsiusFirst,
                            saved_isInputChecked: action.settings.temperature.celsiusFirst.isInputChecked
                        },
                    },
                    visual: {
                        ...state.settings.visual,
                        saved_isInputChecked: action.settings.visual.isInputChecked
                    },
                    webcam: {
                        ...state.settings.webcam,
                        saved_isInputChecked: action.settings.webcam.isInputChecked,
                        saved_cam: action.settings.webcam.cam
                    },
                    time: {
                        ...state.settings.time,
                        saved_isInputChecked: action.settings.time.isInputChecked,
                        seconds: {
                            ...state.settings.time.seconds,
                            saved_isInputChecked: action.settings.time.seconds.isInputChecked,
                            saved_secondsString: action.settings.time.seconds.secondsString
                        },
                        twelve: {
                            ...state.settings.time.twelve,
                            saved_isInputChecked: action.settings.time.twelve.isInputChecked,
                            saved_hourString: action.settings.time.twelve.hourString
                        },
                        meridiem: {
                            ...state.settings.time.meridiem,
                            saved_isInputChecked: action.settings.time.meridiem.isInputChecked,
                            saved_meridiemString: action.settings.time.meridiem.meridiemString
                        }
                    },
                    date: {
                        ...state.settings.date,
                        saved_isInputChecked: action.settings.date.isInputChecked,
                        numerical: {
                            ...state.settings.date.numerical,
                            saved_isInputChecked: action.settings.date.numerical.isInputChecked
                        },
                        month: {
                            ...state.settings.date.month,
                            saved_monthString: action.settings.date.month.monthString
                        },
                        year: {
                            ...state.settings.date.year,
                            saved_yearString: action.settings.date.year.yearString
                        }
                    }
                }
            }

        default:
            return state;
    }
}