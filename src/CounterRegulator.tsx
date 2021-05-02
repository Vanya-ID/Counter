import React, {ChangeEvent, useEffect, useState} from 'react';
import c from './CounterRegulator.module.css'
import Btn from './Btn';
import Input from "./Input";

type CounterRegulatorType = {
    setError: (value: boolean) => void
    setNewSettings: (value: boolean) => void
    setStartValueForReset: (value: number) => void
    setDisableInc: (value: boolean) => void
    setDisableReset: (value: boolean) => void
    setStartValue: (value: number) => void
    setMaxValue: (value: number) => void
}

function CounterRegulator(props: CounterRegulatorType) {

    let [error, setError] = useState<boolean>(false)

    let [maxValue, setMaxValue] = useState<number>(5)
    let [startValue, setStartValue] = useState<number>(0)
    let [disable, setDisable] = useState<boolean>(true)

    useEffect(() => {

        let newStartValueStr = localStorage.getItem('startValue')

        if (newStartValueStr) {

            let newStartValue = JSON.parse(newStartValueStr)
            props.setStartValue(newStartValue)
            props.setStartValueForReset(newStartValue)
            setStartValue(newStartValue)

        }

    }, [localStorage.getItem('startValue')])

    useEffect(() => {
        let newMaxValueStr = localStorage.getItem('maxValue')
        if (newMaxValueStr) {
            let newMaxValue = JSON.parse(newMaxValueStr)
            props.setMaxValue(newMaxValue)
            setMaxValue(newMaxValue)
        }
    }, [localStorage.getItem('maxValue')])


    const maxValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.setNewSettings(false)
        setMaxValue(+e.currentTarget.value)
        props.setDisableReset(true)
        props.setDisableInc(true)
        setDisable(false)
    }
    const startValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.setNewSettings(false)
        setStartValue(+e.currentTarget.value)
        props.setDisableReset(true)
        props.setDisableInc(true)
        setDisable(false)
    }

    const errorMessage = () => {
        if (maxValue <= startValue) {
            setError(true)
            setDisable(true)
            props.setError(true)
        } else if (maxValue < 0) {
            setError(true)
            setDisable(true)
            props.setError(true)
        } else if (startValue < 0) {
            setError(true)
            setDisable(true)
            props.setError(true)
        } else {
            setError(false)
            props.setError(false)
        }
    }


    const setValueOnClick = () => {
        localStorage.setItem('startValue', JSON.stringify(startValue))
        localStorage.setItem('startValueForReset', JSON.stringify(startValue))
        localStorage.setItem('maxValue', JSON.stringify(maxValue))

        props.setNewSettings(true)
        props.setDisableReset(true)
        props.setDisableInc(false)
        setDisable(true)
    }


    return (
        <div className={c.div}>
            <div className={c.valueAndSetDiv}>

                <div className={c.childDiv}>
                    <span>max value:</span>
                    <Input
                        error={error}
                        value={maxValue}
                        valueHandler={maxValueHandler}
                        mouseErrorMessage={errorMessage}
                        keyUpErrorMessage={errorMessage}
                    />
                </div>

                <div className={c.childDiv}>
                    <span>start value:</span>
                    <Input
                        error={error}
                        value={startValue}
                        valueHandler={startValueHandler}
                        mouseErrorMessage={errorMessage}
                        keyUpErrorMessage={errorMessage}
                    />
                </div>

            </div>
            <div className={c.forSet}>
                <div>
                    <Btn title={'SET'}
                         disabled={error ? true : disable}
                         function={setValueOnClick}
                    />
                </div>
            </div>
        </div>
    )
}

export default CounterRegulator;