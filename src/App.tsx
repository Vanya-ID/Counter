import React, {useState} from 'react';
import './App.css';
import e from './counter.module.css'
import Btn from "./Btn";
import CounterRegulator from "./CounterRegulator";

function App() {


    let [disableInc, setDisableInc] = useState<boolean>(false)
    let [disableReset, setDisableReset] = useState<boolean>(true)

    let [startValue, setStartValue] = useState<number>(0)
    let [startValueForReset, setStartValueForReset] = useState<number>(0)
    let [maxValue, setMaxValue] = useState<number>(5)

    let [newSettings, setNewSettings] = useState<boolean>(true)

    let [error, setError] = useState<boolean>(false)


    const addCount = () => {
        startValue += 1
        setStartValue(startValue)
        if (maxValue <= startValue) {
            setDisableInc(true)
        }
        setDisableReset(false)
    }


    const resetCount = () => {
        setStartValue(startValueForReset)
        setDisableReset(true)
        setDisableInc(false)
    }


    return (
        <div className={e.div}>
            <CounterRegulator
                setError={setError}
                setNewSettings={setNewSettings}
                setStartValueForReset={setStartValueForReset}
                setDisableInc={setDisableInc}
                setDisableReset={setDisableReset}
                setStartValue={setStartValue}
                setMaxValue={setMaxValue}
            />

            <div>
                <div style={
                    {
                        fontSize: newSettings ? '52px' : '20px',
                        color: error ? 'red' : 'white'
                    }
                }
                     className={e.count}>{error ? 'Incorrect Value!' : newSettings ? startValue : 'Set new settings!'}
                </div>
                <div className={e.forBtn}>
                    <Btn
                        title={'INC'}
                        disabled={disableInc}
                        function={addCount}
                    />
                    <Btn
                        title={'RESET'}
                        disabled={disableReset}
                        function={resetCount}
                    />

                </div>
            </div>

        </div>
    )
}

export default App;
