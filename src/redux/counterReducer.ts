const InitialState = {
    value: 0,
    maxValue: 5,
    startValue: 0,
    errors: {
        error: false,
        disableInc: false,
        disableReset: true,
        isSettingsActive: true,
        errorForRegulator: false,
        disableSet: true
    } as ErrorsType
}

type ErrorsType = {
    error?: boolean
    disableInc?: boolean
    disableReset?: boolean
    isSettingsActive?: boolean
    errorForRegulator?: boolean
    disableSet?: boolean
}
type InitialStateType = typeof InitialState


export const counterReducer = (state: InitialStateType = InitialState, action: AddCounterActionType): InitialStateType => {
    switch (action.type) {
        case "SET-VALUE":
            return {
                ...state, value: action.value
            }
        case "RESET-COUNTER":
            return {
                ...state, value: action.startValueForReset
            }
        case "SET-START-VALUE-FROM-LOCAL":
            return {
                ...state, startValue: action.startValue
            }
        case "SET-MAX-VALUE-FROM-LOCAL":
            return {
                ...state, maxValue: action.maxValue
            }
        case 'SET-ERROR':
            return {
                ...state, errors: {...state.errors, ...action.errors}
            }
        default :
            return state
    }
}

export const setValueAC = (value: number) => ({type: 'SET-VALUE', value} as const)
export const resetCounterValueAC = (startValueForReset: number) => ({
    type: 'RESET-COUNTER',
    startValueForReset
} as const)
export const setStartValueFromLocalAC = (startValue: number) => ({
    type: 'SET-START-VALUE-FROM-LOCAL',
    startValue
} as const)
export const setMaxValueFromLocalAC = (maxValue: number) => ({type: 'SET-MAX-VALUE-FROM-LOCAL', maxValue} as const)
export const setErrorAC = (errors: ErrorsType) => ({type: 'SET-ERROR', errors} as const)


export type AddCounterActionType =
    ReturnType<typeof setValueAC> |
    ReturnType<typeof resetCounterValueAC> |
    ReturnType<typeof setMaxValueFromLocalAC> |
    ReturnType<typeof setErrorAC> |
    ReturnType<typeof setStartValueFromLocalAC>
