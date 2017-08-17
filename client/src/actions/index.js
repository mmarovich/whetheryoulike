
export const SIGNUP = "SIGNUP";
export const signUp = (email, status) => ({
    type: SIGNUP,
    email,
    status
})

export const LOGIN = "LOGIN";
export const logIn = email => ({
    type: LOGIN,
    email,
})

export const UPDATE_STATE = "UPDATE_STATE";
export const updateState = props => ({
    type: UPDATE_STATE,
    props
})

export const LOAD_SETTINGS = "LOAD_SETTINGS";
export const loadSettings = settings => ({
    type: LOAD_SETTINGS,
    settings
})

export const SAVE_SETTINGS = "SAVE_SETTINGS";
export const saveSettings = settings => ({
    type: SAVE_SETTINGS,
    settings
})

export const INITIAL_SETTINGS = "INITIAL_SETTINGS";
export const initialSettings = () => ({
    type: INITIAL_SETTINGS
})

export const LOAD_USER = "LOAD_USER";
export const loadUser = user => ({
    type: LOAD_USER,
    user
})

export const GETTING_WHETHER = "GETTING_WHETHER";
export const gettingWhether = bool => ({
    type: GETTING_WHETHER,
    bool
})

export const LOCATION_UPDATE = "LOCATION_UPDATE";
export const locationUpdate = (location, locationformatted) => ({
    type: LOCATION_UPDATE,
    location,
    locationformatted
})

export const LOCATION_ISVALID = "LOCATION_ISVALID";
export const locationIsValid = isValid => ({
    type: LOCATION_ISVALID,
    isValid
})

export const WHETHER_UPDATE = "WHETHER_UPDATE";
export const whetherUpdate = location => ({
    type: WHETHER_UPDATE,
    location
})

export const SHOW_LOCATION = "SHOW_LOCATION";
export const showLocation = isInputChecked => ({
    type: SHOW_LOCATION,
    isInputChecked
})

export const SHOW_WEBCAM = "SHOW_WEBCAM";
export const showWebcam = (isInputChecked, bool) => ({
    type: SHOW_WEBCAM,
    isInputChecked,
    bool
})

export const CAM_CHOICE = "CAM_CHOICE";
export const camChoice = cam => ({
    type: CAM_CHOICE,
    cam
})

export const BACKGROUND_CHOICE = "BACKGROUND_CHOICE";
export const backgroundChoice = color => ({
    type: BACKGROUND_CHOICE,
    color
})

export const FOREGROUND_CHOICE = "FOREGROUND_CHOICE";
export const foregroundChoice = color => ({
    type: FOREGROUND_CHOICE,
    color
})

export const APPLY_VISUAL = "APPLY_VISUAL";
export const applyVisual = bool => ({
    type: APPLY_VISUAL,
    bool
})

export const SHOW_DESCRIPTION = "SHOW_DESCRIPTION";
export const showDescription = isInputChecked => ({
    type: SHOW_DESCRIPTION,
    isInputChecked
})

export const SHOW_VISUAL = "SHOW_VISUAL";
export const showVisual = isInputChecked => ({
    type: SHOW_VISUAL,
    isInputChecked
})

export const SHOW_TIME = "SHOW_TIME";
export const showTime = isInputChecked => ({
    type: SHOW_TIME,
    isInputChecked
})

export const SHOW_DATE = "SHOW_DATE";
export const showDate = (isInputChecked) => ({
    type: SHOW_DATE,
    isInputChecked
})

export const SHOW_NUMERICAL = "SHOW_NUMERICAL";
export const showNumerical = (isInputChecked, monthString, yearString) => ({
    type: SHOW_NUMERICAL,
    isInputChecked,
    monthString,
    yearString
})

export const SHOW_SECONDS = "SHOW_SECONDS";
export const showSeconds = (isInputChecked, string) => ({
    type: SHOW_SECONDS,
    isInputChecked,
    string
})

export const SHOW_TWELVE = "SHOW_TWELVE";
export const showTwelve = (isInputChecked, string) => ({
    type: SHOW_TWELVE,
    isInputChecked,
    string
})

export const SHOW_MERIDIEM = "SHOW_MERIDIEM";
export const showMeridiem = (isInputChecked, string) => ({
    type: SHOW_MERIDIEM,
    isInputChecked,
    string
})

export const SHOW_TEMPERATURE = "SHOW_TEMPERATURE";
export const showTemperature = isInputChecked => ({
    type: SHOW_TEMPERATURE,
    isInputChecked
})

export const SHOW_FAHRENHEIT = "SHOW_FAHRENHEIT";
export const showFahrenheit = isInputChecked => ({
    type: SHOW_FAHRENHEIT,
    isInputChecked
})

export const SHOW_CELSIUS = "SHOW_CELSIUS";
export const showCelsius = isInputChecked => ({
    type: SHOW_CELSIUS,
    isInputChecked
})

export const CELSIUS_FIRST = "CELSIUS_FIRST";
export const celsiusFirst = isInputChecked => ({
    type: CELSIUS_FIRST,
    isInputChecked
})

export const TIME_POSITION = "TIME_POSITION";
export const timePosition = (x,y) => ({
    type: TIME_POSITION,
    x,
    y
})

export const WEBCAM_POSITION = "WEBCAM_POSITION";
export const webcamPosition = (x,y) => ({
    type: WEBCAM_POSITION,
    x,
    y
})

export const DATE_POSITION = "DATE_POSITION";
export const datePosition = (x,y) => ({
    type: DATE_POSITION,
    x,
    y
})

export const VISUAL_POSITION = "VISUAL_POSITION";
export const visualPosition = (x,y) => ({
    type: VISUAL_POSITION,
    x,
    y
})

export const DESCRIPTION_POSITION = "DESCRIPTION_POSITION";
export const descriptionPosition = (x,y) => ({
    type: DESCRIPTION_POSITION,
    x,
    y
})

export const LOCATION_POSITION = "LOCATION_POSITION";
export const locationPosition = (x,y) => ({
    type: LOCATION_POSITION,
    x,
    y
})

export const TEMPERATURE_POSITION = "TEMPERATURE_POSITION";
export const temperaturePosition = (x,y) => ({
    type: TEMPERATURE_POSITION,
    x,
    y
})