import React, {useEffect} from 'react';
import './App.css';
import e from './counter.module.css'
import Btn from "./Btn";
import CounterRegulator from "./CounterRegulator";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "./redux/store";
import {
    setValueAC,
    resetCounterValueAC,
    setMaxValueFromLocalAC,
    setStartValueFromLocalAC, setErrorAC
} from "./redux/counterReducer";

function App() {

    const counterState = useSelector((state: AppStateType) => state.counter)
    let dispatch = useDispatch()

    useEffect(() => {
        let newStartValueStr = localStorage.getItem('startValue')
        if (newStartValueStr) {
            let newStartValue = JSON.parse(newStartValueStr)
            dispatch(setStartValueFromLocalAC(newStartValue))
            dispatch(setValueAC(newStartValue))
        }
        let newMaxValueStr = localStorage.getItem('maxValue')
        if (newMaxValueStr) {
            let newMaxValue = JSON.parse(newMaxValueStr)
            dispatch(setMaxValueFromLocalAC(newMaxValue))
        }
    }, [dispatch])


    const addCount = () => {
        counterState.value += 1
        dispatch(setValueAC(counterState.value))
        if (counterState.maxValue <= counterState.value) {
            dispatch(setErrorAC({disableInc: true}))
        }
        dispatch(setErrorAC({disableReset: false}))
    }


    const resetCount = () => {
        let newStartValueStr = localStorage.getItem('startValue')
        if (newStartValueStr) {
            let newStartValue = JSON.parse(newStartValueStr)
            dispatch(resetCounterValueAC(newStartValue))
        }
        dispatch(setErrorAC({disableReset: true, disableInc: false}))
    }


    return (
        <div className={e.div}>
            <CounterRegulator
            />

            <div className={e.countDiv}>
                <div style={
                    {
                        fontSize: counterState.errors.isSettingsActive ? '52px' : '20px',
                        color: counterState.errors.error || counterState.maxValue === counterState.value ? 'red' : 'white'
                    }
                }
                     className={e.count}
                >
                    {counterState.errors.error ? 'Incorrect Value!' : counterState.errors.isSettingsActive ? counterState.value : 'Set new settings!'}
                </div>
                <div className={e.forBtn}>
                    <Btn
                        title={'INC'}
                        disabled={counterState.errors.disableInc}
                        function={addCount}
                    />
                    <Btn
                        title={'RESET'}
                        disabled={counterState.errors.disableReset}
                        function={resetCount}
                    />

                </div>
            </div>

        </div>
    )
}

export default App;
