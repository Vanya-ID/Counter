import React, {ChangeEvent} from 'react';
import c from './CounterRegulator.module.css'
import Btn from './Btn';
import Input from "./Input";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "./redux/store";
import {setErrorAC, setMaxValueFromLocalAC, setStartValueFromLocalAC, setValueAC} from "./redux/counterReducer";

type CounterRegulatorType = {}

function CounterRegulator(props: CounterRegulatorType) {

    const counterRegulatorState = useSelector((state: AppStateType) => state.counter)
    let dispatch = useDispatch()


    const maxValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(setMaxValueFromLocalAC(Math.floor(e.currentTarget.valueAsNumber)))
        dispatch(setErrorAC({disableReset: true, disableInc: true, isSettingsActive: false}))
    }
    const startValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(setErrorAC({isSettingsActive: false, disableReset: true, disableInc: true, disableSet: false}))
        dispatch(setStartValueFromLocalAC((Math.floor(e.currentTarget.valueAsNumber))))
    }

    const errorMessage = () => {
        if (counterRegulatorState.maxValue <= counterRegulatorState.startValue || counterRegulatorState.maxValue < 0 || counterRegulatorState.startValue < 0) {
            dispatch(setErrorAC({errorForRegulator: true, disableSet: true, error: true}))
        } else {
            dispatch(setErrorAC({errorForRegulator: false, error: false, disableSet: false}))
        }
    }


    const setValueOnClick = () => {
        localStorage.setItem('startValue', JSON.stringify(counterRegulatorState.startValue))
        localStorage.setItem('maxValue', JSON.stringify(counterRegulatorState.maxValue))

        dispatch(setStartValueFromLocalAC(counterRegulatorState.startValue))
        dispatch(setValueAC(counterRegulatorState.startValue))
        dispatch(setMaxValueFromLocalAC(counterRegulatorState.maxValue))

        dispatch(setErrorAC({isSettingsActive: true, disableReset: true, disableInc: false, disableSet: true}))

    }


    return (
        <div className={c.div}>
            <div className={c.valueAndSetDiv}>

                <div className={c.childDiv}>
                    <span>max value:</span>
                    <Input
                        error={counterRegulatorState.errors.errorForRegulator}
                        value={counterRegulatorState.maxValue}
                        valueHandler={maxValueHandler}
                        mouseErrorMessage={errorMessage}
                        keyUpErrorMessage={errorMessage}
                    />
                </div>

                <div className={c.childDiv}>
                    <span>start value:</span>
                    <Input
                        error={counterRegulatorState.errors.errorForRegulator}
                        value={counterRegulatorState.startValue}
                        valueHandler={startValueHandler}
                        mouseErrorMessage={errorMessage}
                        keyUpErrorMessage={errorMessage}
                    />
                </div>

            </div>
            <div className={c.forSet}>

                <Btn
                    title={'SET'}
                    disabled={counterRegulatorState.errors.errorForRegulator ? true : counterRegulatorState.errors.disableSet}
                    function={setValueOnClick}
                />

            </div>
        </div>
    )
}

export default CounterRegulator;