import React, {ChangeEvent, MouseEvent, KeyboardEvent} from 'react';
import c from "./CounterRegulator.module.css";

type InputType = {
    error: boolean | undefined
    value: number
    valueHandler: (e: ChangeEvent<HTMLInputElement>) => void
    mouseErrorMessage: (e: MouseEvent<HTMLInputElement>) => void
    keyUpErrorMessage: (e: KeyboardEvent<HTMLInputElement>) => void
}

function Input(props: InputType) {
    return (
        <input
            className={props.error ? c.error : c.input}
            value={props.value}
            type="number"
            onChange={props.valueHandler}
            onClick={props.mouseErrorMessage}
            onKeyUp={props.keyUpErrorMessage}
        />
    )
}

export default Input;